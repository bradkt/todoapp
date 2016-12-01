<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Laravel\Lumen\Console\Kernel as ConsoleKernel;
use DB;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function()
        {
            DB::update('update todos set complete = ? where repeat_duration = ?', [0,7]);

        })->mondays();

        $schedule->call(function()
        {
            DB::update('update todos set complete = ? where repeat_duration = ?', [0,30]);

        })->monthly();

        $schedule->call(function()
        {
            DB::update('update todos set complete = ? where repeat_duration = ?', [0,90]);

        })->quarterly();
    }


}
