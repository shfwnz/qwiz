<?php

use App\Models\quiz;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;

Route::match(['get', 'post'], '/quizzes', [QuizController::class, 'index']);