<?php

namespace App\Http\Controllers;

use DB;

class JokeController extends Controller
{

    public function index() {
        $userId = 1001;

        $jokes = DB::table('jokes as j')
            ->leftJoinWhere('users as u', 'u.id', '=', $userId)
            ->leftJoin('ratings as r', function ($join) {
                $join->on('r.joke_id', '=', 'j.id')
                    ->on('r.user_id', '=', 'u.id');
            })
            ->select([
                'j.id',
                'j.no',
                DB::raw('substring(j.content, 1, 100) as content'),
                'r.rating'
            ])
            ->get();

        for($i = 0; $i < count($jokes); $i++) {
            $content = $jokes[$i]->content;
            $jokes[$i]->content = strip_tags($content);
        }

        return response(compact('jokes'));
    }

    public function show($id) {
        $userId = 1001;

        $joke = DB::table('jokes as j')
            ->leftJoinWhere('users as u', 'u.id', '=', $userId)
            ->leftJoin('ratings as r', function ($join) {
                $join->on('r.joke_id', '=', 'j.id')
                    ->on('r.user_id', '=', 'u.id');
            })
            ->where('j.id', $id)
            ->select([
                'j.id',
                'j.no',
                'j.content',
                'r.rating'
            ])
            ->first();

        return response(compact('joke'));
    }

}