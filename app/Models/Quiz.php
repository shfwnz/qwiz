<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\User;
use App\Models\Question;
use App\Models\QuizAttempt;
use App\Models\QuizSession;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'slug',
        'title',
        'description',
        'time_limit_minutes',
        'max_attempts',
        'max_participants',
        'visibility',
        'access_code',
        'require_code',
        'start_time',
        'end_time',
    ];

    protected $casts = [
        'require_code' => 'boolean',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'time_limit_minutes' => 'integer',
        'max_attempts' => 'integer',
        'max_participants' => 'integer',
    ];

    /**
     * Get the teacher that owns the quiz.
     *
     * @return BelongsTo
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function participants(): HasMany
    {
        return $this->hasMany(QuizParticipant::class);
    }

    public function attempt(): HasMany
    {
        return $this->hasMany(QuizAttempt::class);
    }

    public function session(): HasOne
    {
        return $this->hasOne(QuizSession::class);
    }
}
