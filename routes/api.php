<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use jcobhams\NewsApi\NewsApi;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/OpenNews', function(){

    $api_key = '862cf55bbcb44423b87f01ed706a9186';
    $q = 'Bicoin'; // Your search query


    $newsapi = new NewsApi($api_key);

    # /v2/everything
    $all_articles = $newsapi->getEverything($q);

    return response()->json($all_articles);
});
Route::get('/Guardian', function () {
    $url = 'https://content.guardianapis.com/sections?api-key=21b5e4ab-7295-4da2-a0f4-785470416212';

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);

    if ($response !== false) {
        $result = json_decode($response, true);

        return response()->json($result);
    } else {
        echo 'Request failed';

        return response()->json(['error' => 'Request failed'], 500);
    }
});

Route::get('/NYtimes', function () {
    $url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=cricket&api-key=xSPDwViGyrhvm4PVq3FjZEiSM609isY9';

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);

    if ($response !== false) {
        $result = json_decode($response, true);

        return response()->json($result);
    } else {
        echo 'Request failed';

        return response()->json(['error' => 'Request failed'], 500);
    }
});
