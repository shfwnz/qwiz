<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class StudentUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate(['name' => 'student']);

        // Student Users
        $students = [
            ['name' => 'John Doe', 'email' => 'john.student@quiz.com'],
            ['name' => 'Jane Smith', 'email' => 'jane.student@quiz.com'],
            ['name' => 'Bob Wilson', 'email' => 'bob.student@quiz.com'],
            ['name' => 'Alice Brown', 'email' => 'alice.student@quiz.com'],
            ['name' => 'Charlie Davis', 'email' => 'charlie.student@quiz.com'],
            ['name' => 'Diana Miller', 'email' => 'diana.student@quiz.com'],
            ['name' => 'Frank Garcia', 'email' => 'frank.student@quiz.com'],
            ['name' => 'Grace Martinez', 'email' => 'grace.student@quiz.com'],
            ['name' => 'Henry Taylor', 'email' => 'henry.student@quiz.com'],
            ['name' => 'Ivy Anderson', 'email' => 'ivy.student@quiz.com'],
        ];

        foreach ($students as $student) {
            User::create([
                'name' => $student['name'],
                'email' => $student['email'],
                'password' => Hash::make('password'),
                'role' => 'student',
                'phone' => '0812345678' . rand(10, 99),
                'total_points' => 100,
                'quizzes_completed' => 1,
                'email_verified_at' => now(),
            ])->assignRole('student');
        }
    }
}
