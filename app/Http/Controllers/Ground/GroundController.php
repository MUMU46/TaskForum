<?php
namespace App\Http\Controllers\Ground;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Inertia\Inertia;
use Inertia\Response;

class GroundController extends Controller{
    public function show(): Response
    {
        $allUsersPlans = Plan::with('user')->get();
        return Inertia::render('Dashboard', [
            'all_plans' =>  $allUsersPlans
        ]);
    }
}
