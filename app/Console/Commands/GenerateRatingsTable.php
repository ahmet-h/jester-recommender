<?php

namespace App\Console\Commands;

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
                NULL,
                TRUE,
                FALSE)[0];

            $columnCount = count($rowData);
            for ($col = 0; $col < $columnCount; $col++) {
                $cell = $rowData[$col];
                if($col == 0) {
                    $userData[] = $cell;
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
                }
            }
        }

        $this->info('Saving into database...');

        $total = count($ratingData);
        $count = ceil(floatval($total) / 1000);

        DB::transaction(function() use ($userData, $ratingData, $count) {
            DB::table('ratings')->truncate();

            for ($i = 0; $i < $count; $i++) {
                $tempData = array_slice($ratingData, $i * 1000, 1000);

                DB::table('ratings')->insert($tempData);
            }

            for ($i = 0; $i < count($userData); $i++) {
                DB::table('users')
                    ->where('id', $i + 1)
                    ->update([
                        'num_ratings' => $userData[$i]
                    ]);
            }
        });
        
        // TODO: calculate user averages and zscores

        $this->info('Saved into database.');

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
