<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\guru;

class quiz extends Model
{
    /** @use HasFactory<\Database\Factories\QuizFactory> */
    use HasFactory;

    // protected $table="quizzes";

    public function guru() {
        return $this->belongsTo(guru::class, 'guru_id', 'id');
    }
}
