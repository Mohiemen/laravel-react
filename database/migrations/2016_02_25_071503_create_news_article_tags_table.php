<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewsArticleTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news_article_tags', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('article_id')->unsigned();
            $table->integer('tag_id')->unsigned();
            $table->unique(['article_id', 'tag_id']);
            $table->timestamps();

            // Foreign Keys
            $table->foreign('article_id')->references('id')->on('news_articles')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('news_article_tags')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('news_article_tags');
    }
}
