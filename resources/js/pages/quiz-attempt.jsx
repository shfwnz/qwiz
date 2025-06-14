import ParticleBackground from '@/components/particle-background';
import { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function quizAttempt() {
    const { dataQuestions, attempt } = usePage().props;
    const questions = dataQuestions.questions.map((item) => {
        return {
            id: item.id,
            question: item.question_text,
            options: item.options.map((opt) => opt.option_text),
            answer: item.options.find((opt) => opt.is_correct === 1)?.option_text || null,
            is_shortAnswer: item.question_type === 'short_answer',
            score: item.points
        };
    });
    const [ shortAnswer, setShortAnswer ] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const { data, setData, post, processing } = useForm({
        answers: []
    });

    const currentQuestion = questions[currentIndex];

    const handleQuestion = (selected) => {
        const correct = selected === currentQuestion.answer;

        const newAnswer = {
            questionId: currentQuestion.id,
            attemptId: attempt,
            selected,
            correct: selected === currentQuestion.answer ? 1 : 0,
            score: correct ? questions.find(q => q.id === currentQuestion.id)?.score || 0 : 0,
        };

        setData('answers', [...data.answers, newAnswer]);
        setShortAnswer('');

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setShowResult(true);
            post('/submit/quiz', {
                onSuccess: () => {
                    toast.success('Jawaban Terkirim!')
                },
                onError: (errors) => {
                    toast.error('Error', 'Gagal Menyimpan Jawaban')
                },
            })
        }
    };

    const score = data.answers.filter(a => a.correct).length;

    console.log(data)

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <ParticleBackground />
            <Toaster position="top-center" richColors />

            {!showResult ? (
                <div className="bg-white/20 rounded-lg w-full h-2/3 px-10 mx-10">
                    <Badge className="text-xl font-bold mb-4 mt-10">
                        Question {currentIndex + 1} from {questions.length}
                    </Badge>
                    <p className="text-[30px] pt-20">
                        {currentQuestion.question}
                    </p>
                    { currentQuestion.is_shortAnswer ? 
                        (
                            <div className="w-full pt-3">
                                <Input type="text" placeholder="Ketik jawaban anda..."
                                    className="w-full p-10 border rounded-md"
                                    value={shortAnswer}
                                    onChange={(e) => setShortAnswer(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && shortAnswer.trim() !== '') {
                                            handleQuestion(shortAnswer);
                                        }
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2 items-center justify-center pt-3">
                                {currentQuestion.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuestion(option)}
                                        className="bg-blue-500 text-white p-2 py-10 rounded-md hover:bg-blue-600"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                </div>
            ) : (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
                    <p className="text-lg mb-2">Correct Answer: {score}</p>
                    <p className="text-lg mb-4">
                        Wrong Answer: {questions.length - score}
                    </p>

                    <h3 className="font-semibold mt-6 mb-2">Detail Answer:</h3>
                    <ul className="text-left list-disc pl-6">
                        {data.answers.map((ans, i) => {
                            const q = questions.find(
                                q => q.id === ans.questionId
                            );
                            return (
                                <li key={i} className="mb-2">
                                    <strong>{q.question}</strong>
                                    <br />
                                    Your Answer:{' '}
                                    <span
                                        className={
                                            ans.correct
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }
                                    >
                                        {ans.selected}
                                    </span>
                                    <br />
                                    Correct Answer: {q.answer}
                                </li>
                            );
                        })}
                    </ul>

                    <Link
                        href="/"
                        className="absolue p-2 bg-white rounded-lg text-black bottom-3"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            )}
        </div>
    );
}
