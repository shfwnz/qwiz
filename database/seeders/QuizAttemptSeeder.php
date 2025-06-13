<?php

namespace Database\Seeders;

use App\Models\QuizAttempt;
use App\Models\QuizParticipant;
use Illuminate\Database\Seeder;

class QuizAttemptSeeder extends Seeder
{
    public function run(): void
    {
        $participants = QuizParticipant::with('quiz.questions')->get();

        if ($participants->isEmpty()) {
            $this->command->warn(
                'No quiz participants found. Please run QuizParticipantSeeder first.',
            );
            return;
        }

        foreach ($participants as $participant) {
            $quiz = $participant->quiz;

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

            $attemptCount = rand(1, min($quiz->max_attempts, 3));

            for ($i = 0; $i < $attemptCount; $i++) {
                $startedAt = now()->subDays(rand(1, 30));
                $timeSpent = rand(10, $quiz->time_limit_minutes ?? 30);
                $endedAt = $startedAt->copy()->addMinutes($timeSpent);

                $maxScore = $quiz->questions->sum('points') ?? 0;
                $totalScore = $maxScore > 0 ? rand(0, $maxScore) : 0;
                $percentage =
                    $maxScore > 0 ? ($totalScore / $maxScore) * 100 : 0;

                QuizAttempt::create([
                    'quiz_participant_id' => $participant->id,
                    'started_at' => $startedAt,
                    'ended_at' => $endedAt,
                    'time_spent_minutes' => $timeSpent,
                    'total_score' => $totalScore,
                    'max_score' => $maxScore,
                    'percentage' => round($percentage, 2),
                    'is_completed' => true,
                ]);
            }
        }
    }
}
