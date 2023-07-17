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
        Schema::create('nytimes_articles', function (Blueprint $table) {
            $table->id();
            $table->text('abstract')->nullable()->unique();
            $table->string('web_url')->nullable();
            $table->text('snippet')->nullable();
            $table->text('lead_paragraph')->nullable();
            $table->string('print_section')->nullable();
            $table->string('source')->nullable();
            $table->string('Publish_date')->nullable();
            $table->string('Author')->nullable();
            // Add other columns as needed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nytimes_articles');
    }
};
