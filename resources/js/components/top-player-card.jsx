import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import CryFrog from '../../../public/images/cry-frog.png';

const TopPlayerCard = ({ player }) => {
    return (
        <Card className="w-full overflow-auto">
            <CardContent className="flex gap-4 px-4 py-2 items-center justify-center space-x-12">
                <div className="flex flex-col items-center gap-2 max-w-20 justify-between">
                    <img
                        className="border rounded-lg bg-gray-300"
                        src={CryFrog}
                        alt={`Profile of ${player.name}`}
                    />
                    <Badge variant="secondary" className="w-full">
                        #{player.rank}
                    </Badge>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">
                            #Ranking {player.rank}
                        </h1>
                        <p className="text-xl font-medium">{player.name}</p>
                    </div>
                    <div className="flex gap-4 justify-center items-center">
                        <div className="flex flex-col gap-2 items-center">
                            <span className="text-xl lowercase">Score</span>
                            <p>{player.score}</p>
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <span className="text-xl lowercase">Winrate</span>
                            <p>{player.winrate}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TopPlayerCard;
