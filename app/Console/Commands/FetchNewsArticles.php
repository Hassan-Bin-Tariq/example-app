<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use jcobhams\NewsApi\NewsApi;
use App\Models\NewsArticle4;
use App\Models\GuardianArticle;
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
        }

        $this->info('News articles fetched and stored successfully!');
    }
}
