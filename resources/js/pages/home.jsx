import React from 'react';
import Footer from '@/components/layouts/footer.jsx';
import ParticlesBackground from '@/components/particle-background';

const home = () => {
    return (
        <div className="container mx-auto max-w-7xl py-8 space-y-16">
            <ParticlesBackground />
            <div className=" bg-transparent">
                Welcome
                <Footer />
            </div>
        </div>
    );
};

export default home;
