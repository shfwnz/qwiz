import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@react-hook/media-query';
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
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMotionValue, useTransform, animate, motion } from 'framer-motion';
import { Head } from '@inertiajs/react';

function ProfileForm({ className, onSave }) {
    const [formData, setFormData] = useState({
        username: 'Thomas Alva Edison',
        email: 'email@gmail.com',
    });

    const handleSave = () => {
        console.log('Saving profile:', formData);
        if (onSave) onSave(formData);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className={cn('grid items-start gap-4', className)}>
            <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    value={formData.username}
                    onChange={e => handleChange('username', e.target.value)}
                    className="bg-black border border-gray-400 text-green-400 px-2 py-1 text-sm font-mono focus:outline-none focus:ring-0 rounded-none shadow-[2px_2px_0_rgba(0,0,0,1)]"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    className="bg-black border border-gray-400 text-green-400 px-2 py-1 text-sm font-mono focus:outline-none focus:ring-0 rounded-none shadow-[2px_2px_0_rgba(0,0,0,1)]"
                />
            </div>
        </div>
    );
}

// Desktop Dialog Component
function DesktopEditProfile({ open, setOpen }) {
    const handleSave = data => {
        console.log('Desktop save:', data);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-b from-[#1a1a2e] to-[#16213e] border-4 border-indigo-500 shadow-[6px_6px_0_rgba(0,0,0,1)] rounded-md text-white font-pixel max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex justify-center">
                        ⚙️ Edit Profile
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-300">
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                    <hr className="border-gray-500 my-4" />
                </DialogHeader>

                <ProfileForm onSave={handleSave} />

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
                        <Button
                            className="w-1/2 bg-white text-black font-bold border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-gray-300 hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Mobile Drawer Component
function MobileEditProfile({ open, setOpen }) {
    const handleSave = data => {
        console.log('Mobile save:', data);
        setOpen(false);
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                    Edit Profile
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-gradient-to-b from-[#1a1a2e] to-[#16213e] border-t-4 border-indigo-500 text-white">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-xl font-bold">
                        ⚙️ Edit Profile
                    </DrawerTitle>
                    <DrawerDescription className="text-gray-300">
                        Make changes to your profile here. Click save when
                        you're done.
                    </DrawerDescription>
                </DrawerHeader>

                <div className="px-4 pb-4">
                    <ProfileForm onSave={handleSave} />
                </div>

                <DrawerFooter className="pt-2">
                    <Button
                        className="bg-white text-black font-bold border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-gray-300"
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                    <DrawerClose asChild>
                        <Button
                            variant="outline"
                            className="bg-black text-white border-2 border-white shadow-[3px_3px_0_rgba(0,0,0,1)]"
                        >
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

const profile = () => {
    const pointCounting = useMotionValue(0);
    const quizCounting = useMotionValue(0);
    const pointResult = useTransform(pointCounting, Math.round);
    const quizResult = useTransform(quizCounting, Math.round);

    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    useEffect(() => {
        const pointAnimation = animate(pointCounting, 12000, {
            duration: 2,
        });

        const quizAnimation = animate(quizCounting, 100, {
            duration: 2.5,
        });

        return () => {
            pointAnimation.stop();
            quizAnimation.stop();
        };
    }, []);

    return (
        <>
            <Head title="Profile" />
            <div className="container mx-auto max-w-7xl py-10">
                <ParticlesBackground />
                <Card className="px-4 py-8 lg:px-6 lg:py-10">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-end gap-6">
                                <div className="border rounded-2xl p-4 flex-shrink-0">
                                    <img
                                        src={character}
                                        alt=""
                                        className="w-56 h-56 object-cover"
                                    />
                                </div>

                                <div className=" text-center items-center lg:text-left space-y-6 flex-1 min-w-0">
                                    <div className="flex items-end gap-3">
                                        <h1 className="text-4xl font-bold text-white">
                                            Thomas Alva Edison
                                        </h1>
                                        <p className="text-lg text-gray-400">
                                            Student
                                        </p>
                                    </div>

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
                                        <div className="flex gap-3 items-center justify-center">
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
                            <div className="flex justify-center gap-3">
                                <Button variant="outline" size="sm">
                                    Change Role
                                </Button>
                                {isDesktop ? (
                                    <DesktopEditProfile
                                        open={open}
                                        setOpen={setOpen}
                                    />
                                ) : (
                                    <MobileEditProfile
                                        open={open}
                                        setOpen={setOpen}
                                    />
                                )}
                            </div>
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

                    <CardFooter></CardFooter>
                </Card>

                <Footer />
            </div>
        </>
    );
};

export default profile;
