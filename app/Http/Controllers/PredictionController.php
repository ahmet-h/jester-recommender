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

    }

}