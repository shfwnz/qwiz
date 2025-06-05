<?php

use Illuminate\Support\Facades\Route;

<<<<<<< HEAD
Route::get('/welcome', function () {
    return view('welcome');
});
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
=======
// Route::get('/welcome', function () {
//     return view('welcome');
// });
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
>>>>>>> tuanbeliau-main
