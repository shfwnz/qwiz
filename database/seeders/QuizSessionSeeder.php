<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\QuizSession;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class QuizSessionSeeder extends Seeder
{
    public function run(): void
    {
        $privateQuizzes = Quiz::where('visibility', 'private')->get();

        foreach ($privateQuizzes as $quiz) {
            $sessionCount = rand(1, 2);

            for ($i = 0; $i < $sessionCount; $i++) {
                QuizSession::create([
                    'quiz_id' => $quiz->id,
                    'session_code' => strtoupper(Str::random(6)),
                    'status' => ['waiting', 'in_progress', 'completed'][
                        rand(0, 2)
                    ],
                    'scheduled_start_at' => now()->addMinutes(rand(30, 1440)),
                    'max_participants' => $quiz->max_participants,
                ]);
            }
        }
    }
}
