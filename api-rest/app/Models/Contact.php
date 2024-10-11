<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $table = 'contacts';

    protected $fillable = [
        'nombre',
        'email',
        'telefono',
        'numero',
        'calle',
        'colonia',
        'ciudad',
        'codigo_postal',
        'estado',
        'domicilio',
        'latitud',
        'longitud'
    ];

}
