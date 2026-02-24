<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Phonebook extends Model
{
    protected $table = 'phonebooks';

    protected $fillable = [
        'id', 
        'name',
        'phone_number',
        'photo',
    ];
}
