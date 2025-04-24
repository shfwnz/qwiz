<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\quiz;
use Carbon\Carbon;

Route::get('/quizzes', function (Request $req) {
    $search = $req->query('search');

    $quizzies = quiz::with('guru')->when($search, function ($query) use ($search) {
        $query->where('nama', 'LIKE', "%{$search}%")
              ->orWhereHas('guru', function ($q) use ($search) {
                $q->where('nama', 'LIKE', "%{$search}%");
              });
    })->get();

    return $quizzies->map(function ($quiz) {
        return [
            'id' => $quiz->id,
            'nama' => $quiz->nama,
            'status' => $quiz->status,
            'maks' => $quiz->maks,
            'guru' => $quiz->guru ? $quiz->guru->nama : "Unknown",
            'updated_at' => Carbon::parse($quiz->updated_at)->format('d F Y'),
        ];
    });
});