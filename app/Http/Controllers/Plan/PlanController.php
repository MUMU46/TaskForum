<?php
namespace App\Http\Controllers\Plan;

use App\Models\Plan;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Carbon\Carbon;
class PlanController extends Controller{

    public function add(Request $request): RedirectResponse
    {
        $userId = Auth::id();
        $validatedData = $request->validate([
            'name' => 'required|string|max:20',
            'content' => 'required|string|max:400',
            'if_open' => 'required|boolean',
            'cycle' => 'required|string',
            'if_checkin' =>'boolean',
            'check_counts' => 'integer',

        ]);

        $validatedData['if_checkin'] = $request->input('if_checkin', false);
        $validatedData['created_at'] =  Carbon::now('Asia/Shanghai')->format('Y-m-d H:i:s');
        $validatedData['user_id'] = $userId;
        $plan = Plan::create($validatedData);//创建plan
        //计算下一次打卡时间
        $createdAt = $plan->created_at;
        $planStartDate = strtotime($createdAt);
        $cycle = $plan->cycle;
        $nextCheckinDate = date('Y-m-d', strtotime("+$cycle day", $planStartDate));
        $plan -> next_check_time = $nextCheckinDate;
        $plan -> left_time =  strtotime(date('Y-m-d', strtotime("+$cycle day", $planStartDate)))-  $planStartDate;
        $plan->save();//更新

        return redirect()->route('mine.show');
    }


    public function checkState()
    {
        $userId = Auth::id();
        $plans = Plan::where('user_id', $userId)->get();

        foreach ($plans as $plan)
        {
            $last_check_time = strtotime($plan->next_check_time);
            $today = strtotime(Carbon::now('Asia/Shanghai')->format('Y-m-d H:i:s'));//获取当前时间
            if ($today >= $last_check_time) {
                // 用户需要进行打卡操作
                $plan->update(['if_checkin' => false]);

                // 计算下一次打卡的日期
                $cycle = $plan->cycle;
                $nextCheckinDate =date('Y-m-d',strtotime("+$cycle day", $last_check_time));
                //dd( $nextCheckinDate );
                $plan -> next_check_time = $nextCheckinDate;
                $plan->update(['left_time' =>strtotime($nextCheckinDate) - $today]);
            }
            else{
                $timeDifferenceInSeconds = $last_check_time - $today;
                $plan->update(['left_time' => $timeDifferenceInSeconds ]);
            }
        }
//        // 获取最新的数据并返回给前端
//        $updatedPlans = Plan::where('user_id', $userId)->get();

        return redirect()->route('mine.show');
    }

    public function checkin(Request $request):RedirectResponse
    {
        $request->validate([
            'plan_id' => 'required|integer',
        ]);

        $plan = Plan::findOrFail($request->input('plan_id'));
        $counts = $plan->check_counts;
        $plan->check_counts=$counts+1;
        $plan->if_checkin = true;
        $plan->save();

        return redirect()->route('mine.show');
    }

//    public function update(Request $request): RedirectResponse
//    {
//        // dd($request->toArray());
//        $request->validate([
//            'task_id' => 'required|integer',
//            'name' => 'required|string|max:20',
//            'done' => 'required|boolean',
//            // 其他字段的验证规则...
//        ]);
//        //查找
//        $plan = Plan::findOrFail($request->input('task_id'));
//
//        // 更新任务属性
//        $task->name = $request->input('name');
//        $task->done = $request->input('done');
//
//        // 保存到数据库
//        $task->save();
//        return redirect()->route('plan.show');
//    }

    public function delete(Plan $planId):RedirectResponse{//taskId: 路由参数绑定
        // 删除任务
        $planId->delete();//根据id删除
        //重定向
        return redirect()->route('mine.show')->with('message', 'Task deleted successfully');
    }
}
