<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('profile', [
            'auth' => [
                'user' => Auth::user(),
                'check' => Auth::check(),
            ],
        ]);
    }
}
