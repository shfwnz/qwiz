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
        Schema::create('quiz_sessions', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('quiz_id')
                ->constrained('quizzes')
                ->onDelete('cascade');
            $table->string('session_code', 6)->unique();
            $table
                ->enum('status', [
                    'waiting',
                    'in_progress',
                    'completed',
                    'cancelled',
                ])
                ->default('waiting');
            $table->timestamp('scheduled_start_at')->nullable();
            $table->timestamp('actual_start_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->integer('max_participants')->nullable();
            $table->json('settings')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_sessions');
    }
};
