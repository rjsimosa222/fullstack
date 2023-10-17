<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

       
        $user = User::  where('email', $request->email)
                    ->where('password', $request->password)
                    ->first();
                    
        if($user) {
            $token = JWTAuth::fromUser($user);
            return response()->json([
                'user' => $user,
                'token' => $token,
                'redirect_url' => 'task',
                'message' => 'Login exitoso',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Credenciales inválidas o usuario no existe'
            ], 401);
        }    
    }
}
