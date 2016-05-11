<?php

namespace App\Http\Controllers;

use App\Support\Prediction;
use DB;
use Illuminate\Http\Request;

class PredictionController extends Controller
{

    public function predict(Request $request, $jokeId) {
        $userId = $request->get('user')->id;

        $numRatings = DB::table('users')
            ->where('id', $userId)
            ->select([
                'num_ratings'
            ])
            ->first()->num_ratings;

        if($numRatings < 10) {
            return response(['message' => 'You need to have at least 10 jokes rated to get a prediction.'], 400);
        }

        $prediction = new Prediction($userId);

        return response(['prediction' => $prediction->predict($jokeId)]);
    }

    public function topN(Request $request) {
        $userId = $request->get('user')->id;

        $numRatings = DB::table('users')
            ->where('id', $userId)
            ->select([
                'num_ratings'
            ])
            ->first()->num_ratings;

        if($numRatings < 10) {
            return response(['message' => 'You need to have at least 10 jokes rated to get a prediction.'], 400);
        }

        $prediction = new Prediction($userId);

        $topN = $prediction->topN();

        $sortedIds = array_keys($topN);
        $sortedIdsList = implode(',', $sortedIds);

        $jokes = DB::table('jokes')
            ->whereIn('id', $sortedIds)
            ->select([
                'id',
                'no',
                DB::raw('substring(content, 1, 120) as content'),
            ])
            ->orderBy(DB::raw("field(id, $sortedIdsList)"))
            ->get();

        for($i = 0; $i < count($jokes); $i++) {
            $content = $jokes[$i]->content;
            $jokes[$i]->content = strip_tags($content);
        }

        return response(compact('jokes'));
    }

}