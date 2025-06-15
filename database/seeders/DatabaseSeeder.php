<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            //User
            RolesSeeder::class,
            AdminUserSeeder::class,
            StudentUserSeeder::class,
            TeacherUserSeeder::class,

            //
            QuizSeeder::class,
            CategorySeeder::class,
            SubscriptionPlanSeeder::class,
            QuestionSeeder::class,
            QuestionOptionSeeder::class,
            QuizSessionSeeder::class,
            QuizParticipantSeeder::class,
            StudentAnswerSeeder::class,
            QuizAttemptSeeder::class,
        ]);
    }
}
