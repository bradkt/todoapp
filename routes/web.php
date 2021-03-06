<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

//$app->get('/', function () use ($app) {
//    return $app->version();
//});


$app->get('/', function ()  {
    return view('index');
});


$app->post('user/login', 'UserController@loginUserByEmail');

//$app->post('api/image', 'UserController@saveImage');

$app->post('api/post/image/multi', 'FileEntryController@saveFile');
$app->get('api/get/image', 'FileEntryController@getFile');
$app->get('api/public/image', 'FileEntryController@viewImage');
$app->get('view/{filename}', 'FileEntryController@viewFile');
//$app->get('delete/{filename}', 'FileEntryController@deleteFile');

//$app->get('api/image', 'UserController@getImage');

$app->get('api/users', 'UserController@index');

$app->get('api/user/{id}','UserController@getUser');

$app->post('api/user','UserController@saveUser');

$app->get('api/user/edit','UserController@updateUser');

$app->delete('api/user/{id}','UserController@deleteUser');

//api for todos

//$app->get('api/todos', 'TodoController@index');

$app->get('api/todos','TodoController@getTodos');

$app->post('api/todo','TodoController@saveTodo');

$app->post('api/todo/edit','TodoController@updateTodo');

$app->post('api/todo/complete','TodoController@completeTodo');

$app->get('api/todo/delete','TodoController@deleteTodo');

//mock cron job by hitting endpoint

$app->get('api/todo/cron','TodoController@resetCompleted');

// api for notes

$app->get('api/notes/all', 'NoteController@index');

$app->get('api/note/one','NoteController@getNote');

$app->post('api/note','NoteController@saveNote');

$app->put('api/note/{id}','NoteController@updateNote');

$app->delete('api/note/{id}','NoteController@deleteNote');