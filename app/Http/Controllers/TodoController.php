<?php

namespace App\Http\Controllers;

use App\Todo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;


class TodoController extends Controller{

//    public function index(){
//
//        $todos  = Todo::all();
//
//        return response()->json($todos);
//
//    }

    public function getTodo($id){

        $todo  = Todo::find($id);

        return response()->json($todo);
    }

    public function saveTodo(Request $request){

        $todo = Todo::create($request->all());
        return response()->json($todo);

    }

    public function deleteTodo(Request $request){
        $todo_id = $request->input('id');
        DB::table('todos')->where('id', $todo_id)->delete();

        return response()->json('success');
    }

    public function updateTodo(Request $request){

        $id = $request->input('id');
        $todo = $request->input('todo');
        $repeat = $request->input('repeat_duration');

//        $todo = DB::table('todos')->where('id', $id)->get();

        DB::update('update todos set todo = ? where id = ?', [$todo, $id]);
        DB::update('update todos set repeat_duration = ? where id = ?', [$repeat, $id]);
        return response()->json($todo);
    }

    public function getTodos(Request $request){
        $user_id = $request->input('id');
        $todos = DB::table('todos')->where('user_id', $user_id)->get();
        return response()->json($todos);
    }

}
