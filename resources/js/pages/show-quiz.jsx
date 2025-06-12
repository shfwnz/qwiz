import Footer from '@/components/layouts/footer';
import ParticleBackground from '@/components/particle-background';
import { router, usePage } from '@inertiajs/react';
import point from '../../../public/images/point.png';
import { Badge } from '@/components/ui/badge';

export default function showQuiz() {
    const { data } = usePage().props;

    const startQuiz = id => {
        router.visit(`/quiz/start/${id}`);
    };

    return (
        <div className="container mx-auto max-w-7xl">
            <ParticleBackground />

            <div className="grid grid-cols-2 w-full h-full space-x-5 pt-10 mx-5">
                <div className="">
                    <div className="relative w-full">
                        <img
                            className="rounded-lg w-full md:h-95 bg-white"
                            src={point}
                            alt="stuff"
                        />
                        {data.max_participants && (
                            <Badge className="absolute right-1 bottom-0 bg-yellow-500 md:bottom-2 md:text-[15px]">
                                Max Join : {data.max_participants}
                            </Badge>
                        )}
                        {data.visibility === 'public' ? (
                            <Badge className="absolute right-1 top-1 bg-green-500 md:text-[20px]">
                                Public
                            </Badge>
                        ) : data.visibility === 'private' ? (
                            <Badge className="absolute right-1 top-1 bg-blue-500 md:text-[20px]">
                                Private
                            </Badge>
                        ) : null}
                    </div>
                    <h1 className="text-[45px] font-bold">{data.title}</h1>
                    <div className="flex gap-2 items-center">
                        <Badge className="bg-blue-500 md:text-[20px]">
                            {data.teacher || 'Unknown'}
                        </Badge>
                        <Badge className="bg-gray-500 md:text-[20px]">
                            {data.updated_at}
                        </Badge>
                    </div>
                    <button
                        onClick={() => startQuiz(data.id)}
                        className="text-[50px] justify-items-center w-full mt-7 bg-[#FEFEFE] rounded-lg text-black hover:bg-white/50"
                    >
                        START
                    </button>
                </div>
                <div className="bg-white/10 pl-5 pt-5 rounded-lg mb-15">
                    {data.description}
                </div>
            </div>

            <Footer />
        </div>
    );
}
