<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        $user = User::updateOrCreate(
            [ 'email' => 'teacher@example.com' ],
            [
                'name' => 'Teacher',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $user->assignRole('teacher');
    }
}
