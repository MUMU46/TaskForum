import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import "../../css/Dashboard.css"
export default function Dashboard({ auth , all_plans}) {

    function AddtoMine(name, content ,cycle){
        router.post(route('plan.add'),{
            name: name,
            content:content,
            if_open:false,
            cycle:cycle,
            if_checkin: false,
            check_counts: 0,
        },{
            onFinish:visit=>{
                console.log('success add!')
            }
        });
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ground</h2>}
        >
            <Head title="ground" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="post-list">
                                {all_plans.map((item)=>{
                                    if(item.if_open)
                                        return (
                                            <div className="post-item" key={item.id}>
                                                <div className="post_top">
                                                    <div className="username">{item.user.name}</div>
                                                    <div className="created_at">{item.created_at}</div>
                                                </div>
                                                <div className="post_title">{item.name}</div>
                                                <div className="post_content">
                                                    {item.content}
                                                </div>
                                                <div className="add_tomine" onClick={()=>AddtoMine(item.name,item.content, item.cycle)}>添加到我的计划</div>
                                                <div className="post-cycle">打卡周期:{item.cycle}天</div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
