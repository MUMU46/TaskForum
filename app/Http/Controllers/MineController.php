<?php
namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MineController extends Controller
{
    public function show(): Response
    {
        // 获取最新的任务数据
        $userId = Auth::id();
        $tasks = Task::where('user_id', $userId)->get();
        $plans = Plan::where('user_id', $userId)->get();
        // 返回 Inertia 视图，并传递任务数据
        return Inertia::render('Mine/Mine', [
            'tasks' => $tasks,
            'plans' => $plans
        ]);
    }

}
