<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{

    protected $fillable = ['original_filename', 'filename', 'user_id', 'mime'];

}