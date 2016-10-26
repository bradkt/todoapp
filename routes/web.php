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

$app->get('/', function () use ($app) {
    return $app->version();
});

//api for articles

$app->get('api/articles', 'ArticleController@index');

$app->get('api/article/{id}','ArticleController@getArticle');

$app->post('api/article','ArticleController@saveArticle');

$app->put('api/article/{id}','ArticleController@updateArticle');

$app->delete('api/article/{id}','ArticleController@deleteArticle');

//api for todos

$app->get('api/todos', 'TodoController@index');

$app->get('api/todo/{id}','TodoController@getTodo');

$app->post('api/todo','TodoController@saveTodo');

$app->put('api/todo/{id}','TodoController@updateTodo');

$app->delete('api/todo/{id}','TodoController@deleteTodo');

// api for users

$app->get('api/users', 'UserController@index');

$app->get('api/user/{id}','UserController@getUser');

$app->post('api/user','UserController@saveUser');

$app->put('api/user/{id}','UserController@updateUser');

$app->delete('api/user/{id}','UserController@deleteUser');

// api for notes

$app->get('api/notes', 'NoteController@index');

$app->get('api/note/{id}','NoteController@getNote');

$app->post('api/note','NoteController@saveNote');

$app->put('api/note/{id}','NoteController@updateNote');

$app->delete('api/note/{id}','NoteController@deleteNote');