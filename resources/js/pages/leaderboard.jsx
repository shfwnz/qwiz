import React from 'react';
import TopPlayerCard from '@/components/top-player-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import ParticlesBackground from '@/components/particle-background';
import Footer from '@/components/layouts/footer.jsx';
import { Head, router } from '@inertiajs/react';

const topPlayers = [
    { rank: 1, name: 'John Doe', score: 100, winrate: '90%' },
    { rank: 2, name: 'Jane Doe', score: 90, winrate: '80%' },
    { rank: 3, name: 'Jim Doe', score: 80, winrate: '70%' },
];

const allPlayers = [
    { rank: 4, name: 'Alice', score: 75, winrate: '60%' },
    { rank: 5, name: 'Bob', score: 65, winrate: '50%' },
    { rank: 6, name: 'Charlie', score: 55, winrate: '40%' },
    { rank: 7, name: 'David', score: 50, winrate: '30%' },
    { rank: 8, name: 'Eve', score: 45, winrate: '20%' },
    { rank: 9, name: 'Frank', score: 40, winrate: '10%' },
    { rank: 10, name: 'Grace', score: 35, winrate: '5%' },
    { rank: 11, name: 'Hannah', score: 30, winrate: '2%' },
];

const UnderConstructionOverlay = () => {
    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="96"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-400 mb-4 animate-bounce"
            >
                <path d="M14 9a2 2 0 0 1-2-2 2 2 0 0 1-2 2 2 2 0 0 1 2 2 2 2 0 0 1 2-2z" />
                <path d="M18 13a2 2 0 0 1-2-2 2 2 0 0 1-2 2 2 2 0 0 1 2 2 2 2 0 0 1 2-2z" />
                <path d="M6 13a2 2 0 0 1-2-2 2 2 0 0 1-2 2 2 2 0 0 1 2 2 2 2 0 0 1 2-2z" />
                <path d="M10 5a2 2 0 0 1-2-2 2 2 0 0 1-2 2 2 2 0 0 1 2 2 2 2 0 0 1 2-2z" />
                <path d="M21 12a9 9 0 1 1-9-9" />
            </svg>
            <div className="flex flex-col gap-4">
                <h1 className="font-bold text-4xl md:text-5xl uppercase mb-3">
                    Under Construction
                </h1>
                <p className="text-lg text-slate-300">
                    Im sorry, the Leaderboard page is currently under
                    construction.
                </p>
                <Button
                    variant="ghost"
                    onClick={() => router.visit('/')}
                    className="mt-3 text-3xl p-12"
                >
                    Back
                </Button>
            </div>
        </div>
    );
};

const leaderboard = () => {
    return (
        <>
            <UnderConstructionOverlay />
            <Head title="Global Leaderboard" />
            <div className="container mx-auto max-w-7xl py-8 space-y-16">
                <ParticlesBackground />

                <div className="w-full flex items-center justify-center">
                    <h1 className="font-bold text-4xl uppercase">
                        Global Leaderboard
                    </h1>
                </div>
                <div className="flex flex-col items-center justify-center border rounded-3xl p-8 gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full ">
                        {topPlayers.map(player => (
                            <TopPlayerCard key={player.rank} player={player} />
                        ))}
                    </div>
                    <Card className="border rounded-2xl w-full p-6">
                        <CardContent>
                            <ScrollArea className="h-[240px] p-3">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="text-xl font-medium">
                                            <TableHead>Rank</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Score</TableHead>
                                            <TableHead className="text-right">
                                                Winrate
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {allPlayers.map(player => (
                                            <TableRow key={player.rank}>
                                                <TableCell className="font-medium text-xl">
                                                    {player.rank}
                                                </TableCell>
                                                <TableCell className="text-xl">
                                                    {player.name}
                                                </TableCell>
                                                <TableCell className="text-xl">
                                                    {player.score}
                                                </TableCell>
                                                <TableCell className="text-right text-xl">
                                                    {player.winrate}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default leaderboard;
