import ParticleBackground from '@/components/particle-background';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';

export default function quizAttempt() {
    const questions = [
        {
            id: 1,
            question: 'Menurut Tuan Krab hipotermia artinya?',
            options: [
                'Ketakutan akan santa claus',
                'Surat lamaran pekerjaan',
                'Krabby gendut',
                'dua belas',
            ],
            answer: 'Krabby gendut',
        },
        // {
        //     id: 2,
        //     question: "Jika balap kuda bukan instrument maka ...?",
        //     options: ["Hey sudahlah", "Ranjau juga bukan instrumen", "Jangan nakal ya", "Bukan, ini patrik"],
        //     answer: "Ranjau juga bukan instrumen"
        // },
        // {
        //     id: 3,
        //     question: "The hash ...?",
        //     options: ["Sybau", "slinging slasher", "Sank in sheer", "Singing Laser"],
        //     answer: "slinging slasher"
        // },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswer] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const currentQuestion = questions[currentIndex];

    const handleQuestion = selected => {
        const updateAnswer = [
            ...userAnswers,
            {
                questionId: currentQuestion.id,
                selected,
                correct: selected === currentQuestion.answer,
            },
        ];
        setUserAnswer(updateAnswer);

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    const score = userAnswers.filter(a => a.correct).length;

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <ParticleBackground />

            {!showResult ? (
                <div className="bg-white/20 rounded-lg w-full h-2/3 px-10 mx-10">
                    <Badge className="text-xl font-bold mb-4 mt-10">
                        Soal {currentIndex + 1} dari {questions.length}
                    </Badge>
                    <p className="text-[30px] pt-20">
                        {currentQuestion.question}
                    </p>
                    <div className="grid grid-cols-2 gap-2 items-center justify-center pt-3">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuestion(option)}
                                className="bg-blue-500 text-white p-2 py-10 rounded-md rounded hover:bg-blue-600"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Hasil Quiz</h2>
                    <p className="text-lg mb-2">Jawaban Benar: {score}</p>
                    <p className="text-lg mb-4">
                        Jawaban Salah: {questions.length - score}
                    </p>

                    <h3 className="font-semibold mt-6 mb-2">Detail Jawaban:</h3>
                    <ul className="text-left list-disc pl-6">
                        {userAnswers.map((ans, i) => {
                            const q = questions.find(
                                q => q.id === ans.questionId
                            );
                            return (
                                <li key={i} className="mb-2">
                                    <strong>{q.question}</strong>
                                    <br />
                                    Jawaban kamu:{' '}
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
                                    Jawaban benar: {q.answer}
                                </li>
                            );
                        })}
                    </ul>

                    <Link
                        href="/"
                        className="absolue p-2 bg-white rounded-lg text-black bottom-3"
                    >
                        Kembali ke Dashboard
                    </Link>
                </div>
            )}
        </div>
    );
}
