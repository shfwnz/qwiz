<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index() {
        $data = Quiz::with('teacher')->get();
    
        Inertia::render('quiz', [
            'quizzes' => $data
        ]);
    }
}
