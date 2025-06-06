import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const ITEMS_PER_PAGE = 6; // Mobile default

function Items({ searchTerm, clicked }) {
    const [quizzies, setQuizzies] = useState([]); // default value nya kosong
    const [currentPage, setCurrentPage] = useState(1); // Pagination

    // Untuk fetching data menggunakan useEffect agar menunggu hingga berhasil fetch dulu
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `http://127.0.0.1:8000/api/quizzes?search=${searchTerm}`
            );
            const data = await res.json();
            setQuizzies(data);
        };

        const delay = setTimeout(fetchData, 500);
        return () => clearTimeout(delay);
    }, [searchTerm]); // Hanya Runs sekali

    useEffect(() => {
        console.log(clicked);
        const fetchData = async () => {
            const res = await fetch('http://127.0.0.1:8000/api/quizzes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filter: clicked }),
            });
            const data = await res.json();
            setQuizzies(data);
        };

        const delay = setTimeout(fetchData, 500);
        return () => clearTimeout(delay);
    }, [clicked]);

    // Responsive Items Per Page (Mobile: 6, PC: 10)
    const itemsPerPage = window.innerWidth >= 1024 ? 6 : 6;

    const totalPages = Math.ceil(quizzies.length / itemsPerPage); // Math.ceil untk pembulatan ke atas, ex : 10/6 = 1,... > 2
    const startIndex = (currentPage - 1) * itemsPerPage; // Mulai index berapa item di tampilkan
    const selectedItems = quizzies.slice(startIndex, startIndex + itemsPerPage); // ex : (1 - 1) * 6 = 0 (artinya indeks muncul dari 0 - 5) or (2 - 1) * 6 = 6 (6-11)

    return (
        <div className="relative pb-20 md:pt-15">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:pl-10">
                {selectedItems.length > 0 ? (
                    selectedItems.map(quiz => (
                        <motion.div
                            key={quiz.id}
                            whileHover={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="relative rounded-lg min-h-10 min-w-10 md:min-h-100 md:max-w-108">
                                <div className="relative">
                                    <img
                                        className="rounded-lg"
                                        src="http://127.0.0.1:8000/storage/assets/image.png"
                                        alt="stuff"
                                    />
                                    {quiz.maks && (
                                        <Badge className="absolute right-1 bottom-1 bg-yellow-500 md:bottom-2md:text-[20px]">
                                            Maks : {quiz.maks}
                                        </Badge>
                                    )}
                                </div>
                                <p className="font-bold md:text-[40px]">
                                    {quiz.nama}
                                </p>
                                <Badge className="bg-blue-500 md:text-[20px]">
                                    {quiz.guru || 'Unknown'}
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
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-3">
                    <button
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
                        // Jika di klik mengubah setCurrentPage menjadi (prev merupakan value dari setCurrentPage) ex : 1 - 1, 1 = 0, 1
                        // dan Math.max mengambil nilai terbanyak yaitu 1
                        onClick={() =>
                            setCurrentPage(prev => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1} // Akan disable jika ada di page 1
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
                        disabled={currentPage === totalPages} // Disable jika currentPage sudah sampai di totalPages
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default Items;
