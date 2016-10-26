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
            'name' => 'brad tracy',
            'email' => 'bkt@gmail.com',
            'password' => '12345'
        ]);
         $this->call('UsersTableSeeder');
    }
}
