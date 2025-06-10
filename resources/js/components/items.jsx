import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import point from '../../../public/images/point.png';

function Items({ searchTerm, clicked, data }) {
    const [quiz, setQuiz] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = setQuiz(data);

        const delay = setTimeout(fetchData, 500);
        return () => clearTimeout(delay);
    }, [data]) 

    const filteredData = quiz.filter((item) => {
        const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        let matchFilter = true
        if (clicked == 1) {
            matchFilter = item.max >= 0 && item.max <= 10
        } else if (clicked == 2) {
            matchFilter = item.max >= 10 && item.max <= 30
        } else if (clicked == 3) {
            matchFilter = item.max >= 30 && item.max <= 50
        } else if (clicked == 4) {
            matchFilter = item.max >= 50
        }

        return matchSearch && matchFilter
    });

    const filter = quiz.filter((item) => {
        if (clicked == 1) {
            return item.max >= 0 && item.max <= 10
        } else if (clicked == 2) {
            return item.max >= 10 && item.max <= 30
        } else if (clicked == 3) {
            return item.max >= 30 && item.max <= 50
        } else if (clicked == 4) {
            return item.max >= 50
        }
    });

    // Responsive Items Per Page (Mobile: 6, PC: 10)
    const itemsPerPage = window.innerWidth >= 1024 ? 6 : 6;

    const totalPages = Math.ceil(quiz.length / itemsPerPage); // Math.ceil untk pembulatan ke atas, ex : 10/6 = 1,... > 2
    const startIndex = (currentPage - 1) * itemsPerPage; // Mulai index berapa item di tampilkan
    const selectedItems = filteredData.slice(startIndex, startIndex + itemsPerPage); // ex : (1 - 1) * 6 = 0 (artinya indeks muncul dari 0 - 5) or (2 - 1) * 6 = 6 (6-11)

    console.log(clicked)
    console.log(filter)
    console.log(quiz.max)

    return (
        <div className="relative pb-20 md:pt-15">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:pl-10 md:pr-10 w-full">
                {selectedItems.length > 0 ? (
                    selectedItems.map(quiz => (
                        <motion.div
                            key={quiz.id}
                            whileHover={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="relative rounded-lg min-h-10 min-w-10 md:h-full w-full">
                                <div className="relative justify-items-center w-full">
                                    <img
                                        className="rounded-lg w-full md:h-80 bg-white"
                                        src={point}
                                        alt="stuff"
                                    />
                                    {quiz.max && (
                                        <Badge className="absolute right-1 bottom-1 bg-yellow-500 md:bottom-2md:text-[20px]">
                                            Maks : {quiz.max}
                                        </Badge>
                                    )}
                                </div>
                                <p className="font-bold md:text-[40px]">
                                    {quiz.title}
                                </p>
                                <Badge className="bg-blue-500 md:text-[20px]">
                                    {quiz.teacher || 'Unknown'}
                                </Badge>{' '}
                                <br />
                                <Badge className="bg-gray-500 md:text-[15px] md:mt-2">
                                    {quiz.updated_at}
                                </Badge>
                                {quiz.status === 0 ? (
                                    <Badge className="absolute top-1 right-1 bg-red-500 md:text-[20px]">
                                        Closed
                                    </Badge>
                                ) : quiz.status === 1 ? (
                                    <Badge className="absolute top-1 right-1 bg-green-500 md:text-[20px]">
                                        Opened
                                    </Badge>
                                ) : null}
                            </div>
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
