<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubscriptionPlan extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'duration',
        'max_quizzes',
        'max_hearts',
        'max_participants',
        'unlimited_hearts',
        'can_export_results',
        'can_import_quizzes',
        'is_active',
    ];

    /**
     * @return HasMany
     */
    public function paymentTransactions(): HasMany
    {
        return $this->hasMany(PaymentTransaction::class);
    }

    /**
     * @return HasMany
     */
    public function userSubscriptions(): HasMany
    {
        return $this->hasMany(UserSubscription::class);
    }
}
