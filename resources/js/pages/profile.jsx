import React from 'react';
import Footer from '@/components/layouts/footer.jsx';
import ParticlesBackground from '@/components/particle-background';
import character from "../../../public/images/profile.png";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMotionValue, useTransform, animate, motion } from 'framer-motion';
import { useEffect } from 'react';

const profile = () => {
    const pointCounting = useMotionValue(0);
    const quizCounting = useMotionValue(0);
    const pointResult = useTransform(pointCounting, Math.round);
    const quizResult = useTransform(quizCounting, Math.round);

    useEffect(() => {
        const pointAnimation = animate(pointCounting, 12000, {
            duration: 2
        });

        const quizAnimation = animate(quizCounting, 100, {
            duration: 2.5
        });

    }, []);

    return (
        <div className="container mx-auto max-w-7xl py-10 space-y-5">
            <ParticlesBackground />

                {/* Pilih bruh */}
                {/* <Card className="flex flex-col items-center space-y-3 bg-black border-4 border-lime-500 p-6 text-lime-400 font-mono shadow-[4px_4px_0_rgba(0,255,0,0.6)]"> */}
                <Card className="flex flex-col items-center space-y-3 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] border-4 border-gray-500 p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-xl">
                    <img src={character} alt="" 
                        className='w-50 h-50'
                    />
                    <h1 className='text-[30px]'>Thomas Alva Edison</h1>
                    <div className='gap-4 font-pixel flex text-[18px]'>
                        <div className='justify-items-center'>
                            <p>Total Score</p>
                            <motion.p className=''>{pointResult}</motion.p>
                        </div>

                        <div className='h-15 w-px bg-gray-600 mx-4'></div> 

                        <div className='justify-items-center'>
                            <p>Quiz Taken</p>
                            <motion.p className=''>{quizResult}</motion.p>
                        </div>
                    </div>
                    <div className='justify-items-center text-[15px]'>
                        <p>Email: email@gmail.com</p>
                        <p>Phone: +62 123-8392-2198</p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="">
                                Edit Profile
                            </Button>
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
                                    <Label className="block text-xs tracking-wider mb-1">NEW USERNAME</Label>
                                    <Input
                                        type="text"
                                        className="w-full bg-black border border-gray-400 text-green-400 px-2 py-1 text-sm font-mono focus:outline-none focus:ring-0 rounded-none shadow-[2px_2px_0_rgba(0,0,0,1)]"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Label className="block text-xs tracking-wider mb-1">NEW EMAIL</Label>
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
                                        <Button
                                            className="w-1/2 bg-white text-black font-bold border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-gray-300 hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                                            >
                                            Save
                                        </Button>
                                    </DialogClose>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </Card>

            <Footer />
        </div>
    );
};

export default profile;
