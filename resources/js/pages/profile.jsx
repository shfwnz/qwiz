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
import { Head, useForm } from '@inertiajs/react';

function ProfileForm({ className, onSave, initialData }) {
    const { data, setData, put, processing, errors } = useForm({
        name: initialData?.name || '',
        email: initialData?.email || '',
        phone: initialData?.phone || '',
    });

    const handleSubmit = e => {
        e.preventDefault();
        put('/profile', {
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
            },
            onSuccess: () => {
                console.log('Profile updated successfully');
                if (onSave) onSave();
            },
            onError: errors => {
                console.error('Update failed:', errors);
            },
        });
    };

    return (
        <form
            id="profile-form"
            onSubmit={handleSubmit}
            className={cn('grid items-start gap-4 px-4', className)}
        >
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name}</span>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email}</span>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                    type="tel"
                    id="phone"
                    value={data.phone}
                    onChange={e => setData('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                    <span className="text-red-500 text-sm">{errors.phone}</span>
                )}
            </div>

            <Button type="submit" disabled={processing} className="hidden">
                {processing ? 'Saving...' : 'Save'}
            </Button>
        </form>
    );
}

// Desktop Dialog Component
function DesktopEditProfile({ open, setOpen, user }) {
    const handleFormSave = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center">
                        Edit Profile
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-300">
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>

                <ProfileForm onSave={handleFormSave} initialData={user} />

                <DialogFooter className="mt-3">
                    <div className="flex w-full justify-end space-x-3 pr-1">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" form="profile-form">
                            Save
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Mobile Drawer Component
function MobileEditProfile({ open, setOpen, user }) {
    const handleFormSave = () => {
        setOpen(false);
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                    Edit Profile
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-xl font-bold">
                        Edit Profile
                    </DrawerTitle>
                    <DrawerDescription className="text-gray-300">
                        Make changes to your profile here. Click save when
                        you're done.
                    </DrawerDescription>
                </DrawerHeader>

                <ProfileForm onSave={handleFormSave} initialData={user} />

                <DrawerFooter className="pt-2">
                    <Button type="submit" form="profile-form">
                        Save Changes
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

const Profile = ({ user, quizHistory }) => {
    const pointCounting = useMotionValue(0);
    const quizCounting = useMotionValue(0);
    const pointResult = useTransform(pointCounting, Math.round);
    const quizResult = useTransform(quizCounting, Math.round);

    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    useEffect(() => {
        const pointAnimation = animate(pointCounting, user.total_points || 0, {
            duration: 2,
        });

        const quizAnimation = animate(
            quizCounting,
            user.quizzes_completed || 0,
            {
                duration: 2.5,
            }
        );

        return () => {
            pointAnimation.stop();
            quizAnimation.stop();
        };
    }, [user.total_points, user.quizzes_completed]);

    return (
        <>
            <Head title="Profile" />
            <div className="container mx-auto max-w-7xl py-10">
                <ParticlesBackground />
                <Card className="px-4 py-8 lg:px-6 lg:py-10">
                    <CardHeader className="flex flex-col md:flex-row justify-between">
                        <CardTitle className="w-full">
                            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                                <div className="border rounded-2xl p-4 flex-shrink-0">
                                    <img
                                        src={character}
                                        alt="Profile Picture"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="text-center items-center lg:text-left space-y-6 flex-1 min-w-0">
                                    <div className="flex flex-col md:flex-row md:items-end gap-3">
                                        <h1 className="text-4xl font-bold text-white capitalize">
                                            {user.name}
                                        </h1>
                                        <p className="text-lg text-gray-400 capitalize">
                                            {user.role}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <div className="px-4 py-2 rounded-2xl border">
                                            <p className="text-sm">Email</p>
                                            <p className="text-white font-medium">
                                                {user.email}
                                            </p>
                                        </div>

                                        <div className="px-4 py-2 rounded-2xl border">
                                            <p className="text-sm">Phone</p>
                                            <p className="text-white font-medium">
                                                {user.phone || 'Not provided'}
                                            </p>
                                        </div>

                                        <div className="border rounded-2xl text-center p-3 flex-1">
                                            <h3 className="md:text-2xl">
                                                Total Score
                                            </h3>
                                            <motion.p className="md:text-2xl">
                                                {pointResult}
                                            </motion.p>
                                        </div>

                                        <div className="border rounded-2xl text-center p-3 flex-1">
                                            <h3 className="md:text-2xl">
                                                Quiz Taken
                                            </h3>
                                            <motion.p className="md:text-2xl">
                                                {quizResult}
                                            </motion.p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardTitle>
                        <CardAction className="w-full md:w-auto mt-4 md:mt-0">
                            <div className="flex justify-between w-full gap-3">
                                <Button variant="outline" size="sm">
                                    Change Role
                                </Button>
                                {isDesktop ? (
                                    <DesktopEditProfile
                                        open={open}
                                        setOpen={setOpen}
                                        user={user}
                                    />
                                ) : (
                                    <MobileEditProfile
                                        open={open}
                                        setOpen={setOpen}
                                        user={user}
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
                            <HistoryCard historyData={quizHistory} />
                        </div>
                    </CardContent>

                    <CardFooter></CardFooter>
                </Card>

                <Footer />
            </div>
        </>
    );
};

export default Profile;
