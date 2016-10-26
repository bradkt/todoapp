<?php
/**
 * Created by PhpStorm.
 * User: brad
 * Date: 10/25/16
 * Time: 1:20 PM
 */

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class UserController extends Controller{


    public function index(){

        $users  = User::all();

        return response()->json($users);

    }

    public function getUser($id){

        $user  = User::find($id);

        return response()->json($user);
    }

    public function saveUser(Request $request){

        $user = User::create($request->all());

        return response()->json($user);

    }

    public function deleteUser($id){
        $user  = User::find($id);

        $user->delete();

        return response()->json('success');
    }

    public function updateUser(Request $request,$id){
        $user  = User::find($id);

        $user->firstName = $request->input('firstName');
        $user->lastName = $request->input('lastName');
        $user->email = $request->input('email');
        $user->lastName = $request->input('lastName');
        $user->password = $request->input('password');

        $user->save();

        return response()->json($user);
    }

}