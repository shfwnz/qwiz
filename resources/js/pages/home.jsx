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
            duration: 2,
        });

    }, []);

    return (
        <div className="container mx-auto max-w-7xl py-8 space-y-5">
            <ParticlesBackground />
            <h1 className="text-[50px]">Hello, Thomas Alva Edison</h1>

            <div className="grid grid-cols-2 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] border-[4px] border-gray-500 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-lg p-8 justify-items-center font-pixel text-white">
                <div className="flex items-center space-x-4">
                    <img src={point} alt="point" className="h-12 w-12" />
                    <div>
                        <h1 className="text-[20px] text-gray-300">
                            Your Current Score
                        </h1>
                        <motion.h1 className="text-[36px] text-yellow-400">
                            {pointResult}
                        </motion.h1>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <img src={heart} alt="heart" className="h-12 w-12" />
                    <div>
                        <h1 className="text-[20px] text-gray-300">
                            Your Current Health
                        </h1>
                        <h1 className="text-[36px] text-red-500">2/5</h1>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default home;
