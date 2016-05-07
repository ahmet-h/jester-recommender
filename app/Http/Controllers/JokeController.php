<?php

namespace App\Http\Controllers;

use DB;

class JokeController extends Controller
{

    public function index() {
        $userId = 1001;

        $jokes = DB::table('jokes as j')
            ->leftJoin('ratings as r', 'r.joke_id', '=', 'j.id')
            ->leftJoinWhere('users as u', 'u.id', '=', $userId)
            ->select([
                'j.id',
                'j.no',
                DB::raw('substring(j.content, 1, 64) as content'),
                'r.rating'
            ])
            ->get();

        for($i = 0; $i < count($jokes); $i++) {
            $content = $jokes[$i]->content;
            $jokes[$i]->content = strip_tags($content) . '...';
        }

        return response(compact('jokes'));
    }

}