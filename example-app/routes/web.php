<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Book;

Route::get('/', function () {
    if (session()->has('name')) {
        return redirect('/main');
    }
    return view('landing');
});

Route::post('/enter', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255'
    ]);
    session(['name' => $request->name]);
    return redirect('/main');
});

Route::get('/main', function () {
    if (!session()->has('name')) {
        return redirect('/');
    }
    $books = Book::all();
    return view('main', compact('books'));
});

Route::get('/logout', function () {
    session()->forget('name');
    return redirect('/');
});
