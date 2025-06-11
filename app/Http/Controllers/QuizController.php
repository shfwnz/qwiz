<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index() {
        $data = Quiz::with('teacher')->get()->map(function ($quiz) {
            return [
                'id' => $quiz->id, 
                'title' => $quiz->title,
                'max' => $quiz->max,
                'status' => $quiz->status,
                'updated_at' => $quiz->updated_at->format('d/m/Y'),
                'teacher_id' => $quiz->teacher->id,
                'teacher' => $quiz->teacher->name
            ];
        });
    
        return Inertia::render('quiz', [
            'data' => $data
        ]);
    }

    public function show(Request $req, string $id) {
        $quiz = Quiz::with('teacher')->where('id', $id)->first();
        $data = [
                    'id' => $quiz->id, 
                    'title' => $quiz->title,
                    'description' => $quiz->description,
                    'max' => $quiz->max,
                    'status' => $quiz->status,
                    'updated_at' => $quiz->updated_at->format('d/m/Y'),
                    'teacher_id' => $quiz->teacher->id,
                    'teacher' => $quiz->teacher->name
                ];

        return Inertia::render('showQuiz', [
            'data' => $data
        ]);
    }

    public function start(Request $req, string $id) {
        return Inertia::render('quizAttempt');
    }
}
