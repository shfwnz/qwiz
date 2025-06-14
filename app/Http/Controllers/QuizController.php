<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
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
        $quiz = Quiz::with('teacher', 'questions')
            ->where('slug', $credentials)
            ->first();
        $quiz_code = Quiz::with('teacher')
            ->where('access_code', $credentials)
            ->first();

        $user = auth()->user();

        $user_participant = QuizParticipant::where('user_id', $user->id)->first();

        if ($user_participant) {
            DB::beginTransaction();

            try {
                $user_participant->delete();

                DB::commit();
            } catch(\Exception $e) {
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
            'auth' => $user
        ]);
    }

    public function waitingRoom(Request $req, string $id) 
    {
        $quiz = Quiz::with('questions', 'session', 'teacher', 'attempt')->find($id);
        $auth = auth()->user();

        $data = [
            'id' => $quiz->id,
            'title' => $quiz->title,
            'status' => $quiz->session->status,
            'description' => $quiz->description,
            'visibility' => $quiz->visibility,
            'max_participants' => $quiz->max_participants,
            'max_attempts' => $quiz->max_attempts,
            'time_limit_minutes' => $quiz->time_limit_minutes,
            'updated_at' => $quiz->updated_at->format('d/m/Y'),
            'session_id' => $quiz->session->id,
            'teacher_id' => $quiz->teacher->id,
            'teacher' => $quiz->teacher->name,
            'questions_count' => $quiz->questions->count(),
        ];

        if ($data['teacher_id'] !== $auth->id) {
            $existing = QuizParticipant::where('quiz_session_id', $quiz->session->id)
                ->where('user_id', $auth->id)
                ->first();
            $currentParticipants =QuizParticipant::where('quiz_session_id', $quiz->session->id)->get();
            $isMax = $currentParticipants->count() >= $quiz->session->max_participants;

            if (!$existing && !$isMax) {
                DB::beginTransaction();

                $currentDate = Carbon::now();

                try {
                    QuizParticipant::create([
                        'quiz_session_id' => $quiz->session->id,
                        'user_id' => $auth->id,
                        'status' => 'ready',
                        'joined_at' => $currentDate,
                    ]);

                    DB::commit();
                } catch (\Exception $e) {
                    Log::error('Transaksi gagal: ' . $e->getMessage());
                    DB::rollback();
                }
            }

            if ($isMax) {
                return redirect()
                    ->route('quiz.list')
                    ->with('error', 'Maximum participants reached!');
            }
        }

        $session = QuizSession::where('quiz_id', $id)->first();
        $participant = QuizParticipant::where('quiz_session_id', $session->id)->with('student')->get();

        return Inertia::render('waiting-room', [
            'data' => $data,
            'auth' => $auth,
            'participants' => $participant,
        ]);
    }

    public function private(Request $req, String $id)
    {
        $session = QuizSession::find($id);

        DB::beginTransaction();
        try {
            $session->update([
                'status' => 'in_progress',
            ]);

            QuizParticipant::where('quiz_session_id', $id)
                ->update(['status' => 'in_progress']);

            DB::commit();
        } catch(\Exception $e) {
            Log::error('Transaksi gagal: ' . $e->getMessage());
            DB::rollback();
        }
    }

    public function start(Request $req, string $credentials)
    {
        // Ambil slug nya setelah di beri uuid
        $pureSlug = Str::beforeLast($credentials, '-uuid-');
        $user = auth()->id();
        $attempt = QuizAttempt::where('user_id', $user)->with('quiz', 'studentAnswer')->first();

        $quiz = Quiz::with('questions', 'questions.options')
            ->where('slug', $pureSlug)
            ->first();
        $quiz_id = Quiz::with('questions')->find($credentials);

        if ($quiz_id) {
            // uuid untuk security
            $uuid = Str::uuid()->toString();

            // simpan di sesi agar tidak bisa asal buat lewat url
            session()->put('quiz_token' . $uuid, $quiz_id);

            DB::beginTransaction();
            try {
                $currentDate = Carbon::now();

                $quiz_attempt = QuizAttempt::create([
                    'quiz_id' => $quiz_id->id,
                    'user_id' => $user, // Set user_id from the start
                    'started_at' => $currentDate,
                    'max_score' => $quiz_id->questions->sum('points'),
                    'status' => 'in_progress',
                ]);

                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();
                Log::error('Quiz submission failed: ' . $e->getMessage());

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

        return Inertia::render('quiz-attempt', [
            'dataQuestions' => $quiz,
            'attempt' => $attempt
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

            $attempt = QuizAttempt::find($answer['attemptId']);
            $currentDate = Carbon::now();
            $minutes = Carbon::parse($attempt->started_at)->diffInMinutes(
                $currentDate,
            );
            $user = auth()->user();

            $percentage = ($totalScore / $attempt->max_score) * 100;
            $attempt->update([
                'total_score' => $totalScore,
                'percentage' => $percentage,
                'status' => 'completed',
                'time_spent_minutes' => $minutes,
                'ended_at' => $currentDate,
                'user_id' => $user->id,
            ]);

            session()->forget('quiz_token');
            
            $user->increment('total_points', $totalScore);
            $participant = QuizParticipant::where('user_id', $user->id)
                ->update([
                    'status' => 'completed'
                ]);

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
