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

Route::get('/register/{role}', [
    Controllers\AuthController::class,
    'showRegister',
])->name('register.role');

Route::post('/register/{role}', [
    Controllers\AuthController::class,
    'register',
])->name('register');

Route::get('/', fn() => Inertia::render('home'));

Route::get('/quiz', [Controllers\QuizController::class, 'index'])->name(
    'quiz.list',
);

Route::middleware(['auth'])->group(function () {
    Route::match(['get', 'post'], '/quiz/{slug}', [
        Controllers\QuizController::class,
        'show',
    ])->name('quiz.show');
    Route::get('/quiz/start/{slug}', [
        Controllers\QuizController::class,
        'start',
    ])->name('quiz.start');
    Route::post('/submit/quiz', [Controllers\QuizController::class, 'submit']);

    Route::get('/quiz/waiting-room/{id}', [
        Controllers\QuizController::class,
        'waitingRoom',
    ]);

    Route::get('/leaderboard', [
        Controllers\LeaderboardController::class,
        'index',
    ])->name('leaderboard');
    Route::get('/profile', [
        Controllers\ProfileController::class,
        'index',
    ])->name('profile');
    Route::put('/profile', [
        Controllers\ProfileController::class,
        'update',
    ])->name('profile.update');
});

Route::get('/premium', fn() => Inertia::render('premium'));
Route::get('/dashboard', fn() => Inertia::render('dashboard'))->name(
    'dashboard',
);
