<?php

namespace App\Http\Controllers;

use App\Todo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class TodoController extends Controller{

    public function index(){

        $todos  = Todo::all();

        return response()->json($todos);

    }

    public function getTodo($id){

        $todo  = Todo::find($id);

        return response()->json($todo);
    }

//    public function getUserTodos($id){
//
//
//        $results = Todo::select("SELECT * FROM users");
//
//        return response()->json($todo);
//    }

    public function saveTodo(Request $request){

        $todo = Todo::create($request->all());
        return response()->json($todo);

    }

    public function deleteTodo($id){
        $todo  = Todo::find($id);

        $todo->delete();

        return response()->json('success');
    }

    public function updateTodo(Request $request,$id){
        $todo  = Todo::find($id);

        $todo->todo = $request->input('todo');
        $todo->last_update = $request->input('last_update');
        $todo->repeat_duration = $request->input('repeat_duration');
        $todo->complete = $request->input('complete');
        $todo->user = $request->input('complete');

        $todo->save();

        return response()->json($todo);
    }

}
