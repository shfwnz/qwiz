<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use Inertia\Inertia;
use Carbon\Carbon;

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
                    'description' => $quiz->description,
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
        $quiz = Quiz::with('teacher')->where('slug', $credentials)->first();
        $quiz_code = Quiz::with('teacher')
            ->where('access_code', $credentials)
            ->first();

        if ($quiz_code) {
            $req->validate(['token' => 'required']);

            return redirect()->route('quiz.show', ['slug' => $quiz_code->slug]);
        } elseif (!$quiz_code && !$quiz) {
            return redirect()
                ->route('quiz.list')
                ->with('error', 'Token Not Found');
        }

        $data = [
            'id' => $quiz->id,
            'title' => $quiz->title,
            'description' => $quiz->description,
            'visibility' => $quiz->visibility,
            'max_participants' => $quiz->max_participants,
            'max_attempts' => $quiz->max_attempts,
            'time_limit_minutes' => $quiz->time_limit_minutes,
            'updated_at' => $quiz->updated_at->format('d/m/Y'),
            'teacher_id' => $quiz->teacher->id,
            'teacher' => $quiz->teacher->name,
        ];

        return Inertia::render('show-quiz', [
            'data' => $data,
        ]);
    }

    public function start(Request $req, string $credentials)
    {
        // Ambil slug nya setelah di beri uuid
        $pureSlug = Str::beforeLast($credentials, '-uuid-');

        $quiz = Quiz::with('questions', 'questions.options', 'attempt')->where('slug', $pureSlug)->first();
        $quiz_id = Quiz::with('questions')->find($credentials);

        if ($quiz_id) {
            // uuid untuk security
            $uuid = Str::uuid()->toString();

            // simpan di sesi agar tidak bisa asal buat lewat url
            session()->put('quiz_token'. $uuid, $quiz_id);

            DB::beginTransaction();
            try {
                $currentDate = Carbon::now();

                $quiz_attempt = QuizAttempt::create([
                    'quiz_id' => $quiz_id->id,
                    'started_at' => $currentDate,
                    'max_score' => $quiz_id->questions->sum('points'),
                    'status' => 'in_progress',
                ]);

                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();

                return redirect()
                    ->route('quiz.list')
                    ->with('error', 'Quiz Not Found');
            }

            return redirect()->route('quiz.start', [
                'slug' => $quiz_id->slug. '-uuid-'.$uuid,
            ]);
        } elseif (!$quiz_id && !$quiz) {
            return redirect()
                ->route('quiz.list')
                ->with('error', 'Quiz Not Found');
        }

        return Inertia::render('quiz-attempt', [
            'dataQuestions' => $quiz,
            'attempt' => $quiz->attempt->id
        ]);
    }

    public function submit(Request $req) 
    {
        $data = $req->validate([
            'answers' => 'required|array|min:1',
            'answers.*.questionId' => 'required|exists:questions,id',
            'answers.*.attemptId' => 'required|exists:quiz_attempts,id',
            'answers.*.selected' => 'required|string',
            'answers.*.correct' => 'required|boolean',
            'answers.*.score' => 'required|numeric',
        ]);

        DB::beginTransaction();
        try {
            $totalScore = 0;

            foreach ($data['answers'] as $answer) {
                DB::table('student_answers')->insert([
                    'quiz_attempt_id' => $answer['attemptId'],
                    'question_id' => $answer['questionId'],
                    'answer_text' => $answer['selected'],
                    'is_correct' => $answer['correct'],
                    'score' => $answer['score'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $totalScore += $answer['score'];
            }

            $attempt = QuizAttempt::find($answer['attemptId']);
            $currentDate = Carbon::now();
            $minutes = Carbon::parse($attempt->started_at)->diffInMinutes($currentDate);

            $percentage = ($totalScore / $attempt->max_score) * 100;
            $attempt->update([
                'total_score' => $totalScore,
                'percentage' => $percentage,
                'status' => 'completed',
                'time_spent_minutes' => $minutes,
                'ended_at' => $currentDate,
            ]);

            DB::commit();

            return back();
        } catch (\Exception $e) {
            DB::rollback();

            return back()->withErrors(['message' => 'Gagal menyimpan jawaban.']);
        }
    }
}
