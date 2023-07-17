<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuardianArticle extends Model
{
    use HasFactory;
    protected $table = 'guardian_articles'; // Set the table name
    protected $fillable = ['api_url', 'pillarName', 'sectionId','sectionName', 'type', 'webPublicationDate','web_title', 'web_url']; 
}
