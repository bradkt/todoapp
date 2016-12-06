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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

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

    public function saveImage(Request $request){
//        $image = $request->input('image')->encode('jpg', 80);
        $image = $request->input('image');
        $id = $request->input('id');
//        $user = DB::table('users')->where('id', $id)->first();

        DB::update('update users set image = ? where id = ?', [$image, $id]);

//        if (Hash::check($password, $user->password)) {
//            return [$user->id, $user->name];
//        } else {
            return 'Thats an image for ya';
//        }



    }

//    public function saveFile() {
//
//        $file = Request::file('file');
//        Storage::put(File::get($file));
//
//        return response()->json('success');
//    }
//
//    public function deleteFile($name) {
//        Storage::delete($name);
//        return response()->json('success');
//    }
//
//    public function getFileList() {
//
//        $files = Storage::files('/');
//        return response()->json($files);
//
//    }
//
//    public function viewFile($name){
//
//        return response()->make(Storage::get($name), 200, [
//            'Content-Type' => Storage::mimeType($name),
//            'Content-Disposition' => 'inline; '.$name,
//        ]);
//
//    }


}