<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use App\Model\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Illuminate\Http\Request;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(!$request->header('Authorization')) {
            return response()->json([
                'error' => 'Se requiere el token'
            ],400);
        }
        $array_token = explode(' ', $request->header('Authorization'));
        $token = $array_token[1];
 
        try {
            $credentials = JWT::decode($token, new Key(env('JWT_SECRET'),'HS256'));

        } catch(ExpiredException $e) {
            return response()->json([
                'error' => 'El token expiro'
            ],400);
        } catch(Exception $e) {
            return response()->json([
                'error' => 'Error al decodear el token'
            ],400);
        }

        $user = User::find($credentials->sub);
        $request->auth = $user;
        return $next($request);
    }
}
