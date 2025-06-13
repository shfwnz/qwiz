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

                <Card className="flex justify-center items-center bg-transparent">
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
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="flex justify-center">
                                    Your Current Profile
                                </DialogTitle>
                            </DialogHeader>
                            <div className="">
                                <div className="mb-4">
                                    <Label className="block text-sm mb-1">NEW USERNAME</Label>
                                    <Input
                                        type="text"
                                        className="w-full rounded-md bg-black border border-gray-500 text-white px-2 py-1 text-sm font-mono focus:outline-none"
                                        // value={username}
                                        // onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Label className="block text-sm mb-1">NEW EMAIL</Label>
                                    <Input
                                        type="text"
                                        className="w-full rounded-md bg-black border border-gray-500 text-white px-2 py-1 text-sm font-mono focus:outline-none"
                                        // value={username}
                                        // onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter className="mt-3">
                                <div className="flex w-full space-x-3 pr-1">
                                    <DialogClose asChild>
                                        <Button variant="outline" className="w-1/2">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button className="w-1/2">
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
