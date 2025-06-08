<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('home'));
Route::get('/quiz', fn () => Inertia::render('quiz'));
Route::get('/leaderboard', fn () => Inertia::render('leaderboard'));
Route::get('/premium', fn () => Inertia::render('premium'));
Route::get('/dashboard', fn () => Inertia::render('dashboard'));
