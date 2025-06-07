import React, { useState } from 'react';
import Header from '@/components/layouts/header';
import SearchBar from '@/components/search-bar';
import Items from '@/components/items';
import Footer from '@/components/layouts/footer';

export default function Quizzes() {
    const [searchTerm, setSearchTerm] = useState('');
    const [clicked, setClicked] = useState();

    return (
        <div className="container mx-auto max-w-4/5">
            <div className="relative text-white right-0 left-0 bottom-0 p-4 min-h-screen min-w-full font-bold font-handjet">
                <div className="relative top-5 space-y-8 h-[200px] md:min-h-[180px] min-w-full z-50">
                    <Header />
                    <div className="relative min-w-full md:pl-10">
                        <h3 className="text-[30px]">Daftar Quizzies</h3>
                        <SearchBar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            clicked={clicked}
                            setClicked={setClicked}
                        />
                    </div>
                </div>

                <Items searchTerm={searchTerm} clicked={clicked} />

                <Footer />
            </div>
        </div>
    );
}
