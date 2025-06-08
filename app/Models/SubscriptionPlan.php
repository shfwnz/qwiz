<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
        'unlimited_hearts',
        'can_export_results',
        'can_import_quizzes',
        'is_active',
    ];
}
