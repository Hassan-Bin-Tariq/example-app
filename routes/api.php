<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use jcobhams\NewsApi\NewsApi;
use App\Models\NewsArticle4;
use App\Models\GuardianArticle;
use Carbon\Carbon;
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
    $q = 'Sports'; // Your search query

    $newsapi = new NewsApi($api_key);
    $all_articles = $newsapi->getEverything($q);

    $articles = $all_articles->articles;


    foreach ($articles as $article) {
        try {
            NewsArticle4::create([
                'title' => $article->title,
                'author' => $article->author,
                'content' => $article->content,
                'published_at' => Carbon::parse($article->publishedAt)->toDateTimeString(),
                'url' => $article->url,
                'urlToImage' => $article->urlToImage,
                'description' => $article->description,
                'source' => $article->source->name,
            ]);
        } catch (\Illuminate\Database\QueryException $exception) {
            // Handle duplicate entry error
            if ($exception->getCode() === '23000') {
                // Duplicate entry, skip or update existing record
                continue;
            } else {
                // Other database-related error, handle accordingly
                throw $exception;
            }
        }
    
    }

    return response()->json($all_articles);
});
Route::get('/Guardian', function () {
    $q = 'games';
    $url = "https://content.guardianapis.com/search?q=" . urlencode($q) . "&api-key=21b5e4ab-7295-4da2-a0f4-785470416212";

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);

    if ($response !== false) {
        $result = json_decode($response, true);

        // Loop through the results and insert each article into the table
        foreach ($result['response']['results'] as $articleData) {
            GuardianArticle::create([
                'api_url' => $articleData['apiUrl'],
                'pillarName' => $articleData['pillarName'],
                'sectionId' => $articleData['sectionId'],
                'sectionName' => $articleData['sectionName'],
                'type' => $articleData['type'],
                'webPublicationDate' => $articleData['webPublicationDate'],
                'web_title' => $articleData['webTitle'],
                'web_url' => $articleData['webUrl'],
            ]);
        }

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
