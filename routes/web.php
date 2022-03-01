<?php

use Illuminate\Support\Facades\Route;

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

<<<<<<< HEAD
//Route::get('/{path?}', function () {
//
//});

=======
>>>>>>> 87c4e159610d488bdf1d6ce5dbbb0568ab971956
Route::get('{all}', function () {
    return view('welcome');
})->where(['all' => '.*']);
