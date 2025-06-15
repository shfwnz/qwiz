<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\QuizSession;
use App\Models\User;

class QuizParticipant extends Model
{
    protected $fillable = [
        'quiz_session_id',
        'user_id',
        'status',
        'joined_at',
        'ready_at',
    ];

    public function session(): BelongsTo
    {
        return $this->belongsTo(QuizSession::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
