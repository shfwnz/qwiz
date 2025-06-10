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
}
