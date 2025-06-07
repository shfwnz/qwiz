import React from 'react';
import TopPlayerCard from '@/components/top-player-card';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const topPlayers = [
    { rank: 1, name: 'John Doe', score: 100, winrate: '90%' },
    { rank: 2, name: 'Jane Doe', score: 90, winrate: '80%' },
    { rank: 3, name: 'Jim Doe', score: 80, winrate: '70%' },
];

const leaderboard = () => {
    return (
        <div className="container mx-auto max-w-4/5 py-8">
            <div className="h-full flex flex-col items-center justify-center border rounded-3xl p-8 gap-8">
                <div className="flex gap-4">
                    {topPlayers.map(player => (
                        <TopPlayerCard key={player.rank} player={player} />
                    ))}
                </div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead className="text-right">
                                Winrate
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                INV001
                            </TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">
                                $250.00
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default leaderboard;
