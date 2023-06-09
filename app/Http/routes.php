<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['prefix' => 'api'], function () {
    Route::group(['middleware' => 'auth.jwt'], function () {
        Route::get('jokes', ['uses' => 'JokeController@index']);

        Route::get('joke/{id}', ['uses' => 'JokeController@show'])->where('id', '[0-9]+');
        Route::post('joke/{id}', ['uses' => 'JokeController@rate'])->where('id', '[0-9]+');

        Route::post('predict/{id}', ['uses' => 'PredictionController@predict'])->where('id', '[0-9]+');
        Route::post('top-n', ['uses' => 'PredictionController@topN']);
    });

    Route::post('auth/create', ['uses' => 'AuthController@create']);
});

Route::get('{path}', function () {
    return view('index');
})->where('path', '.*');
