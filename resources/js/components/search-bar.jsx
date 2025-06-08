import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';

export default function SearchBar({ searchTerm, setSearchTerm, setClicked }) {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const maxs = {
        '<10': [0, 10],
        '10-30': [10, 30],
        '30-50': [30, 50],
        '>50': [50, 100],
    }; // Sumber filter

    const checklist = max => {
        const checked = selectedFilters.includes(max); // Mengisi selectedFilters

        if (checked) {
            setSelectedFilters(selectedFilters.filter(item => item !== max));
        } else {
            setSelectedFilters([...selectedFilters, max]);
        }
    };

    const apply = () => {
        const query = selectedFilters.map(key => maxs[key]);
        setClicked(query);
    };

    return (
        <div className="flex relative w-full md:h-full md:pr-10 space-x-2 md:space-x-5">
            <div className="relative w-full md:pr-1">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)} // e.target tempat event terjadi
                    className="rounded-lg w-full min-h-8 md:min-h-10 text-sm placeholder-black focus:outline-none text-black pl-3 pr-13 bg-[#D9D9D9]"
                    placeholder="Mau Cari Apa?"
                />
                <div className="absolute right-3 md:right-15 top-5 transform -translate-y-1/2 w-[25px] h-[25px] text-black">
                    <svg
                        width={24}
                        height={24}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        {' '}
                        <path
                            d="M6 2h8v2H6V2zM4 6V4h2v2H4zm0 8H2V6h2v8zm2 2H4v-2h2v2zm8 0v2H6v-2h8zm2-2h-2v2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm0-8h2v8h-2V6zm0 0V4h-2v2h2z"
                            fill="currentColor"
                        />{' '}
                    </svg>
                </div>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="rounded-md h-[45px] w-[45px] hover:bg-gray-800 bg-black/30 text-white">
                        <svg
                            width={24}
                            height={24}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            {' '}
                            <path
                                d="M17 4h2v10h-2V4zm0 12h-2v2h2v2h2v-2h2v-2h-4zm-4-6h-2v10h2V10zm-8 2H3v2h2v6h2v-6h2v-2H5zm8-8h-2v2H9v2h6V6h-2V4zM5 4h2v6H5V4z"
                                fill="currentColor"
                            />{' '}
                        </svg>
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-black text-white">
                    <DialogHeader>
                        <DialogTitle className="text-white">
                            Jumlah Maksimal Peserta
                        </DialogTitle>
                    </DialogHeader>
                    <div className="">
                        {Object.entries(maxs).map(([key, value]) => (
                            <div
                                key={key}
                                className="flex items-center space-x-2 space-y-5"
                            >
                                <Checkbox
                                    id={key}
                                    checked={selectedFilters.includes(key)}
                                    onCheckedChange={() => checklist(key)}
                                ></Checkbox>
                                <Label
                                    className="text-white mb-6 text-md"
                                    htmlFor={key}
                                >
                                    {key}
                                </Label>
                            </div>
                        ))}
                    </div>
                    <DialogFooter className="mt-3">
                        <div className="flex w-full space-x-3 pr-1">
                            <DialogClose asChild>
                                <Button variant="outline" className="w-1/2">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button onClick={apply} className="w-1/2">
                                    Apply
                                </Button>
                            </DialogClose>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
