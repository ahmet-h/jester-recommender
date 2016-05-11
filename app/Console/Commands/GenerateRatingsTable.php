<?php

namespace App\Console\Commands;

use App\Support\OnlineStat;
use Carbon\Carbon;
use DB;
use Illuminate\Console\Command;
use PHPExcel_IOFactory;

class GenerateRatingsTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:ratings';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $filePath = storage_path('app/jester-data-1.xls');

        $fileType = PHPExcel_IOFactory::identify($filePath);
        $reader = PHPExcel_IOFactory::createReader($fileType);
        $this->info('Loading file...');
        $phpExcel = $reader->load($filePath);

        $sheet = $phpExcel->getSheet(0);
        $highestRow = $sheet->getHighestDataRow();
        $highestColumn = $sheet->getHighestDataColumn();

        $ratingData = [];
        $userData = [];
        $this->info('Reading data...');
        for ($row = 1; $row <= $highestRow; $row++) {
            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row,
                null,
                true,
                false)[0];

            $stat = new OnlineStat();
            $columnCount = count($rowData);
            for ($col = 0; $col < $columnCount; $col++) {
                $cell = $rowData[$col];
                if($col == 0) {
                    continue;
                }

                if($cell != 99) {
                    $ratingData[] = [
                        'user_id' => $row,
                        'joke_id' => $col,
                        'rating' => $cell,
                        'rating_z' => 0,
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ];

                    $stat->push($cell);
                }
            }

            $userData[] = [
                'num_ratings' => $stat->getN(),
                'avg_rating' => $stat->getMean(),
                'sum_of_diff_squares' => $stat->getM2(),
                'stdev' => $stat->getStdDeviation()
            ];
        }

        $this->info('Saving into database...');

        $total = count($ratingData);
        $count = ceil(floatval($total) / 1000);

        for ($i = 0; $i < $total; $i++) {
            $r = $ratingData[$i];
            $u = $userData[$r['user_id'] - 1];

            $zScore = ($r['rating'] - $u['avg_rating']) / $u['stdev'];

            $ratingData[$i]['rating_z'] = $zScore;
        }

        DB::transaction(function() use ($userData, $ratingData, $count) {
            DB::table('ratings')->truncate();

            for ($i = 0; $i < $count; $i++) {
                $tempData = array_slice($ratingData, $i * 1000, 1000);

                DB::table('ratings')->insert($tempData);
            }

            for ($i = 0; $i < count($userData); $i++) {
                unset($userData[$i]['stdev']);
                
                DB::table('users')
                    ->where('id', $i + 1)
                    ->update($userData[$i]);
            }
        });

        $this->info('Saved into database.');

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
