<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('books', BookController::class);

// Open Library proxy for frontend (avoids CORS issues)
Route::get('/openlibrary/subjects/{subject}', function (string $subject) {
    $limit = request()->query('limit', 24);
    $url = "https://openlibrary.org/subjects/{$subject}.json?limit={$limit}";
    $response = \Illuminate\Support\Facades\Http::get($url);
    return response()->json($response->json());
});

Route::get('/openlibrary/search', function () {
    $q = request()->query('q', 'classic books');
    $limit = request()->query('limit', 24);
    $url = "https://openlibrary.org/search.json?q=" . urlencode($q) . "&limit={$limit}&fields=key,title,author_name,cover_i,subject,ia";
    $response = \Illuminate\Support\Facades\Http::get($url);
    return response()->json($response->json());
});
