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
            $table
                ->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table
                ->foreignId('subscription_plan_id')
                ->constrained('subscription_plans')
                ->onDelete('cascade');
            $table
                ->enum('payment_status', [
                    'pending',
                    'cancel',
                    'expire',
                    'failure',
                ])
                ->default('pending');
            $table->integer('amount')->default(1);
            $table->string('order_id')->unique();
            $table->string('snap_token')->nullable();
            $table->string('payment_type')->nullable();
            $table->dateTime('paid_at');
            $table->dateTime('expired_at');
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
