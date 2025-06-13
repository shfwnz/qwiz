<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizParticipant extends Model
{
    protected $fillable = [
        'user_id',
        'quiz_id',
        'started_at',
        'ended_at',
        'max_score',
        'total_score',
        'percentage',
    ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
