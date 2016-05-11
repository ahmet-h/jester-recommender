<?php

namespace App\Support;

use DB;

class Prediction
{

    private $neighborCount = 50;

    private $activeUser;
    private $activeUserId;
    private $activeUserMean;
    private $activeUserStdev;

    private $similarities;
    private $neighbors;

    public function __construct($activeUserId)
    {
        $this->activeUserId = $activeUserId;

        $auStat = DB::table('users')
            ->where('id', $activeUserId)
            ->select([
                'num_ratings',
                'avg_rating',
                'sum_of_diff_squares'
            ])
            ->first();

        $stats = new OnlineStat($auStat->num_ratings, $auStat->avg_rating, $auStat->sum_of_diff_squares);
        $this->activeUserMean = $stats->getMean();
        $this->activeUserStdev = $stats->getStdDeviation();

        $this->activeUser = array_column(DB::table('ratings')
            ->where('user_id', $activeUserId)
            ->select([
                'joke_id',
                'rating_z'
            ])
            ->get(), 'rating_z', 'joke_id');

        $this->calculateSimilarities();

        $neighborIds = array_slice(array_keys($this->similarities), 0, $this->neighborCount);

        $neighborRatings = DB::table('ratings')
            ->whereIn('user_id', $neighborIds)
            ->select([
                'user_id',
                'joke_id',
                'rating_z'
            ])
            ->get();

        $this->neighbors = [];
        foreach ($neighborRatings as $neighborRating) {
            $ui = $neighborRating->user_id;
            $ji = $neighborRating->joke_id;
            $rz = $neighborRating->rating_z;

            $this->neighbors[$ui][$ji] = $rz;
        }
    }

    public function predict($jokeId) {
        $sum1 = 0;
        $sum2 = 0;

        foreach ($this->neighbors as $id => $neighbor) {
            if(array_key_exists($jokeId, $neighbor)) {
                $sum1 += $this->similarities[$id] * $neighbor[$jokeId];
                $sum2 += $this->similarities[$id];
            }
        }

        return ($sum2 != 0) ? ($this->activeUserMean + $this->activeUserStdev * ($sum1 / $sum2)) : 0;
    }

    private function calculateSimilarities() {
        $userIds = array_column(DB::table('users')
            ->where('id', '!=', $this->activeUserId)
            ->select('id')
            ->get(), 'id');

        $totalUsers = count($userIds);
        $count = ceil(floatval($totalUsers) / 50);

        $this->similarities = [];
        for($i = 0; $i < $count; $i++) {
            $tempUserIds = array_slice($userIds, $i * 50, 50);

            $tempUserRatings = DB::table('ratings')
                ->whereIn('user_id', $tempUserIds)
                ->whereIn('joke_id', array_keys($this->activeUser))
                ->select([
                    'user_id',
                    'joke_id',
                    'rating_z'
                ])
                ->get();

            $tempUsers = [];
            foreach ($tempUserRatings as $tempRating) {
                $ui = $tempRating->user_id;
                $ji = $tempRating->joke_id;
                $rz = $tempRating->rating_z;

                $tempUsers[$ui][$ji] = $rz;
            }

            foreach ($tempUsers as $ui => $tempUser) {
                $this->similarities[$ui] = $this->getSimilarity($tempUser);
            }
        }

        arsort($this->similarities);
    }

    private function getSimilarity($otherUser) {
        $similarity = 0;

        foreach($this->activeUser as $jokeId => $rating) {
            if(array_key_exists($jokeId, $otherUser)) {
                $similarity += $rating * $otherUser[$jokeId];
            }
        }

        return $similarity;
    }

}