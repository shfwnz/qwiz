<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\quiz;

class guru extends Model
{
    /** @use HasFactory<\Database\Factories\GuruFactory> */
    use HasFactory;

    protected $table = 'gurus';

    public function quizzes()
    {
        return $this->hasMany(quiz::class, 'guru_id', 'id');
    }
}
