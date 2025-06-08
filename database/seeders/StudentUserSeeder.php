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

        $user = User::updateOrCreate(
            [ 'email' => 'student@example.com' ],
            [
                'name' => 'Student',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $user->assignRole('student');
    }
}
