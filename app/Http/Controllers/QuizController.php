<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\QuizParticipant;
use App\Models\QuizSession;
use Inertia\Inertia;
use Carbon\Carbon;

class QuizController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $data = Quiz::with('teacher')
            ->where('visibility', 'public')
            ->get()
            ->map(function ($quiz) use ($user) {
                // Check if user has completed this quiz
                $hasCompleted = QuizAttempt::where('quiz_id', $quiz->id)
                    ->where('user_id', $user->id)
                    ->where('status', 'completed')
                    ->exists();

                // Check attempts count for max_attempts limit
                $attemptCount = QuizAttempt::where('quiz_id', $quiz->id)
                    ->where('user_id', $user->id)
                    ->count();

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
                    'has_completed' => $hasCompleted,
                    'attempt_count' => $attemptCount,
                    'can_attempt' =>
                        !$hasCompleted &&
                        ($quiz->max_attempts === null ||
                            $attemptCount < $quiz->max_attempts),
                ];
            });

        return Inertia::render('quiz', [
            'data' => $data,
        ]);
    }

    public function show(Request $req, string $credentials)
    {
        $quiz = Quiz::with('teacher', 'questions')
            ->where('slug', $credentials)
            ->first();
        $quiz_code = Quiz::with('teacher')
            ->where('access_code', $credentials)
            ->first();

        $user = Auth::user();

        // Check if user has already completed this quiz
        if ($quiz) {
            $hasCompleted = QuizAttempt::where('quiz_id', $quiz->id)
                ->where('user_id', $user->id)
                ->where('status', 'completed')
                ->exists();

            if ($hasCompleted) {
                return redirect()
                    ->route('quiz.list')
                    ->with('error', 'You have already completed this quiz');
            }

            // Check max attempts
            $attemptCount = QuizAttempt::where('quiz_id', $quiz->id)
                ->where('user_id', $user->id)
                ->count();

            if ($quiz->max_attempts && $attemptCount >= $quiz->max_attempts) {
                return redirect()
                    ->route('quiz.list')
                    ->with(
                        'error',
                        'You have reached the maximum number of attempts for this quiz',
                    );
            }
        }

        $user_participant = QuizParticipant::where(
            'user_id',
            $user->id,
        )->first();

        if ($user_participant) {
            DB::beginTransaction();

            try {
                $user_participant->delete();
                DB::commit();
            } catch (\Exception $e) {
                Log::error('Transaksi gagal: ' . $e->getMessage());
                DB::rollback();
            }
        }

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
            'questions_count' => $quiz->questions->count(),
        ];

        return Inertia::render('show-quiz', [
            'data' => $data,
            'user' => $user,
        ]);
    }

    public function waitingRoom(Request $req, string $id)
    {
        $quiz = Quiz::with('questions', 'session', 'teacher')->find($id);
        $user = Auth::user();

        // Check if user has already completed this quiz
        $hasCompleted = QuizAttempt::where('quiz_id', $id)
            ->where('user_id', $user->id)
            ->where('status', 'completed')
            ->exists();

        if ($hasCompleted) {
            return redirect()
                ->route('quiz.list')
                ->with('error', 'You have already completed this quiz');
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
            'questions_count' => $quiz->questions->count(),
        ];

        if ($data['teacher_id'] !== $user->id) {
            DB::beginTransaction();

            $currentDate = Carbon::now();

            try {
                QuizParticipant::create([
                    'quiz_session_id' => $quiz->session->id,
                    'user_id' => $user->id,
                    'status' => 'ready',
                    'joined_at' => $currentDate,
                ]);

                DB::commit();
            } catch (\Exception $e) {
                Log::error('Transaksi gagal: ' . $e->getMessage());
                DB::rollback();
            }
        }

        $participant = QuizSession::where('quiz_id', $id)->get();

        return Inertia::render('waiting-room', [
            'data' => $data,
            'user' => $user,
            'participants' => $participant,
        ]);
    }

    public function start(Request $req, string $credentials)
    {
        $user = Auth::user();

        // Ambil slug nya setelah di beri uuid
        $pureSlug = Str::beforeLast($credentials, '-uuid-');

        $quiz = Quiz::with(
            'questions',
            'questions.options',
            'attempt',
            'attempt.studentAnswer',
        )
            ->where('slug', $pureSlug)
            ->first();
        $quiz_id = Quiz::with('questions')->find($credentials);

        if ($quiz_id) {
            // Check if user has already completed this quiz
            $hasCompleted = QuizAttempt::where('quiz_id', $quiz_id->id)
                ->where('user_id', $user->id)
                ->where('status', 'completed')
                ->exists();

            if ($hasCompleted) {
                return redirect()
                    ->route('quiz.list')
                    ->with('error', 'You have already completed this quiz');
            }

            // uuid untuk security
            $uuid = Str::uuid()->toString();

            // simpan di sesi agar tidak bisa asal buat lewat url
            session()->put('quiz_token' . $uuid, $quiz_id);

            DB::beginTransaction();
            try {
                $currentDate = Carbon::now();

                $quiz_attempt = QuizAttempt::create([
                    'quiz_id' => $quiz_id->id,
                    'user_id' => $user->id, // Set user_id from the start
                    'started_at' => $currentDate,
                    'max_score' => $quiz_id->questions->sum('points'),
                    'status' => 'in_progress',
                ]);

                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();

                return redirect()
                    ->route('quiz.list')
                    ->with('error', 'Failed to start quiz');
            }

            return redirect()->route('quiz.start', [
                'slug' => $quiz_id->slug . '-uuid-' . $uuid,
            ]);
        } elseif (!$quiz_id && !$quiz) {
            return redirect()
                ->route('quiz.list')
                ->with('error', 'Quiz Not Found');
        }

        // Check if user has already completed this quiz
        if ($quiz) {
            $hasCompleted = QuizAttempt::where('quiz_id', $quiz->id)
                ->where('user_id', $user->id)
                ->where('status', 'completed')
                ->exists();

            if ($hasCompleted) {
                return redirect()
                    ->route('quiz.list')
                    ->with('error', 'You have already completed this quiz');
            }
        }

        return Inertia::render('quiz-attempt', [
            'dataQuestions' => $quiz,
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

        $user = Auth::user();
        $attemptId = $data['answers'][0]['attemptId'];

        $attempt = QuizAttempt::where('id', $attemptId)
            ->where('user_id', $user->id)
            ->where('status', 'in_progress')
            ->first();

        if (!$attempt) {
            return back()->withErrors([
                'message' => 'Invalid quiz attempt or quiz already completed.',
            ]);
        }

        DB::beginTransaction();
        try {
            $totalScore = 0;

            foreach ($data['answers'] as $answer) {
                // Check if answer already exists to prevent duplicate submissions
                $existingAnswer = DB::table('student_answers')
                    ->where('quiz_attempt_id', $answer['attemptId'])
                    ->where('question_id', $answer['questionId'])
                    ->first();

                if (!$existingAnswer) {
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
            }

            $currentDate = Carbon::now();
            $minutes = Carbon::parse($attempt->started_at)->diffInMinutes(
                $currentDate,
            );
            $percentage = ($totalScore / $attempt->max_score) * 100;

            $attempt->update([
                'total_score' => $totalScore,
                'percentage' => $percentage,
                'status' => 'completed',
                'time_spent_minutes' => $minutes,
                'ended_at' => $currentDate,
            ]);

            session()->forget('quiz_token');

            DB::commit();

            return back()->with('success', 'Quiz completed successfully!');
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Quiz submission failed: ' . $e->getMessage());

            return back()->withErrors([
                'message' => 'Failed to submit quiz answers.',
            ]);
        }
    }
}
