<?php

namespace App\Support;

use Exception;

class OnlineStat
{

    private $n, $mean, $M2;

    public function __construct($n = 0, $mean = 0, $M2 = 0)
    {
        $this->n = $n;
        $this->mean = $mean;
        $this->M2 = $M2;
    }

    public function push($x) {
        $this->n++;
        $delta = $x - $this->mean;
        $this->mean += $delta / $this->n;
        $this->M2 += $delta * ($x - $this->mean);
    }

    public function pop($x) {
        if($this->n == 0) {
            throw new Exception();
        } else if($this->n == 1) {
            $this->n = 0;
            $this->mean = 0;
            $this->M2 = 0;
        } else {
            $meanOld = ($this->n * $this->mean - $x) / ($this->n - 1);
            $this->M2 -= ($x - $this->mean) * ($x - $meanOld);
            $this->mean = $meanOld;
            $this->n--;
        }
    }

    public function getN()
    {
        return $this->n;
    }

    public function getMean()
    {
        return $this->mean;
    }

    public function getM2()
    {
        return $this->M2;
    }

    public function getVariance() {
        return $this->n > 1 ? ($this->M2 / ($this->n - 1)) : 0;
    }

    public function getStdDeviation() {
        return sqrt($this->getVariance());
    }

}