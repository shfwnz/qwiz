import React from 'react';
import TopPlayerCard from '@/components/top-player-card';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Footer from '@/components/layouts/footer.jsx';

const topPlayers = [
    { rank: 1, name: 'John Doe', score: 100, winrate: '90%' },
    { rank: 2, name: 'Jane Doe', score: 90, winrate: '80%' },
    { rank: 3, name: 'Jim Doe', score: 80, winrate: '70%' },
];

const allPlayers = [
    { rank: 4, name: 'Alice', score: 75, winrate: '60%' },
    { rank: 5, name: 'Bob', score: 65, winrate: '50%' },
    { rank: 6, name: 'Charlie', score: 55, winrate: '40%' },
];

const leaderboard = () => {
    return (
        <div className="container mx-auto max-w-4/5 py-8">
            <div className="flex flex-col items-center justify-center border rounded-3xl p-8 gap-8 ">
                <div className="flex gap-4 w-full">
                    {topPlayers.map(player => (
                        <TopPlayerCard key={player.rank} player={player} />
                    ))}
                </div>
                <Card className="border rounded-2xl w-full p-8">
                    <CardContent>
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
                    </CardContent>
                </Card>
                <Footer />
            </div>
        </div>
    );
};

export default leaderboard;
