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
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('teacher_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->string('slug')->unique();
            $table->string('title');
            $table->string('description');
            $table->integer('time_limit_minutes')->nullable();
            $table->integer('max_attempts')->default(1);
            $table->integer('max_participants')->default(40);
            $table
                ->enum('visibility', ['public', 'private'])
                ->default('private');
            $table->string('category')->nullable();
            $table->string('access_code', 6)->nullable();
            $table->boolean('require_code')->default(false);
            $table->datetime('start_time')->nullable();
            $table->datetime('end_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
