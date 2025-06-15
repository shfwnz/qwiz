import React, { useState } from 'react';
import Footer from '@/components/layouts/footer';
import ParticleBackground from '@/components/particle-background';
import { router, usePage } from '@inertiajs/react';
import point from '../../../public/images/suprised-car.png';
import { Badge } from '@/components/ui/badge';

export default function showQuiz() {
    const { auth, data } = usePage().props;
    const [isJoining, setIsJoining] = useState(false);

    const joinWaitingRoom = id => {
        setIsJoining(true);
        router.visit(`/quiz/waiting-room/${id}`);
    };

    const startQuiz = id => {
        if (data.visibility === 'public') {
            // Public quiz
            router.visit(`/quiz/start/${id}`);
        } else {
            // Private quiz
            joinWaitingRoom(id);
        }
    };

    const getButtonText = () => {
        if (isJoining) return 'JOINING...';

        if (data.visibility === 'public') {
            return 'START QUIZ';
        } else {
            const isOwner = auth?.id === data.teacher_id;
            return isOwner ? 'Manage Quiz' : 'Join Waiting Room';
        }
    };

    const getButtonClass = () => {
        const baseClass =
            'text-[50px] justify-items-center w-full mt-7 rounded-lg font-bold transition-all duration-200';

        if (data.visibility === 'public') {
            return `${baseClass} bg-green-500 hover:bg-green-600`;
        } else {
            return `${baseClass} bg-blue-500 hover:bg-blue-600`;
        }
    };


    return (
        <div className="container mx-auto max-w-7xl">
            <ParticleBackground />

            <div className="grid grid-cols-2 w-full h-full space-x-5 pb-36 pt-10 mx-5">
                <div className="space-y-4">
                    <div className="relative w-full">
                        <img
                            className="rounded-lg w-full md:h-95 bg-white"
                            src={point}
                            alt="stuff"
                        />
                        {data.max_participants && (
                            <Badge className="absolute right-1 bottom-0 bg-yellow-500/50 md:bottom-1 md:text-2xl">
                                Max Join : {data.max_participants}
                            </Badge>
                        )}
                        {data.visibility === 'public' ? (
                            <Badge className="absolute right-1 top-1 bg-gray-500/50 md:text-2xl">
                                Public
                            </Badge>
                        ) : data.visibility === 'private' ? (
                            <Badge className="absolute right-1 top-1 bg-gray-500/50 md:text-2xl">
                                Private
                            </Badge>
                        ) : null}
                    </div>
                    <h1 className="text-5xl font-bold">{data.title}</h1>
                    <div className="flex gap-2 items-center">
                        <Badge className="md:text-2xl" variant="secondary">
                            {data.teacher || 'Unknown'}
                        </Badge>
                        <Badge className="md:text-2xl" variant="secondary">
                            {data.updated_at}
                        </Badge>
                    </div>

                    {data.visibility === 'private' && (
                        <div className="border border-slate-500 rounded-lg p-4 mb-4">
                            <h3 className="font-semibold mb-2">Private Quiz</h3>
                            <p className="text-sm">
                                This quiz requires a waiting room. All
                                participants will start simultaneously when
                                organizer starts the session.
                            </p>
                        </div>
                    )}

                    {data.visibility === 'public' && (
                        <div className="border border-slate-500 rounded-lg p-4 mb-4">
                            <h3 className="font-semibold mb-2">Public Quiz</h3>
                            <p className="text-sm">
                                This quiz can be started at any time. You can
                                work at your own pace.
                            </p>
                        </div>
                    )}

                    <button
                        onClick={() => startQuiz(data.id)}
                        disabled={isJoining}
                        className={getButtonClass()}
                    >
                        {getButtonText()}
                    </button>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg h-full">
                    <h2 className="text-white text-xl font-semibold mb-4">
                        Quiz Description
                    </h2>
                    <div className="text-white/90 leading-relaxed">
                        {data.description ||
                            'No description is available for this quiz.'}
                    </div>

                    {/* Quiz statistics */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-white">
                                {data.questions_count || 0}
                            </div>
                            <div className="text-sm text-white/70">
                                Questions
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-white">
                                {data.time_limit_minutes || '∞'}
                            </div>
                            <div className="text-sm text-white/70">minutes</div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
