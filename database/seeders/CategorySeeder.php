<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Mathematics',
                'description' => 'Mathematical concepts and problem solving',
            ],
            [
                'name' => 'Science',
                'description' =>
                    'Physics, Chemistry, Biology, and Earth Science',
            ],
            [
                'name' => 'History',
                'description' => 'World history and historical events',
            ],
            [
                'name' => 'English',
                'description' =>
                    'English grammar, literature, and comprehension',
            ],
            [
                'name' => 'Geography',
                'description' => 'World geography and mapping',
            ],
            [
                'name' => 'Computer Science',
                'description' => 'Programming, algorithms, and technology',
            ],
            [
                'name' => 'Art',
                'description' => 'Visual arts, music, and creative expression',
            ],
            [
                'name' => 'Physical Education',
                'description' => 'Sports, fitness, and health',
            ],
            [
                'name' => 'Economics',
                'description' => 'Economic principles and business studies',
            ],
            [
                'name' => 'Psychology',
                'description' => 'Human behavior and mental processes',
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
            ]);
        }
    }
}
