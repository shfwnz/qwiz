<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\QuizAttempt;
use App\Models\User;
use Carbon\Carbon;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $totalPoints = $this->getTotalPoints($user->id);
        $quizzesCompleted = $this->getQuizzesCompletedCount($user->id);
        $quizHistory = $this->getQuizzesCompleted();

        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone ?? '123-456-7890',
            'role' => $user->role ?? 'student',
            'total_points' => $totalPoints,
            'quizzes_completed' => $quizzesCompleted,
        ];

        return Inertia::render('profile', [
            'user' => $userData,
            'quizHistory' => $quizHistory,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' =>
                'required|email|max:255|unique:users,email,' . Auth::id(),
            'phone' => 'nullable|string|max:20',
        ]);

        $user = Auth::user();
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        return back()->with('success', 'Profile updated successfully');
    }

    private function getTotalPoints($userId)
    {
        return QuizAttempt::where('user_id', $userId)
            ->where('status', 'completed')
            ->sum('total_score') ?? 0;
    }

    private function getQuizzesCompletedCount($userId)
    {
        return QuizAttempt::where('user_id', $userId)
            ->where('status', 'completed')
            ->count();
    }

    public function getQuizzesCompleted()
    {
        $user = Auth::user();

        $quizAttempts = QuizAttempt::where('user_id', $user->id)
            ->where('status', 'completed')
            ->with([
                'quiz' => function ($query) {
                    $query->select(
                        'id',
                        'title',
                        'description',
                        'teacher_id',
                        'max_participants',
                        'category',
                    );
                },
                'quiz.teacher' => function ($query) {
                    $query->select('id', 'name');
                },
            ])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($attempt) {
                return [
                    'id' => $attempt->id,
                    'title' => $attempt->quiz->title,
                    'score' => $attempt->total_score,
                    'maxScore' => $attempt->max_score,
                    'completedAt' => Carbon::parse(
                        $attempt->created_at,
                    )->format('Y-m-d'),
                    'teacher' => $attempt->quiz->teacher->name,
                    'category' => $attempt->quiz->category ?? 'General',
                    'quiz_description' => $attempt->quiz->description,
                    'status' => $attempt->status,
                    'percentage' => $attempt->percentage,
                    'time_spent_minutes' => $attempt->time_spent_minutes,
                    'started_at' => $attempt->started_at,
                    'ended_at' => $attempt->ended_at,
                ];
            });

        return $quizAttempts->toArray();
    }
}
