import React, { useEffect, useRef, useState } from 'react';
import Footer from '@/components/layouts/footer.jsx';
import ParticlesBackground from '@/components/particle-background';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, animate } from 'framer-motion';
import { Head, router } from '@inertiajs/react';

// Custom SVG Icons
const Trophy = ({ className }) => (
    <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className}
    >
        <path
            d="M15 2H9v2H7v6h2V4h6V2zm0 8H9v2h6v-2zm0-6h2v6h-2V4zM4 16h2v-2h12v2H6v4h12v-4h2v6H4v-6z"
            fill="currentColor"
        />
    </svg>
);

const Play = ({ className }) => (
    <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className}
    >
        <path
            d="M18 2h-6v2h-2v6h2V4h6V2zm0 8h-6v2h6v-2zm0-6h2v6h-2V4zM7 16h2v-2h12v2H9v4h12v-4h2v6H7v-6zM3 8h2v2h2v2H5v2H3v-2H1v-2h2V8z"
            fill="currentColor"
        />
    </svg>
);

const Book = ({ className }) => (
    <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className}
    >
        <path
            d="M16 3H6v2H2v10h6V5h8v10h6V5h-4V3h-2zm4 4v6h-2V7h2zM6 13H4V7h2v6zm12 2H6v2h12v-2zm-7 2h2v2h3v2H8v-2h3v-2z"
            fill="currentColor"
        />
    </svg>
);

const User = ({ className }) => (
    <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className}
    >
        <path
            d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2v2z"
            fill="currentColor"
        />
    </svg>
);

const Star = ({ className }) => (
    <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className}
    >
        <path
            d="M13 0h-2v4h2V0ZM0 11v2h4v-2H0Zm24 0v2h-4v-2h4ZM13 24h-2v-4h2v4ZM8 6h8v2H8V6ZM6 8h2v8H6V8Zm2 10v-2h8v2H8Zm10-2h-2V8h2v8Zm2-14h2v2h-2V2Zm0 2v2h-2V4h2Zm2 18h-2v-2h2v2Zm-2-2h-2v-2h2v2ZM4 2H2v2h2v2h2V4H4V2ZM2 22h2v-2h2v-2H4v2H2v2Z"
            fill="currentColor"
        />
    </svg>
);

const UserPlus = ({ className }) => (
    <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className}
    >
        <path
            d="M8 2h12v20H4V2h4zm4 8h-2v2H8V4H6v16h12V4h-4v8h-2v-2z"
            fill="currentColor"
        />
    </svg>
);

const home = () => {
    const toLeaderboard = () => {
        router.visit('/leaderboard');
    };

    const toQuiz = () => {
        router.visit('/quiz');
    };

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalQuizzes: 0,
        totalPlayers: 0,
    });

    useEffect(() => {
        const animateStats = async () => {
            const userAnimation = animate(0, 15420, {
                duration: 2.5,
                onUpdate: value => {
                    setStats(prev => ({
                        ...prev,
                        totalUsers: Math.round(value),
                    }));
                },
            });

            const quizAnimation = animate(0, 892, {
                duration: 2,
                onUpdate: value => {
                    setStats(prev => ({
                        ...prev,
                        totalQuizzes: Math.round(value),
                    }));
                },
            });

            const playerAnimation = animate(0, 3247, {
                duration: 2.2,
                onUpdate: value => {
                    setStats(prev => ({
                        ...prev,
                        totalPlayers: Math.round(value),
                    }));
                },
            });

            return () => {
                userAnimation.stop();
                quizAnimation.stop();
                playerAnimation.stop();
            };
        };

        animateStats();
    }, []);

    const features = [
        {
            icon: Book,
            title: 'Interactive Quizzes',
            description:
                'Challenge yourself with engaging quizzes across various topics and difficulty levels.',
        },
        {
            icon: Trophy,
            title: 'Leaderboards',
            description:
                'Compete with players worldwide and climb to the top of our global rankings.',
        },
        {
            icon: User,
            title: 'Community',
            description:
                'Join thousands of learners in our vibrant community of knowledge seekers.',
        },
        {
            icon: Star,
            title: 'Achievements',
            description:
                'Unlock rewards and badges as you progress through your learning journey.',
        },
    ];

    return (
        <div className="container mx-auto max-w-7xl py-10">
            <ParticlesBackground />

            {/* Hero Section */}
            <div className="container mx-auto max-w-7xl py-16 px-4">
                <div className="text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                            Welcome to Qwiz
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                            Test your knowledge, compete with friends, and climb
                            the leaderboards in the ultimate quiz experience.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Button
                            size="lg"
                            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            onClick={toQuiz}
                        >
                            <Play className="w-5 h-5 mr-2" />
                            Start Playing
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="text-lg px-8 py-6"
                            onClick={() => {
                                window.open(
                                    'https://github.com/szuryuu/qwiz',
                                    '_blank'
                                );
                            }}
                        >
                            <UserPlus className="w-5 h-5 mr-2" />
                            Join Community
                        </Button>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-20"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-blue-500/20 shadow-lg">
                            <CardContent className="p-6 text-center">
                                <User className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    {stats.totalUsers}+
                                </h3>
                                <p className="text-gray-300">Active Users</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-purple-500/20 shadow-lg">
                            <CardContent className="p-6 text-center">
                                <Book className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    {stats.totalQuizzes}+
                                </h3>
                                <p className="text-gray-300">
                                    Quizzes Available
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-cyan-500/20 shadow-lg">
                            <CardContent className="p-6 text-center">
                                <Trophy className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    {stats.totalPlayers}+
                                </h3>
                                <p className="text-gray-300">Games Played</p>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-20 space-y-8"
                >
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-4">
                            Why Choose Qwiz?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Discover what makes our platform the perfect place
                            for learning and competition.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.8 + index * 0.1,
                                }}
                            >
                                <Card className="h-full bg-gradient-to-b from-gray-900/50 to-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                                    <CardContent className="p-6 text-center space-y-4">
                                        <feature.icon className="w-12 h-12 mx-auto text-blue-400" />
                                        <h3 className="text-xl font-semibold text-white">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-20 text-center"
                >
                    <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/30">
                        <CardContent className="p-12">
                            <h2 className="text-3xl font-bold mb-4">
                                Ready to Test Your Knowledge?
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Join thousands of players already enjoying our
                                quizzes. Start your journey today!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    onClick={toQuiz}
                                >
                                    Get Started Now
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-lg px-8 py-6"
                                    onClick={toLeaderboard}
                                >
                                    View Leaderboard
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default home;
