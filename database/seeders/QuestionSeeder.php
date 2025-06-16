<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $quizzes = Quiz::all();

        foreach ($quizzes as $quiz) {
            $questionCount = rand(5, 15);

            for ($i = 1; $i <= $questionCount; $i++) {
                $questionType = [
                    'multiple_choice',
                    'true_false',
                    'short_answer',
                ][rand(0, 2)];

                Question::create([
                    'quiz_id' => $quiz->id,
                    'question_text' => $this->getQuestionText(
                        $quiz->title,
                        $questionType,
                        $i,
                    ),
                    'question_type' => $questionType,
                    'points' => rand(1, 10),
                ]);
            }
        }
    }

    private function getQuestionText($quizTitle, $type, $number): string
    {
        $questions = [
            'Basic Mathematics Quiz' => [
                'multiple_choice' => [
                    'What is 25 + 17?',
                    'What is 8 × 7?',
                    'What is 144 ÷ 12?',
                    'What is 50 - 23?',
                ],
                'true_false' => ['15 + 25 = 40', '6 × 8 = 48', '100 ÷ 5 = 25'],
                'short_answer' => [
                    'Solve: 3x + 5 = 20',
                    'What is the square root of 64?',
                ],
            ],
            'Science Fundamentals' => [
                'multiple_choice' => [
                    'What is the chemical symbol for water?',
                    'Which planet is closest to the Sun?',
                    'What gas do plants absorb from the atmosphere?',
                ],
                'true_false' => [
                    'The human body has 206 bones',
                    'Light travels faster than sound',
                    'Oxygen is the most abundant gas in Earth\'s atmosphere',
                ],
                'short_answer' => [
                    'What is the square root of 64?',
                    'Solve: 3x + 5 = 20',
                    'Name the three states of matter',
                    'What is photosynthesis?',
                    'What is the capital of France?',
                    'Name a primary color.',
                    'What is the powerhouse of the cell?',
                    'What programming language is used in Laravel?',
                ],
            ],
            // Add more quiz-specific questions as needed
        ];

        // Default questions if specific quiz not found
        $defaultQuestions = [
            'multiple_choice' => [
                "Multiple choice question #{$number} for {$quizTitle}",
                "Choose the correct answer for question #{$number}",
                "Which of the following is correct? (Question #{$number})",
            ],
            'true_false' => [
                "True or false statement #{$number} for {$quizTitle}",
                "This statement is correct (Question #{$number})",
            ],
            'short_answer' => [
                "Short answer question #{$number} for {$quizTitle}",
                "Explain your answer for question #{$number}",
            ],
        ];

        $quizQuestions = $questions[$quizTitle] ?? $defaultQuestions;
        $typeQuestions = $quizQuestions[$type] ?? $defaultQuestions[$type];

        return $typeQuestions[rand(0, count($typeQuestions) - 1)];
    }
}
