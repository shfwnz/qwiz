<?php

namespace Database\Factories;

use App\Models\guru;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\guru>
 */
class GuruFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = guru::class;

    public function definition(): array
    {
        return [
            'nama' => $this->faker->name,
        ];
    }
}
