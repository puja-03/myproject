<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PhonebookController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('phonebooks', PhonebookController::class);
    // Route::get('/phonebooks', [PhonebookController::class, 'index'])->name('phonebooks.index');
    // Route::post('/phonebooks', [PhonebookController::class, 'store'])->name('phonebooks.store');
    // Route::get('/phonebooks/create', [PhonebookController::class, 'create'])->name('phonebooks.create');
    // Route::delete('/phonebooks/{phonebook}', [PhonebookController::class, 'destroy'])->name('phonebooks.destroy');
    // Route::get('/phonebooks/{phonebook}/edit', [PhonebookController::class, 'edit'])->name('phonebooks.edit');
});




require __DIR__.'/auth.php';
