<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('home'));

// Pages Quiz

Route::get('/quiz', [Controllers\QuizController::class, 'index']);
Route::get('/quiz/{id}', [Controllers\QuizController::class, 'show']);

Route::get('/leaderboard', fn() => Inertia::render('leaderboard'));
Route::get('/premium', fn() => Inertia::render('premium'));
Route::get('/dashboard', fn() => Inertia::render('dashboard'));
