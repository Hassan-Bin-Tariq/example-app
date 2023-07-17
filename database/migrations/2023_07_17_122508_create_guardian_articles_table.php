<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('guardian_articles', function (Blueprint $table) {
            $table->id();
            $table->string('api_url')->nullable()->unique();
            $table->string('pillarName')->nullable();
            $table->string('sectionId')->nullable();
            $table->string('sectionName')->nullable();
            $table->string('type')->nullable();
            $table->string('webPublicationDate')->nullable();
            $table->string('web_title')->nullable();
            $table->string('web_url')->nullable();  
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guardian_articles');
    }
};
