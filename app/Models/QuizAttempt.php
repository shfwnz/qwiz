<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class QuizAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_id',
        'started_at',
        'ended_at',
        'status',
        'total_score',
        'max_score',
        'precentage',
        'time_spent_minutes',
    ];
}
