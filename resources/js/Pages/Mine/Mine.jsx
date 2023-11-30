import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head } from '@inertiajs/react';
import Task from "../../Components/Mine/Task.jsx"
import Plan from "../../Components/Mine/Plan.jsx"
import { router } from '@inertiajs/react'
import "../../../css/mine.css"
export default function Dashboard({ auth , tasks, plans}) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mine</h2>}
        >
            <Head title="Mine" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/*task-list*/}
                            <Task tasks={tasks}/>
                            {/*plan-list*/}
                            <Plan plans={plans}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
