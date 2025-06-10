<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Quiz;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Quiz::insert([
            [
                'title' => 'Tugas Harian Stuff', 
                'description' => 'Stuff Here',
                'max' => 20,
                'status' => 1,
                'teacher_id' => 3,
                'updated_at' => now()
            ]
        ]);
    }
}
