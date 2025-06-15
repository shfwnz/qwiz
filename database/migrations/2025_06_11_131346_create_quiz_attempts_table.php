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
        Schema::create('quiz_attempts', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('quiz_id')
                ->constrained('quizzes')
                ->onDelete('cascade');
            $table
                ->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->onDelete('cascade');
            $table->timestamp('started_at');
            $table->timestamp('ended_at')->nullable();
            $table->enum('status', [
                'in_progress',
                'completed',
                'timed_out',
                'failed',
            ]);
            $table->decimal('total_score', 10, 2)->nullable();
            $table->decimal('max_score', 10, 2)->nullable();
            $table->decimal('percentage', 10, 2)->nullable();
            $table->integer('points_earned')->default(0);
            $table->integer('time_spent_minutes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_attempts');
    }
};
