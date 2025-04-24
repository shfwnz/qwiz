import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const ITEMS_PER_PAGE = 6; // Mobile default

function Items({ searchTerm }) {
    const [quizzies, setQuizzies] = useState([]); // 
    const [filteredQuizzies, setFilteredQuizzies] = useState([]); // 
    const [currentPage, setCurrentPage] = useState(1); // Pagination

    // Untuk fetching data
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/quizzes")
            .then(response => response.json())
            .then(data => {
                setQuizzies(data);
                setFilteredQuizzies(data);
            })
            .catch(error => console.error("Error fetching quizzes:", error));
    }, []);

    // Untuk search engine
    useEffect(() => {
        const delaySearch = setTimeout(() => {
            setFilteredQuizzies(
                quizzies.filter(quiz =>
                    (quiz.nama?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
                    (quiz.guru?.toLowerCase() || "").includes(searchTerm.toLowerCase())
                )
            );
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [searchTerm, quizzies]);

    // Responsive Items Per Page (Mobile: 6, PC: 10)
    const itemsPerPage = window.innerWidth >= 1024 ? 6 : 6;

    const totalPages = Math.ceil(filteredQuizzies.length / itemsPerPage); // Math.ceil untk pembulatan ke atas, ex : 10/6 = 1,... > 2
    const startIndex = (currentPage - 1) * itemsPerPage; // Mulai index berapa item di tampilkan
    const selectedItems = filteredQuizzies.slice(startIndex, startIndex + itemsPerPage);  // ex : (1 - 1) * 6 = 0 (artinya indeks muncul dari 0 - 5) or (2 - 1) * 6 = 6 (6-11)

    return (
        <div className="relative pb-20 md:pt-15">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:pl-10">
                {selectedItems.length > 0 ? (
                    selectedItems.map((quiz) => (
                        <motion.div
                            key={quiz.id}
                            whileHover={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="relative rounded-lg min-h-10 min-w-10 md:min-h-100 md:max-w-108">
                                <img className="rounded-lg" src="http://127.0.0.1:8000/storage/assets/image.png" alt="stuff" />
                                <p className="font-bold md:text-[40px]">Ulangan Harian Pendidikan Kewarganegaraan Kelas 12</p>
                                <Badge className="bg-blue-500 md:text-[20px]">{quiz.guru || "Unknown"}</Badge> <br />
                                <Badge className="bg-gray-500 md:text-[15px] md:mt-2">{quiz.updated_at}</Badge>
                                { quiz.status === 0 ? (
                                    <Badge className="absolute top-1 right-1 bg-red-500 md:text-[20px]">Closed</Badge>
                                ) : quiz.status === 1 ? (
                                    <Badge className="absolute top-1 right-1 bg-green-500 md:text-[20px]">Opened</Badge>
                                ) : null}

                                { quiz.maks && (
                                    <Badge className="absolute bottom-25 right-1 bg-yellow-500 md:bottom-48 md:text-[20px]">Maks : {quiz.maks}</Badge>
                                )}
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
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span className="text-white">Page {currentPage} of {totalPages}</span>
                    <button 
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50" 
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
