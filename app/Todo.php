<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{

    protected $fillable = ['todo', 'last_update', 'repeat_duration', 'complete', 'user_id'];

}