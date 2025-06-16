<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Seeder;

class QuestionOptionSeeder extends Seeder
{
    public function run(): void
    {
        $questions = Question::all();

        foreach ($questions as $question) {
            if ($question->question_type === 'multiple_choice') {
                $this->createMultipleChoiceOptions($question);
            } elseif ($question->question_type === 'true_false') {
                $this->createTrueFalseOptions($question);
            } elseif ($question->question_type === 'short_answer') {
                $this->createShortAnswerKeywords($question);
            }
        }
    }

    private function createMultipleChoiceOptions($question): void
    {
        $options = $this->getOptionsForQuestion($question->question_text);
        $correctIndex = rand(0, count($options) - 1);

        foreach ($options as $index => $option) {
            QuestionOption::create([
                'question_id' => $question->id,
                'option_text' => $option,
                'is_correct' => $index === $correctIndex,
            ]);
        }
    }

    private function createTrueFalseOptions($question): void
    {
        $isTrue = rand(0, 1) === 1;

        QuestionOption::create([
            'question_id' => $question->id,
            'option_text' => 'True',
            'is_correct' => $isTrue,
        ]);

        QuestionOption::create([
            'question_id' => $question->id,
            'option_text' => 'False',
            'is_correct' => !$isTrue,
        ]);
    }

    private function getKeywordsForShortAnswer($questionText): array
    {
        $keywordSets = [
            'What is the square root of 64?' => ['8', 'eight'],
            'Solve: 3x + 5 = 20' => ['5'],
            'Name the three states of matter' => ['solid', 'liquid', 'gas'],
            'What is photosynthesis?' => [
                'process of making food',
                'making food with sunlight',
                'convert light to energy',
            ],
            'What is the capital of France?' => ['Paris', 'paris'],
            'Name a primary color.' => ['red', 'blue', 'yellow'],
            'What is the powerhouse of the cell?' => ['mitochondria'],
            'What programming language is used in Laravel?' => ['PHP', 'php'],
        ];

        return $keywordSets[$questionText] ?? ['default answer'];
    }

    private function createShortAnswerKeywords($question): void
    {
        $keywords = $this->getKeywordsForShortAnswer($question->question_text);

        foreach ($keywords as $keyword) {
            QuestionOption::create([
                'question_id' => $question->id,
                'option_text' => $keyword,
                'is_correct' => true, // Semua keyword dianggap valid
            ]);
        }
    }

    private function getOptionsForQuestion($questionText): array
    {
        // Sample options based on question text
        $optionSets = [
            'What is 25 + 17?' => ['42', '40', '43', '41'],
            'What is 8 × 7?' => ['56', '54', '58', '52'],
            'What is 144 ÷ 12?' => ['12', '10', '14', '16'],
            'What is 50 - 23?' => ['27', '25', '29', '23'],
            'What is the chemical symbol for water?' => [
                'H2O',
                'CO2',
                'O2',
                'H2SO4',
            ],
            'Which planet is closest to the Sun?' => [
                'Mercury',
                'Venus',
                'Earth',
                'Mars',
            ],
            'What gas do plants absorb from the atmosphere?' => [
                'Carbon dioxide',
                'Oxygen',
                'Nitrogen',
                'Hydrogen',
            ],
        ];

        return $optionSets[$questionText] ?? [
            'Option A',
            'Option B',
            'Option C',
            'Option D',
        ];
    }
}
