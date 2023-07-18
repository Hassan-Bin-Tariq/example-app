<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewsArticle4;
use App\Models\GuardianArticle;
use App\Models\NytimesArticle;
class getPreferedArticles extends Controller
{
    public function prefered(Request $request)
    {
        $data = $request->all();
        $keywords = $data;
            $newsArticles = NewsArticle4::where(function ($query) use ($keywords) {
                foreach ($keywords as $keyword) {
                    $query->orWhere('title', 'LIKE', '%' . $keyword . '%');
                }
            })->get();

            // Query the GuardianArticle table for matching section names
            $guardianArticles = GuardianArticle::where(function ($query) use ($keywords) {
                foreach ($keywords as $keyword) {
                    $query->orWhere('sectionName', 'LIKE', '%' . $keyword . '%');
                }
            })->get();

            // Query the NytimesArticle table for matching abstracts
            $nytimesArticles = NytimesArticle::where(function ($query) use ($keywords) {
                foreach ($keywords as $keyword) {
                    $query->orWhere('abstract', 'LIKE', '%' . $keyword . '%');
                }
            })->get();


        return response()->json([
            'newsArticles' => $newsArticles,
            'guardianArticles' => $guardianArticles,
            'nytimesArticles' => $nytimesArticles
        ]);
    }
}
