<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use DB;
use Exception;
use Illuminate\Http\Request;
use stdClass;

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
            ->orderBy('j.no')
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

    public function rate(Request $request, $id) {
        $userId = 1001;

        $ratingValue = $request->input('rating');

        $rating = DB::table('ratings')
            ->where('user_id', $userId)
            ->where('joke_id', $id)
            ->first();

        try {
            DB::beginTransaction();

            if(isset($rating)) {
                DB::table('ratings')
                    ->where('user_id', $userId)
                    ->where('joke_id', $id)
                    ->update([
                        'rating' => $ratingValue,
                        'rating_z' => 0,
                        'updated_at' => Carbon::now()
                    ]);
            } else {
                DB::table('ratings')
                    ->insert([
                        'user_id' => $userId,
                        'joke_id' => $id,
                        'rating' => $ratingValue,
                        'rating_z' => 0,
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ]);
            }

            // TODO: update user mean and variance

            // TODO: update user zscores

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response(json_encode(new stdClass()));
    }

}