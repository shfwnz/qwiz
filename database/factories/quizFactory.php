<?php

namespace Database\Factories;

use App\Models\quiz;
use App\Models\guru;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\quiz>
 */
class QuizFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = quiz::class;

    public function definition(): array
    {
        return [
            'nama' => $this->faker->sentence(3),
            'guru_id' => guru::factory(),
            'status' => $this->faker->boolean,
            'maks' => $this->faker->numberBetween(1, 100),
        ];
    }
}
