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
            $table->string('description');
            $table->integer('price');
            $table->enum('duration', ['monthly', 'yearly']);

            // features
            $table->integer('max_quizzes')->nullable();
            $table->integer('max_hearts')->nullable();
            $table->integer('max_participants')->nullable();
            $table->boolean('unlimited_hearts')->default(false);
            $table->boolean('can_export_results')->default(false);
            $table->boolean('can_import_quizzes')->default(false);

            $table->boolean('is_active')->default(false);
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
