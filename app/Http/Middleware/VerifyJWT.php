<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\JWT;

class VerifyJWT
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $authorization = $request->header('authorization');
        list($jwt) = sscanf($authorization, 'Bearer %s');

        try {
            $payload = JWT::decode($jwt, 'secret', ['HS256']);

            $request->attributes->add(['user' => $payload]);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage()], 403);
        }

        return $next($request);
    }
}
