<?php

namespace App\Http\Controllers;

use App\Models\PaymentTransaction;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function __construct()
    {
        // Set Midtrans configuration
        \Midtrans\Config::$serverKey = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = config('midtrans.is_production');
        \Midtrans\Config::$isSanitized = config('midtrans.is_sanitized');
        \Midtrans\Config::$is3ds = config('midtrans.is_3ds');
    }

    /**
     * METHOD 1: Create Payment (WAJIB)
     * User pilih subscription plan → generate snap token
     */
    public function createPayment(Request $request)
    {
        $request->validate([
            'subscription_plan_id' => 'required|exists:subscription_plans,id',
        ]);

        $user = Auth::user();
        $plan = SubscriptionPlan::findOrFail($request->subscription_plan_id);

        // Generate unique order ID
        $orderId = 'SUB-' . $user->id . '-' . time();

        try {
            DB::beginTransaction();

            // 1. Create payment transaction
            $payment = PaymentTransaction::create([
                'user_id' => $user->id,
                'subscription_plan_id' => $plan->id,
                'order_id' => $orderId,
                'amount' => $plan->price,
                'payment_status' => 'pending',
            ]);

            // 2. Create user subscription (pending)
            $startDate = now();
            $endDate =
                $plan->duration === 'monthly'
                    ? $startDate->copy()->addMonth()
                    : $startDate->copy()->addYear();

            $subscription = UserSubscription::create([
                'user_id' => $user->id,
                'subscription_plan_id' => $plan->id,
                'payment_transaction_id' => $payment->id,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'status' => 'pending_payment',
            ]);

            // 3. Prepare Midtrans parameters
            $params = [
                'transaction_details' => [
                    'order_id' => $orderId,
                    'gross_amount' => (int) $plan->price,
                ],
                'customer_details' => [
                    'first_name' => $user->name,
                    'email' => $user->email,
                ],
                'item_details' => [
                    [
                        'id' => $plan->slug,
                        'price' => (int) $plan->price,
                        'quantity' => 1,
                        'name' =>
                            $plan->name . ' - ' . ucfirst($plan->duration),
                    ],
                ],
            ];

            // 4. Get snap token from Midtrans
            $snapToken = \Midtrans\Snap::getSnapToken($params);

            // 5. Save snap token
            $payment->update(['snap_token' => $snapToken]);

            DB::commit();

            return response()->json([
                'success' => true,
                'snap_token' => $snapToken,
                'order_id' => $orderId,
            ]);
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json(
                [
                    'success' => false,
                    'message' =>
                        'Failed to create payment: ' . $e->getMessage(),
                ],
                500,
            );
        }
    }

    /**
     * METHOD 2: Handle Webhook (WAJIB)
     * Midtrans kirim notification → update status
     */
    public function handleWebhook(Request $request)
    {
        try {
            // Get notification from Midtrans
            $notification = new \Midtrans\Notification();

            $orderId = $notification->order_id;
            $transactionStatus = $notification->transaction_status;
            $paymentType = $notification->payment_type ?? null;

            // Find payment transaction
            $payment = PaymentTransaction::where('order_id', $orderId)->first();

            if (!$payment) {
                return response()->json(['message' => 'Order not found'], 404);
            }

            // Update payment status based on Midtrans response
            switch ($transactionStatus) {
                case 'settlement':
                    $this->handleSuccessfulPayment($payment, $notification);
                    break;

                case 'pending':
                    $payment->update([
                        'payment_status' => 'pending',
                        'payment_type' => $paymentType,
                        'midtrans_response' => $notification->getResponse(),
                    ]);
                    break;

                case 'cancel':
                case 'expire':
                case 'failure':
                    $this->handleFailedPayment($payment, $notification);
                    break;
            }

            return response()->json(['message' => 'OK']);
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Webhook error: ' . $e->getMessage(),
                ],
                500,
            );
        }
    }

    /**
     * METHOD 3: Check Payment Status (OPSIONAL tapi berguna)
     * Frontend bisa cek status pembayaran
     */
    public function checkPaymentStatus($orderId)
    {
        $payment = PaymentTransaction::where('order_id', $orderId)
            ->where('user_id', Auth::id())
            ->first();

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        return response()->json([
            'order_id' => $payment->order_id,
            'status' => $payment->payment_status,
            'amount' => $payment->amount,
            'created_at' => $payment->created_at,
        ]);
    }

    /**
     * HELPER: Handle successful payment
     */
    private function handleSuccessfulPayment($payment, $notification)
    {
        DB::transaction(function () use ($payment, $notification) {
            // 1. Update payment transaction
            $payment->update([
                'payment_status' => 'settlement',
                'payment_type' => $notification->payment_type ?? null,
                'midtrans_response' => $notification->getResponse(),
            ]);

            // 2. Activate subscription
            $subscription = UserSubscription::where(
                'payment_transaction_id',
                $payment->id,
            )->first();
            if ($subscription) {
                $subscription->update(['status' => 'active']);
            }
        });
    }

    /**
     * HELPER: Handle failed payment
     */
    private function handleFailedPayment($payment, $notification)
    {
        DB::transaction(function () use ($payment, $notification) {
            // 1. Update payment transaction
            $payment->update([
                'payment_status' => $notification->transaction_status,
                'payment_type' => $notification->payment_type ?? null,
                'midtrans_response' => $notification->getResponse(),
            ]);

            // 2. Mark subscription as failed
            $subscription = UserSubscription::where(
                'payment_transaction_id',
                $payment->id,
            )->first();
            if ($subscription) {
                $subscription->update(['status' => 'failed']);
            }
        });
    }
}
