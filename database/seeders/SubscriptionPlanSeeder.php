<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SubscriptionPlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Free Plan',
                'description' => 'Basic features for individual use',
                'price' => 0,
                'duration' => 'monthly',
                'max_quizzes' => 5,
                'max_hearts' => 3,
                'max_participants' => 10,
                'unlimited_hearts' => false,
                'can_export_results' => false,
                'can_import_quizzes' => false,
                'is_active' => true,
            ],
            [
                'name' => 'Teacher Pro',
                'description' => 'Advanced features for educators',
                'price' => 99000,
                'duration' => 'monthly',
                'max_quizzes' => 50,
                'max_hearts' => 10,
                'max_participants' => 50,
                'unlimited_hearts' => false,
                'can_export_results' => true,
                'can_import_quizzes' => true,
                'is_active' => true,
            ],
            [
                'name' => 'School Premium',
                'description' => 'Unlimited features for schools',
                'price' => 999000,
                'duration' => 'monthly',
                'max_quizzes' => null,
                'max_hearts' => null,
                'max_participants' => 200,
                'unlimited_hearts' => true,
                'can_export_results' => true,
                'can_import_quizzes' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Teacher Pro Annual',
                'description' => 'Advanced features for educators (yearly)',
                'price' => 990000,
                'duration' => 'yearly',
                'max_quizzes' => 50,
                'max_hearts' => 10,
                'max_participants' => 50,
                'unlimited_hearts' => false,
                'can_export_results' => true,
                'can_import_quizzes' => true,
                'is_active' => true,
            ],
        ];

        foreach ($plans as $plan) {
            SubscriptionPlan::create([
                'name' => $plan['name'],
                'slug' => Str::slug($plan['name']),
                'description' => $plan['description'],
                'price' => $plan['price'],
                'duration' => $plan['duration'],
                'max_quizzes' => $plan['max_quizzes'],
                'max_hearts' => $plan['max_hearts'],
                'max_participants' => $plan['max_participants'],
                'unlimited_hearts' => $plan['unlimited_hearts'],
                'can_export_results' => $plan['can_export_results'],
                'can_import_quizzes' => $plan['can_import_quizzes'],
                'is_active' => $plan['is_active'],
            ]);
        }
    }
}
