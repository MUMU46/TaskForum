<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MineController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Task\TaskController;
use App\Http\Controllers\Plan\PlanController;
use App\Http\Controllers\Ground\GroundController;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard',  [GroundController::class, 'show'])->middleware(['auth', 'verified'])->name('dashboard');

//Route::get('/mine', function () {
//    return Inertia::render('Mine/Mine');
//})->middleware(['auth', 'verified'])->name('mine');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/mine',[MineController::class, 'show'])->name('mine.show');
    Route::post('/task',[TaskController::class, 'add'])->name('task.add');
    Route::patch('/task',[TaskController::class, 'update'])->name('task.update');
    Route::delete('/task/{taskId}',[TaskController::class, 'delete'])->name('task.delete');
    Route::post('/plan',[PlanController::class, 'add'])->name('plan.add');
    Route::delete('/plan/{planId}',[PlanController::class, 'delete'])->name('plan.delete');
    Route::put('/plan',[PlanController::class, 'checkState'])->name('plan.check_state');
    Route::patch('/plan',[PlanController::class, 'checkin'])->name('plan.checkin');
});

require __DIR__.'/auth.php';
