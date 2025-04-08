<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subscription::insert([
            [
                'name' => '+20 Hearts Daily/Month',
                'description' => 'Get 20 hearts every day for a month.',
                'price' => 1.00,
                'duration' => 'monthly',
                'hearts' => 20,
                'is_unlimited' => false,
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'name' => 'Unlimited Hearts/Month',
                'description' => 'Unlimited hearts for a month.',
                'price' => 5.00,
                'duration' => 'monthly',
                'hearts' => null,
                'is_unlimited' => true,
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'name' => 'Unlimited Hearts/Year',
                'description' => 'Unlimited hearts for a year.',
                'price' => 40.00,
                'duration' => 'yearly',
                'hearts' => null,
                'is_unlimited' => true,
                'created_at' => now(), 'updated_at' => now(),
            ],
        ]);
    }
}