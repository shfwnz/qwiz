<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

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
}
