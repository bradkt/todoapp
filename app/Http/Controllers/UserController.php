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
//use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Hash;
use DB;


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

        $this->validate($request, [
            'email'  => 'required|unique:users',
            'password' => 'required',
            'name'  => 'required',
        ]);

        $user = User::create($request->all());

        return response()->json($user);

    }

    public function deleteUser($id){
        $user  = User::find($id);

        $user->delete();

        return response()->json('success');
    }

    public function updateUser(Request $request){
        $email = $request->input('email');
        $password = $request->input('password');
        $hashedPassword = Hash::make($password);
        DB::update('update users set password = ? where email = ?', [$hashedPassword, $email]);

        return 'Password Update Successful';
    }

    public function loginUserByEmail(Request $request){
        $email = $request->input('email');
        $password = $request->input('password');
        $user = DB::table('users')->where('email', $email)->first();

        if (Hash::check($password, $user->password)) {
            return [$user->id, $user->name];
        } else {
            return 'guest';
        }

    }




}