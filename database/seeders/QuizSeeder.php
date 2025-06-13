<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        $teachers = User::where('role', 'teacher')->get();

        $quizzes = [
            [
                'title' => 'Basic Mathematics Quiz',
                'description' =>
                    'Test your basic math skills with addition, subtraction, multiplication, and division',
                'time_limit_minutes' => 30,
                'max_participants' => 30,
                'visibility' => 'public',
                'max_attempts' => 3,
            ],
            [
                'title' => 'Science Fundamentals',
                'description' =>
                    'Explore fundamental concepts in physics, chemistry, and biology',
                'time_limit_minutes' => 45,
                'max_participants' => 25,
                'visibility' => 'public',
                'max_attempts' => 2,
            ],
            [
                'title' => 'World History Challenge',
                'description' =>
                    'Test your knowledge of major historical events and figures',
                'time_limit_minutes' => 60,
                'max_participants' => 40,
                'visibility' => 'private',
                'max_attempts' => 1,
                'access_code' => '888111',
                'require_code' => true,
            ],
            [
                'title' => 'English Grammar Test',
                'description' =>
                    'Assess your understanding of English grammar rules and usage',
                'time_limit_minutes' => 25,
                'max_participants' => 35,
                'visibility' => 'public',
                'max_attempts' => 2,
            ],
            [
                'title' => 'Programming Basics',
                'description' =>
                    'Test your knowledge of programming concepts and algorithms',
                'time_limit_minutes' => 50,
                'max_participants' => 20,
                'visibility' => 'private',
                'max_attempts' => 2,
                'access_code' => '888111',
                'require_code' => true,
            ],
            [
                'title' => 'Geography Quiz',
                'description' =>
                    'Test your knowledge of world geography, capitals, and landmarks',
                'time_limit_minutes' => 35,
                'max_participants' => 50,
                'visibility' => 'public',
                'max_attempts' => 3,
            ],
            [
                'title' => 'Art & Culture',
                'description' =>
                    'Explore famous artworks, artists, and cultural movements',
                'time_limit_minutes' => 40,
                'max_participants' => 15,
                'visibility' => 'private',
                'max_attempts' => 1,
                'access_code' => '888111',
                'require_code' => true,
            ],
            [
                'title' => 'Economics Principles',
                'description' =>
                    'Test your understanding of basic economic concepts and theories',
                'time_limit_minutes' => 55,
                'max_participants' => 30,
                'visibility' => 'public',
                'max_attempts' => 2,
            ],
        ];

        foreach ($quizzes as $index => $quiz) {
            $teacher = $teachers->random();

            Quiz::create([
                'teacher_id' => $teacher->id,
                'slug' => Str::slug($quiz['title']) . '-' . uniqid(),
                'title' => $quiz['title'],
                'description' => $quiz['description'],
                'time_limit_minutes' => $quiz['time_limit_minutes'],
                'max_attempts' => $quiz['max_attempts'],
                'max_participants' => $quiz['max_participants'],
                'visibility' => $quiz['visibility'],
                'access_code' => $quiz['access_code'] ?? null,
                'require_code' => $quiz['require_code'] ?? false,
                'start_time' =>
                    $quiz['visibility'] === 'private'
                        ? now()->addDays(rand(1, 7))
                        : null,
                'end_time' =>
                    $quiz['visibility'] === 'private'
                        ? now()->addDays(rand(8, 14))
                        : null,
            ]);
        }
    }
}
