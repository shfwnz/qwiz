<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index()
    {
        $data = Quiz::with('teacher')
            ->where('visibility', 'public')
            ->get()
            ->map(function ($quiz) {
                return [
                    'id' => $quiz->id,
                    'slug' => $quiz->slug,
                    'title' => $quiz->title,
                    'visibility' => $quiz->visibility,
                    'max_participants' => $quiz->max_participants,
                    'max_attempts' => $quiz->max_attempts,
                    'time_limit_minutes' => $quiz->time_limit_minutes,
                    'updated_at' => $quiz->updated_at->format('d/m/Y'),
                    'teacher_id' => $quiz->teacher->id,
                    'teacher' => $quiz->teacher->name,
                ];
            });

        return Inertia::render('quiz', [
            'data' => $data,
        ]);
    }

    public function show(Request $req, string $credentials)
    {
        $quiz = Quiz::with('teacher')
                    ->where('slug', $credentials)
                    ->first();

        $quiz_code = Quiz::with('teacher')
                    ->where('access_code', $credentials)
                    ->first();

        if ($quiz_code) {
            $req->validate(['token' => 'required']);

            return redirect()->route('quiz.show', ['slug' => $quiz_code->slug]);
        } elseif (!$quiz_code && !$quiz) {
            return redirect()->route('quiz.list')->with('error', 'Token Salah');
        }

        $data = [
                'id' => $quiz->id,
                'title' => $quiz->title,
                'visibility' => $quiz->visibility,
                'max_participants' => $quiz->max_participants,
                'max_attempts' => $quiz->max_attempts,
                'time_limit_minutes' => $quiz->time_limit_minutes,
                'updated_at' => $quiz->updated_at->format('d/m/Y'),
                'teacher_id' => $quiz->teacher->id,
                'teacher' => $quiz->teacher->name,
        ];

        return Inertia::render('show-quiz', [
           'data' => $data
        ]);
    }

    public function start(Request $req, string $id)
    {
        return Inertia::render('quiz-attempt');
    }
}
