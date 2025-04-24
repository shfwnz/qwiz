<?php

use Illuminate\Support\Facades\Route;

Route::get('/welcome', function () {
    return view('welcome');
});
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');