<?php

namespace Database\Seeders;

use App\Models\QuizAttempt;
use App\Models\QuizParticipant;
use App\Models\User;
use App\Models\Quiz;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class QuizAttemptSeeder extends Seeder
{
    public function run(): void
    {
        // Dapatkan semua participants dengan relasi yang dibutuhkan
        $participants = QuizParticipant::with([
            'quiz.questions',
            'user',
        ])->get();

        if ($participants->isEmpty()) {
            $this->command->warn(
                'No quiz participants found. Please run QuizParticipantSeeder first.',
            );
            return;
        }

        foreach ($participants as $participant) {
            $quiz = $participant->quiz;
            $user = $participant->user;

            if (!$quiz) {
                $this->command->warn(
                    "Participant ID {$participant->id} has no associated quiz. Skipping.",
                );
                continue;
            }

            if (!$quiz->questions || $quiz->questions->isEmpty()) {
                $this->command->warn(
                    "Quiz '{$quiz->title}' has no questions. Skipping attempts.",
                );
                continue;
            }

            // Buat beberapa attempt untuk setiap participant
            $attemptCount = rand(1, min($quiz->max_attempts ?? 3, 5));

            for ($i = 0; $i < $attemptCount; $i++) {
                // Generate random dates dalam 3 bulan terakhir
                $startedAt = Carbon::now()
                    ->subDays(rand(1, 90))
                    ->subHours(rand(0, 23))
                    ->subMinutes(rand(0, 59));
                $timeSpent = rand(5, min($quiz->time_limit_minutes ?? 60, 120));
                $endedAt = $startedAt->copy()->addMinutes($timeSpent);

                // Hitung score berdasarkan total points dari questions
                $maxScore = $quiz->questions->sum('points') ?? 100;

                // Generate realistic score distribution
                $scorePercentage = $this->generateRealisticScore();
                $totalScore = round(($scorePercentage / 100) * $maxScore);

                // Tentukan status berdasarkan completion rate
                $isCompleted = rand(1, 100) <= 85; // 85% completion rate
                $status = $isCompleted ? 'completed' : 'incomplete';

                // Jika tidak completed, adjust score
                if (!$isCompleted) {
                    $totalScore = round($totalScore * 0.5); // Partial score
                    $endedAt = null; // No end time if incomplete
                    $timeSpent = rand(1, $timeSpent); // Less time spent
                }

                QuizAttempt::create([
                    'user_id' => $user->id,
                    'quiz_id' => $quiz->id,
                    'quiz_participant_id' => $participant->id,
                    'started_at' => $startedAt,
                    'ended_at' => $endedAt,
                    'completed_at' => $isCompleted ? $endedAt : null,
                    'time_spent_minutes' => $timeSpent,
                    'total_score' => $totalScore,
                    'max_score' => $maxScore,
                    'percentage' =>
                        $maxScore > 0
                            ? round(($totalScore / $maxScore) * 100, 2)
                            : 0,
                    'points_earned' => $totalScore,
                    'status' => $status,
                    'is_completed' => $isCompleted,
                    'attempt_number' => $i + 1,
                    'answers' => $this->generateDummyAnswers(
                        $quiz->questions->count(),
                    ),
                ]);

                $attemptNumber = $i + 1;
                $this->command->info(
                    "Created attempt #{$attemptNumber} for {$user->name} on quiz '{$quiz->title}' - Score: {$totalScore}/{$maxScore}",
                );
            }
        }

        // Update user statistics after creating attempts
        $this->updateUserStatistics();
    }

    /**
     * Generate realistic score distribution
     * Higher probability for mid-range scores
     */
    private function generateRealisticScore(): int
    {
        $rand = rand(1, 100);

        if ($rand <= 5) {
            return rand(0, 30); // 5% get very low scores
        } elseif ($rand <= 15) {
            return rand(31, 50); // 10% get low scores
        } elseif ($rand <= 35) {
            return rand(51, 70); // 20% get medium-low scores
        } elseif ($rand <= 65) {
            return rand(71, 85); // 30% get good scores
        } elseif ($rand <= 90) {
            return rand(86, 95); // 25% get high scores
        } else {
            return rand(96, 100); // 10% get excellent scores
        }
    }

    /**
     * Generate dummy answers for the attempt
     */
    private function generateDummyAnswers(int $questionCount): array
    {
        $answers = [];

        for ($i = 1; $i <= $questionCount; $i++) {
            $answers[] = [
                'question_id' => $i,
                'selected_option' => rand(1, 4), // Assuming 4 options per question
                'is_correct' => rand(0, 1) === 1,
                'time_spent' => rand(10, 120), // seconds
            ];
        }

        return $answers;
    }

    /**
     * Update user statistics based on completed attempts
     */
    public function updateUserStatistics(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $completedAttempts = QuizAttempt::where('user_id', $user->id)
                ->where('status', 'completed')
                ->get();

            $totalPoints = $completedAttempts->sum('total_score');
            $quizzesCompleted = $completedAttempts->count();

            $user->update([
                'total_points' => $totalPoints,
                'quizzes_completed' => $quizzesCompleted,
            ]);

            $this->command->info(
                "Updated {$user->name}: {$totalPoints} points, {$quizzesCompleted} quizzes completed",
            );
        }
    }
}
