<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|max:255',
            'password' => 'required|string|min:6',
        ]);

        if (Auth::guard()->attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();
            return Response::json([
                'ok' => true,
                'message' => 'Login successful',
                'user' => Auth::user(),
            ]);
        }

        return Response::json([
            'ok' => false,
            'message' => 'Invalid Credentials',
        ], 403);
    }

    public function logout(Request $request)
    {
        Auth::guard()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return Response::json([], 204);
    }
}
