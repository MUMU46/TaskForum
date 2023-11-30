import { router } from '@inertiajs/react'
import {useState} from "react";

export default function task_list ({tasks}){
    const sortedTasks = tasks.slice().sort((a, b) => b.id - a.id);//倒序排列显示
    const [todos,setTodos] = useState(sortedTasks);
    const [value,setValue] = useState('')
    const [editing,setEditing] = useState(false)
    const [editId,setEditId] = useState(0)
    const [done,setDone] = useState(false)
    const [checkId,setCheckId] = useState(0)
    const [filter,setFilter] = useState('all')


    function addTodo(todoObj){
        //发请求
        const postData = {
            'name':value,
            'done':false
        }
        console.log(postData)
        router.post(route('task.add'),{
            name:value,
            done:false
        });
        //router.get(route('task.show'));//更新
    }
    function handleInput(e){
        console.log(e.target.value)
        setValue(e.target.value)
    }

    function handleEnter(event){
        if (event.key === 'Enter') {
            console.log(value)
            const todoObj = {name:value,done:false,flag:true,edit:false}
            addTodo(todoObj)
            event.target.value=''
        }
    }
    function handleCheck(e,id,name){
        // console.log(e.target.checked);
        //console.log(id)
        setCheckId(id);
        setDone(e.target.checked);
        router.patch(route('task.update'),
            {
                task_id:id,
                name: name,
                done: e.target.checked
            },
            {
                onFinish: visit => {
                    setCheckId(0);
                    setDone(false);
                    if(filter==='all')
                        showAll();
                    if(filter==='todo')
                        showTodo();
                    else if(filter==='done')
                        showDone();
                }
            }
        )
    }

    function handleDelete(taskId) {
        console.log(taskId)
        router.delete(route('task.delete', taskId),
            {onBefore: () => confirm('Are you sure you want to delete this user?'),});
    }

    function handleEdit(id,name){
        setEditing(!editing)
        setValue(name)
        setEditId(id)
        console.log(editing)
    }
    function inputOnBlur(){
        //失去焦点触发
        setEditing(false);
        setEditId(0);
        setValue('');
    }
    function  handleChange(e){
        console.log('change');
        setValue(e.target.value)
    }

    function finishChange(event,done){
        if (event.key === 'Enter') {
            //update
            router.patch(route('task.update'),{
                    task_id:editId,
                    name:value,
                    done:done
                },
                {
                    onFinish: visit => {
                        setEditing(false);
                        setEditId(0);
                        console.log(filter);
                        //setTodos(tasks.slice().sort((a, b) => b.id - a.id))
                        //setSortedTasks(tasks.slice().sort((a, b) => b.id - a.id));
                        if(filter==='all')
                            showAll();
                        if(filter==='todo')
                            showTodo();
                        else if(filter==='done')
                            showDone();
                    }
                })
        }
    }

    function showAll(){
        setFilter('all');

    }

    function showTodo(){
        setFilter('todo');

    }

    function showDone(){
        setFilter('done');

    }
    return (
        <>
            <div className="task-list">
                <div className="task-top">
                    <div className="icon">
                        <svg t="1700815575840" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2406" width="200" height="200"><path d="M336 544C256.608 544 192 608.608 192 688S256.608 832 336 832s144-64.608 144-144-64.608-144-144-144z m0 224C291.904 768 256 732.128 256 688S291.904 608 336 608s80 35.872 80 80-35.904 80-80 80zM800 256h-211.424a32 32 0 1 0 0 64H800a32 32 0 1 0 0-64zM800 576h-211.424a32 32 0 1 0 0 64H800a32 32 0 1 0 0-64zM800 384h-211.424a32 32 0 1 0 0 64H800a32 32 0 1 0 0-64zM800 712h-211.424a32 32 0 1 0 0 64H800a32 32 0 1 0 0-64zM440 235.808l-120.992 148.608-71.04-80.352a32 32 0 0 0-47.936 42.4l71.008 80.352a63.648 63.648 0 0 0 48.032 21.632 63.36 63.36 0 0 0 49.536-23.584L489.6 276.192a32 32 0 0 0-49.6-40.384z" p-id="2407"></path><path d="M896 64H128c-35.296 0-64 28.704-64 64v768c0 35.296 28.704 64 64 64h768c35.296 0 64-28.704 64-64V128c0-35.296-28.704-64-64-64zM128 896V128h768l0.064 768H128z" p-id="2408"></path></svg>
                    </div>
                    <span className="title">待办清单</span>
                </div>
                <div className="task-input">
                    <input onKeyDown={(e)=>handleEnter(e)}  onInput={(e)=>handleInput(e)} placeholder="what do you want to do?" />
                </div>
                {(filter==='all'?tasks:filter==='todo'?tasks.filter((item)=>item.done===false):tasks.filter((item)=>item.done===true)).map((item)=>{
                    return(
                        <div className="task-item" key={item.id} onDoubleClick={() => handleEdit(item.id,item.name)}>
                            <input onBlur={inputOnBlur } onKeyDown={(e)=>finishChange(e,item.done)} onChange={(e)=>handleChange(e)} disabled={!editing} value={editId===item.id?editing?value:item.name:item.name} className={item.done?"done":editId===item.id?editing?"editing":"t-content":'t-content'} />

                            <input onChange={(e)=>handleCheck(e,item.id,item.name)} className="t-check" type="checkbox" checked={item.id===checkId?done:item.done} />
                            <div className="delete" onClick={()=>handleDelete(item.id)}>X</div>
                        </div>
                    )})}
                <div className="filter">
                    <div onClick={showAll} className={filter==='all'?'f-item active':"f-item"}>all</div>
                    <div onClick={showTodo} className={filter==='todo'?'f-item active':"f-item"}>need to do</div>
                    <div onClick={showDone} className={filter==='done'?'f-item active':"f-item"}>done</div>
                </div>
            </div>
        </>
    )
}
