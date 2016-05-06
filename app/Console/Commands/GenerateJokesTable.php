<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use DB;
use Illuminate\Console\Command;
use Storage;

class GenerateJokesTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:jokes';

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

        DB::transaction(function() {
            DB::table('jokes')->truncate();

            $jokes = [];
            $files = Storage::files('jokes');
            $no = 1;
            foreach($files as $file) {
                $content = Storage::get($file);
                $content = explode('<!--begin of joke -->', $content)[1];
                $content = explode('<!--end of joke -->', $content)[0];

                $jokes[] = [
                    'no' => $no++,
                    'content' => $content,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ];
            }

            DB::table('jokes')->insert($jokes);
        });

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
