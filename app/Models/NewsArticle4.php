<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsArticle4 extends Model
{protected $table = 'news_articles4';
    use HasFactory;
    protected $fillable = [
        'title','author','content', 'published_at','url','urlToImage','description', 'source'
    ];
}
