import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import point from '../../../public/images/suprised-car.png';

function Items({ searchTerm, clicked, data }) {
    const [quiz, setQuiz] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = setQuiz(data);

        const delay = setTimeout(fetchData, 500);
        return () => clearTimeout(delay);
    }, [data]);

    const filteredData = quiz.filter(item => {
        const matchSearch = item.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        let matchFilter = true;
        if (clicked == 1) {
            matchFilter = item.max_participants >= 0 && item.max_participants <= 10;
        } else if (clicked == 2) {
            matchFilter = item.max_participants >= 10 && item.max_participants <= 30;
        } else if (clicked == 3) {
            matchFilter = item.max_participants >= 30 && item.max_participants <= 50;
        } else if (clicked == 4) {
            matchFilter = item.max_participants >= 50;
        }

        return matchSearch && matchFilter;
    });

    const detailItem = slug => {
        router.visit(`quiz/${slug}`);
    };

    const itemsPerPage = 6;

    const totalPages = Math.ceil(quiz.length / itemsPerPage); // Math.ceil untk pembulatan ke atas, ex : 10/6 = 1,... > 2
    const startIndex = (currentPage - 1) * itemsPerPage; // Mulai index berapa item di tampilkan
    const selectedItems = filteredData.slice(
        startIndex,
        startIndex + itemsPerPage
    ); // ex : (1 - 1) * 6 = 0 (artinya indeks muncul dari 0 - 5) or (2 - 1) * 6 = 6 (6-11)

    return (
        <div className="relative pb-20 md:pt-15">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:pl-10 md:pr-10 w-full">
                {selectedItems.length > 0 ? (
                    selectedItems.map(quiz => (
                        <motion.div
                            key={quiz.id}
                            whileHover={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                onClick={() => detailItem(quiz.slug)}
                                className="relative rounded-lg md:h-full w-full bg-white/"
                                variant={'ghost'}
                            >
                                <Card className="bg-white/ border-none flex flex-col h-full relative">
                                    <div className="relative w-full h-60 md:h-80 h-1/2">
                                        <img
                                            className="rounded-lg w-[1000px] md:h-80 object-cover bg-white"
                                            src={point}
                                            alt="stuff"
                                        />
                                        {quiz.max_participants && (
                                            <Badge className="absolute right-1 bottom-1 bg-yellow-500 md:bottom-2 md:text-[15px]">
                                                Maks : {quiz.max_participants}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 justify-start items-start h-1/2">
                                        <div className='h-1/2'>
                                            <p className="font-bold md:text-[40px] text-start h-[150px] break-words whitespace-normal">
                                                {quiz.title}
                                            </p>
                                        </div>
                                        <div className='grid grid-cols-1 '>
                                            <Badge className="bg-blue-500 md:text-[20px]">
                                                {quiz.teacher || 'Unknown'}
                                            </Badge>
                                            <Badge className="bg-gray-500 md:text-[15px] md:mt-2">
                                                {quiz.updated_at}
                                            </Badge>
                                        </div>
                                    </div>
                                    {quiz.visibility === 'public' ? (
                                        <Badge className="absolute right-5 top-9 bg-green-500 md:text-[20px]">
                                            Publik
                                        </Badge>
                                    ) : quiz.visibility === 'private' ? (
                                        <Badge className="absolute right-5 top-9 bg-blue-500 md:text-[20px]">
                                            Private
                                        </Badge>
                                    ) : null}
                                </Card>
                            </Button>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-gray-400">No Quizzes Found</p>
                )}
            </div>

            {/* Untuk pagination*/}
            {totalPages > 1 && selectedItems.length > 0 && (
                <div className="flex justify-center mt-4 space-x-3">
                    <button
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
                        onClick={() =>
                            setCurrentPage(prev => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span className="text-white">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
                        onClick={() =>
                            setCurrentPage(prev =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default Items;
