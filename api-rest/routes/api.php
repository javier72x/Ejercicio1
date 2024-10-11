<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::controller(ContactController::class)->group(function () {
    Route::get('/contacts', 'index');
    Route::post('/contacts', 'store');
    Route::get('/contacts/{id}', 'show');
    Route::put('/contacts/{id}', 'update');
    Route::delete('/contacts/{id}', 'destroy');
    
});

Route::get('/download', [ContactController::class, 'downloadContacts']);