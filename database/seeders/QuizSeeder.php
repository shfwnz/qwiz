<?php

namespace Database\Seeders;

use App\Models\guru;
use App\Models\quiz;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        guru::factory(10)->create()->each(function ($guru) {
            $guru->quizzes()->saveMany(quiz::factory(1)->make());
        });
    }
}
