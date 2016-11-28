<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'firstName' => 'brad',
            'lastName' => 'Tracy',
            'email' => 'bradkt@coolbeans.com',
            'password' => Hash::make('1234'),
        ]);
         $this->call('UsersTableSeeder');
    }
}
