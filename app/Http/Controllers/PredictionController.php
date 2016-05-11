<?php

namespace App\Http\Controllers;

use App\Support\Prediction;
use DB;

class PredictionController extends Controller
{

    public function predict($jokeId) {
        $userId = 501;

        $prediction = new Prediction($userId);

        return ['prediction' => $prediction->predict($jokeId)];
    }

    public function topN() {
        $userId = 501;

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