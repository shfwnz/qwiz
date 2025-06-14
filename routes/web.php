<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
use Inertia\Inertia;

Route::get('/login', [Controllers\AuthController::class, 'showLogin'])->name(
    'login',
);
Route::post('/login', [Controllers\AuthController::class, 'login'])->name(
    'login',
);

Route::get('/register', [
    Controllers\AuthController::class,
    'showRegister',
])->name('register');
Route::post('/register', [Controllers\AuthController::class, 'register'])->name(
    'register',
);

Route::get('/', fn() => Inertia::render('home'));

// Pages Quiz

Route::get('/quiz', [Controllers\QuizController::class, 'index'])->name(
    'quiz.list',
);
Route::match(['get', 'post'], '/quiz/{slug}', [
    Controllers\QuizController::class,
    'show',
])->name('quiz.show');
Route::get('/quiz/start/{id}', [Controllers\QuizController::class, 'start']);

Route::get('/leaderboard', [
    Controllers\LeaderboardController::class,
    'index',
])->name('leaderboard');
Route::get('/premium', fn() => Inertia::render('premium'));
Route::get('/dashboard', fn() => Inertia::render('dashboard'))->name(
    'dashboard',
);
Route::get('/profile', fn() => Inertia::render('profile'))->name('profile');
