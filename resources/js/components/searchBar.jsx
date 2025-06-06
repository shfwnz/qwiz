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
        <div className="flex relative w-full md:h-full md:pr-10 space-x-2 md:space-x-10">
            <div className="relative w-full md:h-full md:pr-10">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)} // e.target tempat event terjadi
                    className="rounded-lg w-full min-h-8 md:min-h-10 text-sm placeholder-black focus:outline-none text-black pl-3 bg-[#D9D9D9]"
                    placeholder="Mau Cari Apa?"
                />
                <img
                    src="http://127.0.0.1:8000/storage/assets/Search.png"
                    alt="Search"
                    className="absolute right-3 md:right-15 top-4 transform -translate-y-1/2 w-[25px] h-[25px]"
                />
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="rounded-md hover:bg-gray-800 bg-black/">
                        <img
                            src="http://127.0.0.1:8000/storage/assets/Filter.png"
                            className="w-[45px] h-[35px]"
                        />
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
                                <Button
                                    variant="outline"
                                    className="w-1/2 text-black"
                                >
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
