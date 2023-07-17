<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use jcobhams\NewsApi\NewsApi;
use App\Models\NewsArticle4;

class FetchNewsArticles extends Command
{
    protected $signature = 'news:fetch';

    protected $description = 'Fetch news articles and store them in the database';

    public function handle()
    {
        $api_key = '862cf55bbcb44423b87f01ed706a9186';
        $q = 'Sports';

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

        $this->info('News articles fetched and stored successfully!');
    }
}
