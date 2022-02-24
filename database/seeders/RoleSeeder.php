<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::firstOrCreate([
            'id' => 1
        ] , [
            'name' => 'Administrator',
        ]);

        Role::firstOrCreate([
            'id' => 2
        ] , [
            'name' => 'Moderator',
        ]);

        Role::firstOrCreate([
            'id' => 3
        ] , [
            'name' => 'User',
        ]);
    }
}
