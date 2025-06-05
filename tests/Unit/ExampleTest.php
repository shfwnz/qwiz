<?php

namespace Tests\Unit;

<<<<<<< HEAD
use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_that_true_is_true(): void
=======
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_that_true_is_true()
>>>>>>> tuanbeliau-main
    {
        $this->assertTrue(true);
    }
}
