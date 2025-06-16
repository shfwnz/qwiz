import React, { useEffect, useState } from 'react';
import Header from '@/components/layouts/header';
import SearchBar from '@/components/search-bar';
import Items from '@/components/items';
import Footer from '@/components/layouts/footer';
import ParticlesBackground from '@/components/particle-background';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function Quizzes() {
    const [searchTerm, setSearchTerm] = useState('');
    const [clicked, setClicked] = useState();

    const { data, flash } = usePage().props;

    useEffect(() => {
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (flash?.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    console.log(flash)

    return (
        <div className="container mx-auto max-w-7xl">
            <ParticlesBackground />
            <Toaster position="top-center" richColors />
            <div className="relative text-white right-0 left-0 bottom-0 p-4 min-h-screen min-w-full font-bold font-handjet">
                <div className="relative top-5 space-y-8 h-[200px] md:min-h-[180px] min-w-full z-50">
                    <Header />
                    <div className="relative min-w-full md:pl-10">
                        <h3 className="text-[30px]">List of Quizzies</h3>
                        <SearchBar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            clicked={clicked}
                            setClicked={setClicked}
                        />
                    </div>
                </div>

                <Items data={data} searchTerm={searchTerm} clicked={clicked} />

                <Footer />
            </div>
        </div>
    );
}
