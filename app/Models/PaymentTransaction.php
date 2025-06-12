<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentTransaction extends Model
{
    protected $fillable = [
        'user_id',
        'subscription_plan_id',
        'payment_status',
        'amount',
        'order_id',
        'snap_token',
        'payment_type',
        'paid_at',
        'expired_at',
        'midtrans_response',
    ];

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo
     */
    public function subscriptionPlan(): BelongsTo
    {
        return $this->belongsTo(SubscriptionPlan::class);
    }
}
