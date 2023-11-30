<?php
namespace App\Http\Controllers\Task;

use App\Models\Task;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;


class TaskController extends Controller{

    public function add(Request $request): RedirectResponse
    {
        $userId = Auth::id();
        $validatedData = $request->validate([
            'name' => 'required|string|max:20',
            'done' => 'required|boolean',
        ]);

        $validatedData['user_id'] = $userId;

        Task::create($validatedData);

        return redirect()->route('mine.show');
    }

    public function update(Request $request): RedirectResponse
    {
       // dd($request->toArray());
        $request->validate([
            'task_id' => 'required|integer',
            'name' => 'required|string|max:20',
            'done' => 'required|boolean',
            // 其他字段的验证规则...
        ]);
        //查找
        $task = Task::findOrFail($request->input('task_id'));

        // 更新任务属性
        $task->name = $request->input('name');
        $task->done = $request->input('done');

        // 保存到数据库
        $task->save();
        return redirect()->route('mine.show');
    }

    public function delete(Task $taskId):RedirectResponse{//taskId: 路由参数绑定
        // 删除任务
        $taskId->delete();//根据id删除
        //重定向
        return redirect()->route('mine.show')->with('message', 'Task deleted successfully');
    }
}
