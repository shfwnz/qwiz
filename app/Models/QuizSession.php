<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Quiz;
use App\Models\QuizParticipant;
use App\Models\User;

class QuizSession extends Model
{
    protected $fillable = [
        'quiz_id',
        'status',
        'scheduled_start_at',
        'actual_start_at',
        'ended_at',
        'max_participants',
    ];

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function participants(): HasMany
    {
        return $this->hasMany(Quiz::class);
    }
}
