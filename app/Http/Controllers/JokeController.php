<?php

namespace App\Http\Controllers;

use App\Support\OnlineStat;
use Carbon\Carbon;
use DB;
use Exception;
use Illuminate\Http\Request;
use stdClass;

class JokeController extends Controller
{

    public function index() {
        $userId = 501;

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
        $userId = 501;

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
        $userId = 501;

        $ratingValue = $request->input('rating');

        $rating = DB::table('ratings')
            ->where('user_id', $userId)
            ->where('joke_id', $id)
            ->first();

        try {
            DB::beginTransaction();

            $user = DB::table('users')
                ->where('id', $userId)
                ->select([
                    'num_ratings',
                    'avg_rating',
                    'sum_of_diff_squares'
                ])
                ->first();

            $stat = new OnlineStat($user->num_ratings, $user->avg_rating, $user->sum_of_diff_squares);

            if(isset($rating)) {
                DB::table('ratings')
                    ->where('user_id', $userId)
                    ->where('joke_id', $id)
                    ->update([
                        'rating' => $ratingValue,
                        'rating_z' => 0,
                        'updated_at' => Carbon::now()
                    ]);

                $stat->pop($rating->rating);
                $stat->push($ratingValue);
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

                $stat->push($ratingValue);
            }

            // update user mean and variance
            DB::table('users')
                ->where('id', $userId)
                ->update([
                    'num_ratings' => $stat->getN(),
                    'avg_rating' => $stat->getMean(),
                    'sum_of_diff_squares' => $stat->getM2()
                ]);

            // update user zscores
            $userRatings = DB::table('ratings')
                ->where('user_id', $userId)
                ->select([
                    'joke_id',
                    'rating'
                ])
                ->get();

            $userMean = $stat->getMean();
            $userStdev = $stat->getStdDeviation();
            foreach ($userRatings as $r) {
                $zScore = $userStdev == 0 ? 0 : (($r->rating - $userMean) / $userStdev);
                DB::table('ratings')
                    ->where('user_id', $userId)
                    ->where('joke_id', $r->joke_id)
                    ->update([
                        'rating_z' => $zScore,
                        'updated_at' => Carbon::now()
                    ]);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return response(json_encode(['error' => $e]), 500);
        }

        return response(json_encode(new stdClass()));
    }

}