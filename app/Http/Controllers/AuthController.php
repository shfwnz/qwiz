<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('login');
    }

    public function showRegister()
    {
        return Inertia::render('register');
    }

    public function login(Request $request) {}

    public function register(Request $request)
    {
        // Your register logic here
    }

    public function logout()
    {
        // Your logout logic here
    }

    public function profile()
    {
        // Your profile logic here
    }
}
