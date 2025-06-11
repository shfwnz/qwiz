<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Quiz::create([
            'title' => 'Tugas Harian Stuff 1',
            'description' => 'Stuff Here 1',
            'max' => 20,
            'status' => 1,
            'teacher_id' => 3,
        ]);
    }
}
