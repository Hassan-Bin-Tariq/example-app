<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use jcobhams\NewsApi\NewsApi;
use App\Models\NewsArticle4;
use App\Models\GuardianArticle;
use App\Models\NytimesArticle;
class FetchNewsArticles extends Command
{
    protected $signature = 'news:fetch';

    protected $description = 'Fetch news articles and store them in the database';

    public function handle()
    {
        $api_key = '862cf55bbcb44423b87f01ed706a9186';
        $keywords = ['Sports', 'Politics', 'Games', 'Valorant', 'Technology', 'Computer Science', 'Photography', 'Health', 'Travel', 'Books', 'Yoga'];

        foreach ($keywords as $q) {

            //NEW API DATA GATHER
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
                    if ($exception->getCode() === '23000') {
                        continue;
                    } else {
                        throw $exception;
                    }
                }
            }


            //GUARDIAN API DATA GATHER
            $url = "https://content.guardianapis.com/search?q=" . urlencode($q) . "&api-key=21b5e4ab-7295-4da2-a0f4-785470416212";

            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec($curl);
            curl_close($curl);

            if ($response !== false) {
                $result = json_decode($response, true);

                // Loop through the results and insert each article into the table
                // Loop through the results and insert each article into the table
                foreach ($result['response']['results'] as $articleData) {
                    try {
                        $guardianArticle = [
                            'api_url' => $articleData['apiUrl'],
                            'sectionId' => $articleData['sectionId'],
                            'sectionName' => $articleData['sectionName'],
                            'type' => $articleData['type'],
                            'webPublicationDate' => $articleData['webPublicationDate'],
                            'web_title' => $articleData['webTitle'],
                            'web_url' => $articleData['webUrl'],
                        ];

                        if (isset($articleData['pillarName'])) {
                            $guardianArticle['pillarName'] = $articleData['pillarName'];
                        }

                        GuardianArticle::create($guardianArticle);
                    } catch (\Illuminate\Database\QueryException $exception) {
                        if ($exception->getCode() === '23000') {
                            continue;
                        } else {
                            throw $exception;
                        }
                    }
                }

                // return response()->json($result);
            } else {
                echo 'Request failed';

                // return response()->json(['error' => 'Request failed'], 500);
            }

            //NEW YORK TIMES NEWS DATA GATHER

            $url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=". urlencode($q) . "&api-key=xSPDwViGyrhvm4PVq3FjZEiSM609isY9";

            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec($curl);
            curl_close($curl);
        
            if ($response !== false) {
                $result = json_decode($response, true);
        
                // Check if 'docs' key exists in the response
                if (isset($result['response']['docs'])) {
                    $articles = $result['response']['docs'];
        
                    // Loop through the articles and insert each one into the table
                    foreach ($articles as $articleData) {
        
                        $abstract = $articleData['abstract'];
        
                        // Check if an article with the same abstract already exists
                        $existingArticle = NytimesArticle::where('abstract', $abstract)->exists();
        
                        if ($existingArticle) {
                            continue; // Skip inserting this article
                        }
        
                        $abstract = $articleData['abstract'];
                        $webUrl = $articleData['web_url'];
                        $snippet = $articleData['snippet'];
                        $leadParagraph = $articleData['lead_paragraph'];
                        $printSection = isset($articleData['print_section']) ? $articleData['print_section'] : '';
                        $source = $articleData['source'];
                        $publishDate = isset($articleData['pub_date']) ? $articleData['pub_date'] : '';
                        $author = isset($articleData['byline']['original']) ? $articleData['byline']['original'] : '';
        
                        NytimesArticle::create([
                            'abstract' => $abstract,
                            'web_url' => $webUrl,
                            'snippet' => $snippet,
                            'lead_paragraph' => $leadParagraph,
                            'print_section' => $printSection,
                            'source' => $source,
                            'Publish_date' => $publishDate,
                            'Author' => $author,
                            // Add other fields as needed
                        ]);
                    }
                }
        
                // return response()->json($result);
            } else {
                echo 'Request failed';
        
                // return response()->json(['error' => 'Request failed'], 500);
            }


        }

        $this->info('News articles fetched and stored successfully!');
    }
}
