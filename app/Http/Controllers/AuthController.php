<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    public function __construct()
    {

    }
    public function postLogin(Request $request)
    {
        echo $request->user();

            if (!$request) {
                return response()->json([$request], 404);
            }

    }
}