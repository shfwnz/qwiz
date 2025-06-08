<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subscription_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->integer('price');
            $table->enum('duration', ['monthly', 'yearly']);

            $table->integer('max_quizzes')->nullable();
            $table->integer('max_hearts')->nullable();
            $table->boolean('unlimited_hearts')->default(false);
            $table->boolean('can_export_results')->default(false);
            $table->boolean('can_import_quizzes')->default(false);

            $table->boolean('is_active')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscription_plans');
    }
};
