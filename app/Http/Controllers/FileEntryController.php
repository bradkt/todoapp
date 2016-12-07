<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Fileentry;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Response;
//use Illuminate\Support\Facades\Response as FacadeResponse;

class FileEntryController extends Controller {

    public function saveFile(Request $request) {

        $id = $request->input('id');
//        print_r($request->all());
//        $user = DB::table('users')->where('id', $id)->first();
//        $fileName = $user->name . '.jpg';
        $fileName = $id . '.jpg';

        $files = $request->all();
        $image = end($files);

        Storage::disk('public')->put($fileName, file_get_contents($image));

//        return print_r($request->input('id'));
    }

    public function viewImage(Request $request) {

        $id = $request->input('id');
        $user = DB::table('users')->where('id', $id)->first();
        $fileName = $user->name;
        $path = storage_path() . '/app/public/' . $fileName . '.jpg';

//        if(!File::exists($path)) abort(404);

        $file = File::get($path);
//        $type = File::mimeType($path);
//        $type = "image/jpeg";

//        $response = Response::make($file, 200);
//        $response->header("Content-Type", $type);

//        if (file_exists($path)) {
//            return Response::download($path);
//        }
        return $path;
    }

    public function getFile(Request $request){
        $id = $request->input('id');
        $user = DB::table('users')->where('id', $id)->first();
        $fileName = $user->name;

        $file = Storage::disk('public')->get($fileName);
        return new Response($file, 200);

    }

    public function deleteFile($name)
    {
        Storage::delete($name);
        return response()->json('success');
    }

    public function viewFile($name){

        return response()->make(Storage::get($name), 200, [
            'Content-Type' => Storage::mimeType($name),
            'Content-Disposition' => 'inline; '.$name,
        ]);

    }
}