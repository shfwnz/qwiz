import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const HistoryCard = ({ historyData = [] }) => {
    const displayData = historyData.length > 0 ? historyData : [];

    const getScoreColor = (score, maxScore) => {
        const percentage = (score / maxScore) * 100;
        if (percentage >= 80) return 'bg-green-500';
        if (percentage >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {displayData.map(item => (
                <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card className="p-4 bg-white/5 border border-gray-600 hover:border-gray-400 transition-colors">
                        <div className="space-y-3">
                            {/* Title */}
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-white break-words flex-1">
                                    {item.title}
                                </h3>
                                <Badge
                                    className={`ml-2 text-white ${getScoreColor(item.score, item.maxScore)}`}
                                >
                                    {item.score}/{item.maxScore}
                                </Badge>
                            </div>

                            {/* Teacher */}
                            <div>
                                <Badge variant="secondary" className="text-sm">
                                    {item.teacher || 'Unknown Teacher'}
                                </Badge>
                            </div>

                            {/* Category & Date */}
                            <div className="flex justify-between items-center">
                                <Badge variant="outline" className="text-xs">
                                    {item.category || 'General'}
                                </Badge>
                                <span className="text-xs text-gray-400">
                                    {item.completedAt}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getScoreColor(item.score, item.maxScore)}`}
                                    style={{
                                        width: `${(item.score / item.maxScore) * 100}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

export default HistoryCard;
