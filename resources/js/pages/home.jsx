import React, { useEffect, useRef, useState } from 'react';
import Footer from '@/components/layouts/footer.jsx';
import ParticlesBackground from '@/components/particle-background';
import point from "../../../public/images/point.png";
import heart from "../../../public/images/heart.png";
import { motion, useMotionValue, useTransform, animate} from 'framer-motion';

const home = () => {
    const pointCounting = useMotionValue(0);
    const pointResult = useTransform(pointCounting, Math.round);

    useEffect(() => {
        const animation = animate(pointCounting, 12000, {
            duration: 2
        });

    }, []);

    return (
        <div className="container mx-auto max-w-7xl py-8 space-y-5">
            <ParticlesBackground />
            <h1 className='text-[50px]'>Hello, Thomas Alva Edison</h1>

            <div className="grid grid-cols-2 bg-white/10 backdrop-blur-sm rounded-lg p-8 justify-items-center">
                <div className='flex'>
                    <img src={point} alt="point" 
                        className='h-30 w-30'
                    />
                    <div className='h-full w-full'>        
                        <h1 className='text-[35px]'>Your Current Score</h1>   
                        <motion.h1 className='text-[50px]'>{pointResult}</motion.h1>
                    </div>
                </div>
                <div className='flex'>
                    <img src={heart} alt="heart"
                        className='h-30 w-30'
                    />
                    <div className='h-full w-full'>        
                        <h1 className='text-[35px]'>Your Current Health</h1>   
                        <h1 className='text-[50px]'>2/5</h1>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default home;
