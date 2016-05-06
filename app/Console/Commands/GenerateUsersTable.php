<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Hash;
use Illuminate\Console\Command;
use Faker;
use DB;

class GenerateUsersTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:users';

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
            DB::table('users')->truncate();

            $faker = Faker\Factory::create();

            $users = [];
            $password = 'secret';
            for($i = 1; $i <= 1000; $i++) {
                $users[] = [
                    'email' => $faker->unique()->email,
                    'password' => $password,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ];
            }

            $password = Hash::make('secret');
            $users[] = [
                'email' => 'ahmeth@anadolu.edu.tr',
                'password' => $password,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ];

            DB::table('users')->insert($users);
        });

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
