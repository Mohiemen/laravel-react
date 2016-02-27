<?php

use Illuminate\Database\Seeder;

use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	DB::table('users')->delete();

    	User::create([
    		'name' => 'Andrew Ewing',
    		'email' => 'drew@phenocode.com',
    		'password' => 'password'
		]);
    }
}
