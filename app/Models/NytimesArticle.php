<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NytimesArticle extends Model
{
    use HasFactory;
    protected $table = 'nytimes_articles'; // Set the table name
    protected $fillable = ['abstract', 'web_url', 'snippet', 'lead_paragraph', 'print_section','source','Publish_date','Author']; // Define the fillable fields

}
