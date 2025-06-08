<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentTransaction extends Model
{
    protected $fillable = [
        'user_id',
        'subscription_plan_id',
        'price',
        'payment_status',
        'order_id',
        'snap_token',
        'payment_type',
        'midtrans_response',
    ];
}
