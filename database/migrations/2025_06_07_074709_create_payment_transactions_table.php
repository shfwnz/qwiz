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
        Schema::create('payment_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table
                ->foreignId('subscription_plan_id')
                ->constrained()
                ->onDelete('cascade');

            $table->integer('price');
            $table
                ->enum('payment_status', [
                    'pending',
                    'settlement',
                    'cancel',
                    'expire',
                    'failure',
                ])
                ->default('pending');
            $table->string('order_id')->unique();
            $table->string('snap_token')->nullable();
            $table->string('payment_type')->nullable();

            $table->json('midtrans_response')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_transactions');
    }
};
