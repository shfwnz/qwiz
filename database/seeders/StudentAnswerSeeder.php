<?php

namespace Database\Seeders;

use App\Models\QuizAttempt;
use App\Models\StudentAnswer;
use Illuminate\Database\Seeder;

class StudentAnswerSeeder extends Seeder
{
    public function run(): void
    {
        $attempts = QuizAttempt::with(['quiz.questions.options'])->get();

        foreach ($attempts as $attempt) {
            foreach ($attempt->quiz->questions as $question) {
                $isCorrect = rand(0, 100) < 70; // 70% chance of correct answer
                $score = $isCorrect ? $question->points : 0;

                $answerText = $this->getAnswerText($question, $isCorrect);

                StudentAnswer::create([
                    'quiz_attempt_id' => $attempt->id,
                    'question_id' => $question->id,
                    'answer_text' => $answerText,
                    'is_correct' => $isCorrect,
                    'score' => $score,
                    'answer_at' => $attempt->started_at->addMinutes(
                        rand(1, 30),
                    ),
                ]);
            }
        }
    }

    private function getAnswerText($question, $isCorrect): string
    {
        if ($question->question_type === 'multiple_choice') {
            if ($isCorrect) {
                return $question->options->where('is_correct', true)->first()
                    ->option_text ?? 'Option A';
            } else {
                return $question->options->where('is_correct', false)->random()
                    ->option_text ?? 'Option B';
            }
        } elseif ($question->question_type === 'true_false') {
            $correctOption = $question->options
                ->where('is_correct', true)
                ->first();
            if ($isCorrect) {
                return $correctOption->option_text;
            } else {
                return $correctOption->option_text === 'True'
                    ? 'False'
                    : 'True';
            }
        } else {
            // short_answer
            return $isCorrect ? 'Correct answer text' : 'Incorrect answer text';
        }
    }
}
