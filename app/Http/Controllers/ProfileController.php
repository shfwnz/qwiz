<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('profile', [
            'user' => $user,
        ]);
    }
}
