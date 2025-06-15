<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_attempt_id',
        'question_id',
        'answer_text',
        'is_correct',
        'score',
        'answer_at',
    ];

    public function attempt(): BelongsTo
    {
        return $this->belongsTo(QuizAttempt::class);
    }
}
