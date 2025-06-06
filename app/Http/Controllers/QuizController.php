<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;
use Carbon\Carbon;

class QuizController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $filter = $request->input('filter');

        $quizzes = Quiz::with('guru')
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

        return $quizzes->map(function ($quiz) {
            return [
                'id' => $quiz->id,
                'nama' => $quiz->nama,
                'status' => $quiz->status,
                'maks' => $quiz->maks,
                'guru' => $quiz->guru ? $quiz->guru->nama : 'Unknown',
                'updated_at' => Carbon::parse($quiz->updated_at)->format('d F Y'),
            ];
        });
    }
}
