<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{

    protected $fillable = ['note', 'last_update', 'todo_id'];

}