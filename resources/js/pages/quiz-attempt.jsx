import ParticleBackground from '@/components/particle-background';
import { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function quizAttempt() {
    const savedAnswers = JSON.parse(sessionStorage.getItem('quiz_answers') || '[]');
    const savedShort = sessionStorage.getItem('quiz_short_answer') || '';

    
    const { dataQuestions, attempt } = usePage().props;
    const attempts = dataQuestions.attempt.student_answer;
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
    const isDone = !!dataQuestions.attempt?.user_id;
    
    const savedIndex = isDone 
        ? parseInt(sessionStorage.getItem('quiz_current_index') || '0') 
        : 0;

    const [shortAnswer, setShortAnswer] = useState(savedShort);
    const [currentIndex, setCurrentIndex] = useState(savedIndex);
    const [showResult, setShowResult] = useState(false);

    const { data, setData, post, processing } = useForm({
        answers: savedAnswers
    });

    const currentQuestion = questions[currentIndex];
    const correct = attempts?.filter(a => a.is_correct === 1).length;
    const wrong = attempts?.filter(a => a.is_correct === 0).length;

    const handleQuestion = selected => {
        const correct = selected === currentQuestion.answer;

        const newAnswer = {
            questionId: currentQuestion.id,
            attemptId: attempt,
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

    useEffect(() => {
        if (data.answers.length == questions.length) {
            post('/submit/quiz', {
                    onSuccess: () => {
                        toast.success('Jawaban Terkirim!');
                        sessionStorage.removeItem('quiz_answers')
                        sessionStorage.removeItem('quiz_short_answer')
                    },
                    onError: errors => {
                        toast.error('Error', 'Gagal Menyimpan Jawaban');
                    },
                });
        }
    }, [data])

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
                        <CardTitle className="text-2xl">Quiz Result</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <div className="text-lg">
                            <p>✅ Correct Answer: <span className="font-semibold text-green-400">{correct}</span></p>
                            <p>❌ Wrong Answer: <span className="font-semibold text-red-400">{wrong}</span></p>
                            <p>🎯 Score: <span className="font-semibold text-yellow-300">{dataQuestions.attempt.total_score}</span></p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm uppercase text-white/70">Percentage</p>
                            <Progress 
                                value={dataQuestions.attempt.percentage}
                                className="h-3 bg-white/20" />
                            <p className="text-xl font-bold">{dataQuestions.attempt.percentage}</p>
                        </div>

                        <div className="flex justify-center gap-4 pt-4">
                            {/* <Button variant="secondary" 
                                // onClick={onDetailClick}
                            >
                            📄 Detail Answer
                            </Button> */}
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
                <div className="bg-white/20 rounded-lg w-full h-2/3 px-10 mx-10">
                    <Badge className="text-xl font-bold mb-4 mt-10">
                        Question {currentIndex + 1} from {questions.length}
                    </Badge>
                    <p className="text-[30px] pt-20">
                        {currentQuestion.question}
                    </p>
                    {currentQuestion.is_shortAnswer ? (
                        <div className="w-full pt-3">
                            <Input
                                type="text"
                                placeholder="Ketik jawaban anda..."
                                className="w-full p-10 border rounded-md"
                                value={shortAnswer}
                                onChange={e => setShortAnswer(e.target.value)}
                                onKeyDown={e => {
                                    if (
                                        e.key === 'Enter' &&
                                        shortAnswer.trim() !== ''
                                    ) {
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
            )}
        </div>
    );
}
