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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id(); 
            $table->string('nombre'); 
            $table->string('email')->unique();
            $table->string('telefono', 10); 
            $table->string('numero');
            $table->string('calle');
            $table->string('colonia'); 
            $table->string('ciudad'); 
            $table->string('codigo_postal', 5); 
            $table->string('estado'); 
            $table->string('domicilio'); 
            $table->decimal('latitud', 12, 10);
            $table->decimal('longitud', 13, 10);
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
