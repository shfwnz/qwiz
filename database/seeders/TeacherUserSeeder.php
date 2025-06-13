<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class TeacherUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate(['name' => 'teacher']);

        // Teacher Users
        User::updateOrCreate([
            'name' => 'Dr. Sarah Johnson',
            'email' => 'sarah.teacher@quiz.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ])->assignRole('teacher');

        User::updateOrCreate([
            'name' => 'Prof. Michael Smith',
            'email' => 'michael.teacher@quiz.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '081234567892',
            'email_verified_at' => now(),
        ])->assignRole('teacher');

        User::updateOrCreate([
            'name' => 'Dr. Emily Davis',
            'email' => 'emily.teacher@quiz.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '081234567893',
            'email_verified_at' => now(),
        ])->assignRole('teacher');
    }
}
