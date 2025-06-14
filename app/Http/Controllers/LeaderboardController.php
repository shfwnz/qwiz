<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index()
    {
        return Inertia::render('leaderboard', [
            'auth' => [
                'user' => Auth::user(),
                'check' => Auth::check(),
            ],

            'topPlayers' => $this->getTopPlayers(),
            'allPlayers' => $this->getAllPlayers(),
        ]);
    }

    private function getTopPlayers()
    {
        return [
            [
                'rank' => 1,
                'name' => 'John Doe',
                'score' => 100,
                'winrate' => '90%',
            ],
            [
                'rank' => 2,
                'name' => 'Jane Doe',
                'score' => 90,
                'winrate' => '80%',
            ],
            [
                'rank' => 3,
                'name' => 'Jim Doe',
                'score' => 80,
                'winrate' => '70%',
            ],
        ];
    }

    private function getAllPlayers()
    {
        return [
            ['rank' => 4, 'name' => 'Alice', 'score' => 75, 'winrate' => '60%'],
            ['rank' => 5, 'name' => 'Bob', 'score' => 65, 'winrate' => '50%'],
        ];
    }
}
