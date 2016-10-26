<?php

namespace App\Http\Controllers;

use App\Note;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class NoteController extends Controller{

    public function index(){

        $notes  = Note::all();

        return response()->json($notes);

    }

    public function getNote($id){

        $note  = Note::find($id);

        return response()->json($note);
    }

    public function saveNote(Request $request){

        $note = Note::create($request->all());
        return response()->json($note);

    }

    public function deleteNote($id){
        $note  = Note::find($id);

        $note->delete();

        return response()->json('success');
    }

    public function updateNote(Request $request,$id){
        $note  = Note::find($id);

        $note->note = $request->input('note');
        $note->last_update = $request->input('last_update');

        $note->save();

        return response()->json($note);
    }

}