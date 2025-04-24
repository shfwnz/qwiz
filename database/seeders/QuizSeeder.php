<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\guru;
use App\Models\quiz;

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
