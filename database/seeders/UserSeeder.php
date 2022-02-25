<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::updateOrCreate([
            'email' => 'mark123jesper@yahoo.com',
        ],[
//            'role_id' => 1,
            'first_name' => 'Mark Jesper',
            'middle_name' => 'Garcia',
            'last_name' => 'Pillerva',
            'email_verified_at' => null,
            'password' => bcrypt('123456jesper'), // password
            'remember_token' => null,
        ]);
    }
}
