<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
use Inertia\Inertia;

Route::get('/login', fn() => Inertia::render('login'));
Route::get('/register', fn() => Inertia::render('register'));

Route::get('/', fn() => Inertia::render('home'));

// Pages Quiz

Route::get('/quiz', [Controllers\QuizController::class, 'index']);
Route::get('/quiz/{id}', [Controllers\QuizController::class, 'show']);
Route::get('/quiz/start/{id}', [Controllers\QuizController::class, 'start']);

Route::get('/leaderboard', fn() => Inertia::render('leaderboard'));
Route::get('/premium', fn() => Inertia::render('premium'));
Route::get('/dashboard', fn() => Inertia::render('dashboard'));
