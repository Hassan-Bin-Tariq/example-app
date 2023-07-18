<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\NewsArticle4;
use App\Models\GuardianArticle;
use App\Models\NytimesArticle;
class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->getContent(); // Get the request body as a string

        $newsArticles = NewsArticle4::where('title', 'LIKE', '%' . $query . '%')->get();
        $guardianArticles = GuardianArticle::where('sectionName', 'LIKE', '%' . $query . '%')->get();
        $nytimesArticles = NytimesArticle::where('abstract', 'LIKE', '%' . $query . '%')->get();

        return response()->json([
            'newsArticles' => $newsArticles,
            'guardianArticles' => $guardianArticles,
            'nytimesArticles' => $nytimesArticles
        ]);
    }
}
