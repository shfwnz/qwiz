<?php

namespace Database\Seeders;

use App\Models\QuizParticipant;
use App\Models\QuizSession;
use App\Models\User;
use Illuminate\Database\Seeder;

class QuizParticipantSeeder extends Seeder
{
    public function run(): void
    {
        $sessions = QuizSession::all();
        $students = User::where('role', 'student')->get();

        foreach ($sessions as $session) {
            $participantCount = rand(3, min(8, $session->max_participants));
            $selectedStudents = $students->random($participantCount);

            foreach ($selectedStudents as $student) {
                QuizParticipant::create([
                    'quiz_session_id' => $session->id,
                    'user_id' => $student->id,
                    'status' => [
                        'waiting',
                        'ready',
                        'in_progress',
                        'completed',
                    ][rand(0, 3)],
                    'joined_at' => now()->subMinutes(rand(5, 60)),
                ]);
            }
        }
    }
}
