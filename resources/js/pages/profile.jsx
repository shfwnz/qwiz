import React, { useEffect } from 'react';
import Footer from '@/components/layouts/footer.jsx';
import ParticlesBackground from '@/components/particle-background';
import HistoryCard from '@/components/history-card';
import character from '../../../public/images/profile.png';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMotionValue, useTransform, animate, motion } from 'framer-motion';

const profile = () => {
    const pointCounting = useMotionValue(0);
    const quizCounting = useMotionValue(0);
    const pointResult = useTransform(pointCounting, Math.round);
    const quizResult = useTransform(quizCounting, Math.round);

    useEffect(() => {
        const pointAnimation = animate(pointCounting, 12000, {
            duration: 2,
        });

        const quizAnimation = animate(quizCounting, 100, {
            duration: 2.5,
        });
    }, []);

    return (
        <div className="container mx-auto max-w-7xl py-10">
            <ParticlesBackground />
            <Card className="px-4 py-8 lg:px-6 lg:py-10">
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center gap-6">
                            <div className="border rounded-2xl p-4 flex-shrink-0">
                                <img
                                    src={character}
                                    alt=""
                                    className="w-64 h-64 object-cover"
                                />
                            </div>

                            <div className="text-center lg:text-left space-y-6 flex-1 min-w-0">
                                <h1 className="text-4xl font-bold text-white">
                                    Thomas Alva Edison
                                </h1>

                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-3">
                                        <div className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 flex-1">
                                            <p className="text-sm text-gray-400">
                                                Email
                                            </p>
                                            <p className="text-white font-medium">
                                                email@gmail.com
                                            </p>
                                        </div>

                                        <div className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 flex-1">
                                            <p className="text-sm text-gray-400">
                                                Phone
                                            </p>
                                            <p className="text-white font-medium">
                                                +62 123-8392-2198
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 border p-3 rounded-2xl items-center justify-center">
                                        <div className="border rounded-2xl text-center p-3 flex-1">
                                            <h3 className="text-2xl">
                                                Total Score
                                            </h3>
                                            <motion.p className="text-2xl">
                                                {pointResult}
                                            </motion.p>
                                        </div>

                                        <div className="border rounded-2xl text-center p-3 flex-1">
                                            <h3 className="text-2xl">
                                                Quiz Taken
                                            </h3>
                                            <motion.p className="text-2xl">
                                                {quizResult}
                                            </motion.p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardTitle>
                    <CardAction>
                        <Button variant="outline" size="sm">
                            Edit Profile
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div>
                        <h1 className="text-4xl text-justify w-full">
                            History
                        </h1>
                        <HistoryCard />
                    </div>
                </CardContent>

                <CardFooter>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="">Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gradient-to-b from-[#1a1a2e] to-[#16213e] border-4 border-indigo-500 shadow-[6px_6px_0_rgba(0,0,0,1)] rounded-md text-white font-pixel max-w-md">
                            <DialogHeader>
                                <DialogTitle className="flex justify-center">
                                    ⚙️ Edit Profile
                                </DialogTitle>
                                <hr className="border-gray-500 my-4" />
                            </DialogHeader>
                            <div className="">
                                <div className="mb-4">
                                    <Label className="block text-xs tracking-wider mb-1">
                                        NEW USERNAME
                                    </Label>
                                    <Input
                                        type="text"
                                        className="w-full bg-black border border-gray-400 text-green-400 px-2 py-1 text-sm font-mono focus:outline-none focus:ring-0 rounded-none shadow-[2px_2px_0_rgba(0,0,0,1)]"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Label className="block text-xs tracking-wider mb-1">
                                        NEW EMAIL
                                    </Label>
                                    <Input
                                        type="text"
                                        className="w-full bg-black border border-gray-400 text-green-400 px-2 py-1 text-sm font-mono focus:outline-none focus:ring-0 rounded-none shadow-[2px_2px_0_rgba(0,0,0,1)]"
                                    />
                                </div>
                            </div>
                            <DialogFooter className="mt-3">
                                <div className="flex w-full space-x-3 pr-1">
                                    <DialogClose asChild>
                                        <Button
                                            variant="outline"
                                            className="w-1/2 bg-black text-white border-2 border-white shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-gray-700 hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button className="w-1/2 bg-white text-black font-bold border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-gray-300 hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                                            Save
                                        </Button>
                                    </DialogClose>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>

            <Footer />
        </div>
    );
};

export default profile;
