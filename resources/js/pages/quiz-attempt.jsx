import ParticleBackground from '@/components/particle-background';
import { useState, useEffect } from 'react';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function quizAttempt() {
    const savedAnswers = JSON.parse(
        sessionStorage.getItem('quiz_answers') || '[]'
    );
    const savedShort = sessionStorage.getItem('quiz_short_answer') || '';

    const { dataQuestions, attempts, isMaxAttempt } = usePage().props;
    const questions = dataQuestions.questions.map(item => {
        return {
            id: item.id,
            question: item.question_text,
            options: item.options.map(opt => opt.option_text),
            answer:
                item.options.find(opt => opt.is_correct === 1)?.option_text ||
                null,
            is_shortAnswer: item.question_type === 'short_answer',
            score: item.points,
        };
    });

    const isDone = attempts?.status === 'completed';

    const savedIndex = isDone
        ? parseInt(sessionStorage.getItem('quiz_current_index') || '0')
        : 0;

    const [shortAnswer, setShortAnswer] = useState(savedShort);
    const [currentIndex, setCurrentIndex] = useState(savedIndex);
    const [showResult, setShowResult] = useState(false);

    const { data, setData, post } = useForm({
        answers: savedAnswers
    });

    const currentQuestion = questions[currentIndex];
    // const isFinished = ;
    const correct = attempts?.student_answer?.filter(a => a.is_correct === 1).length;
    const wrong = attempts?.student_answer?.filter(a => a.is_correct === 0).length;

    const handleQuestion = selected => {
        const correct = selected === currentQuestion.answer;

        const newAnswer = {
            quizId: dataQuestions.id,
            questionId: currentQuestion.id,
            attemptId: attempts.id,
            selected,
            correct: selected === currentQuestion.answer ? 1 : 0,
            score: correct
                ? questions.find(q => q.id === currentQuestion.id)?.score || 0
                : 0,
        };

        setData('answers', [...data.answers, newAnswer]);
        setShortAnswer('');

        if (currentIndex + 1 === questions.length) {
            setShowResult(true);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const tryAgain = () => {
        sessionStorage.removeItem('quiz_answers');
        sessionStorage.removeItem('quiz_short_answer');
        sessionStorage.removeItem('quiz_current_index');
        setShowResult(false);
        router.visit(`/quiz/start/${dataQuestions.id}`);
    };

    useEffect(() => {
        if (data.answers.length == questions.length) {
            post('/submit/quiz', {
                onSuccess: () => {
                    toast.success('Quiz Completed!');
                    sessionStorage.removeItem('quiz_answers');
                    sessionStorage.removeItem('quiz_short_answer');
                    sessionStorage.removeItem('quiz_current_index');
                },
                onError: errors => {
                    toast.error('Error', 'Internal Error: Failed To Save Record Attempt');
                },
            });
        }
    }, [data.answers.length]);

    useEffect(() => {
        sessionStorage.setItem('quiz_current_index', currentIndex);
    }, [currentIndex]);

    useEffect(() => {
        sessionStorage.setItem('quiz_answers', JSON.stringify(data.answers));
    }, [data.answers]);

    useEffect(() => {
        sessionStorage.setItem('quiz_short_answer', shortAnswer);
    }, [shortAnswer]);

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <ParticleBackground />
            <Toaster position="top-center" richColors />

            {showResult || isDone ? (
                <div className="flex items-center justify-center rounded-lg bg-[#0d1117] p-10 w-1/2">
                    <Card className="w-full max-w-lg text-center bg-white/10 backdrop-blur-md border-white/10 text-white">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Your Latest Quiz Result
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-lg">
                                <p>
                                    ✅ Correct Answer:{' '}
                                    <span className="font-semibold text-green-400">
                                        {correct}
                                    </span>
                                </p>
                                <p>
                                    ❌ Wrong Answer:{' '}
                                    <span className="font-semibold text-red-400">
                                        {wrong}
                                    </span>
                                </p>
                                <p>
                                    🎯 Score:{' '}
                                    <span className="font-semibold text-yellow-300">
                                        {attempts.total_score}
                                    </span>
                                </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm uppercase text-white/70">
                                    Percentage
                                </p>
                                <Progress
                                    value={attempts.percentage}
                                    className="h-3 bg-white/20"
                                />
                                <p className="text-xl font-bold">
                                    {attempts.percentage}%
                                </p>
                            </div>

                            <div className="flex justify-center gap-4 pt-4">
                            <Button variant="secondary"
                                onClick={tryAgain}
                                disabled={isMaxAttempt === true}
                            >
                            {isMaxAttempt ? 'Max Attempt Reached' : 'Try Again'}
                            </Button>
                                <Link
                                    href="/"
                                    className="absolue p-2 bg-white rounded-lg text-black bottom-3"
                                >
                                    🔙 Return to Dashboard
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="w-full flex justify-center">
                    <Card className="w-full max-w-4xl bg-[#1a1d29] border border-[#2f3549] text-white p-8 rounded-xl shadow-lg space-y-6">
                        <CardHeader className="flex flex-col items-start gap-2">
                            <Badge className="bg-indigo-700 text-white px-4 py-1 text-base rounded-md">
                                Question {currentIndex + 1} of{' '}
                                {questions.length}
                            </Badge>
                            <CardTitle className="text-3xl font-semibold text-white/90">
                                {currentQuestion.question}
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            {currentQuestion.is_shortAnswer ? (
                                <Input
                                    type="text"
                                    placeholder="Type your answer..."
                                    className="w-full bg-[#2b3044] border border-[#47526b] text-white placeholder-white/40 text-lg p-4 rounded-md focus:ring-2 focus:ring-indigo-500"
                                    value={shortAnswer}
                                    onChange={e =>
                                        setShortAnswer(e.target.value)
                                    }
                                    onKeyDown={e => {
                                        if (
                                            e.key === 'Enter' &&
                                            shortAnswer.trim() !== ''
                                        ) {
                                            handleQuestion(shortAnswer);
                                        }
                                    }}
                                />
                            ) : (
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    {currentQuestion.options.map(
                                        (option, index) => (
                                            <Button
                                                key={index}
                                                onClick={() =>
                                                    handleQuestion(option)
                                                }
                                                variant="ghost"
                                                className="bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 text-white text-lg py-6 rounded-lg border border-indigo-400 shadow-md"
                                            >
                                                {option}
                                            </Button>
                                        )
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
