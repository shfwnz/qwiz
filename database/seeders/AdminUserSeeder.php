<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::updateOrCreate(
            [ 'email' => 'admin@example.com' ],
            [
                'name' => 'Administrator',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $user->assignRole('super_admin');
    }
}
