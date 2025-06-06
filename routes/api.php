<?php

use App\Models\quiz;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::match(['get', 'post'], '/quizzes', function (Request $req) {
    $search = $req->query('search');
    $filter = $req->input('filter');

    // logger($filter);

    $quizzies = quiz::with('guru')
        ->when($search, function ($query) use ($search) {
            $query->where('nama', 'LIKE', "%{$search}%")
                ->orWhereHas('guru', function ($q) use ($search) {
                    $q->where('nama', 'LIKE', "%{$search}%");
                });
        })
        ->when($filter, function ($query) use ($filter) {
            foreach ($filter as $range) {
                $query->orWhereBetween('maks', $range);
            }
        })
        ->get();

    return $quizzies->map(function ($quiz) {
        return [
            'id' => $quiz->id,
            'nama' => $quiz->nama,
            'status' => $quiz->status,
            'maks' => $quiz->maks,
            'guru' => $quiz->guru ? $quiz->guru->nama : 'Unknown',
            'updated_at' => Carbon::parse($quiz->updated_at)->format('d F Y'),
        ];
    });
});
