<?php

namespace App\Http\Controllers;

use DB;
use Firebase\JWT\JWT;
use Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function create(Request $request) {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = DB::table('users')
            ->where('email', $email)
            ->select([
                'id',
                'email',
                'password',
                'num_ratings'
            ])
            ->first();

        if(isset($user)) {
            if(Hash::check($password, $user->password)) {
                unset($user->password);
                
                $jwt = JWT::encode($user, 'secret');

                return response(['token' => $jwt, 'user' => $user]);
            } else {
                return response(['message' => 'Wrong password.'], 403);
            }
        } else {
            return response(['message' => 'User not found.'], 403);
        }

    }

}