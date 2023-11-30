import { router } from '@inertiajs/react'
import {useEffect, useState} from "react";
import AddModal from "@/Components/AddModal.jsx";
import '../../../css/plan.css'
export default function plan_list({plans}) {

    const [ifFold,setIfFold] = useState(true)
    const [showModal,setShowModal] = useState(false)
    const [activeSections,setActiveSections] = useState([])//展开器
    const [state,setState] = useState(false)
    useEffect(()=>{
        //检查打卡状态
        // router.put(route('plan.check_state'));

        //console.log(activeSections.find())
    },[state])
    function changeShow(){
        setShowModal(!showModal);
    }
    function onSubmit(title, content, if_open,cycle){
         router.post(route('plan.add'),{
             name: title,
             content:content,
             if_open:if_open,
             cycle:cycle,
             if_checkin: false,
             check_counts: 0,
         },{
             onFinish:visit=>{
                 console.log('success add!')
        }
         });
         changeShow();
    }

    function unFold(id){
        router.put(route('plan.check_state'));
        console.log(activeSections?.some((item)=>item['id'] === id))
        if(activeSections?.indexOf(id)>=0)//存在id
            setActiveSections(activeSections.filter((item)=>item!==id))
        else//不存在
            setActiveSections(activeSections.concat(id));
        console.log(activeSections)
    }

    function  handleCheck(id){//打卡
        router.patch(route('plan.checkin'),{
            plan_id:id
        })
    }

    function  handleDelete(id)
    {
        router.delete(route("plan.delete",id),{onBefore: () => confirm('确定删除这个计划吗?')})
    }
    return (

        <>
            <AddModal show={showModal} onSubmit={onSubmit} changeShow={changeShow}/>
            <div className="plan-list">
                <div className="plan-top">
                    <div className="task-top">
                        <div className="icon">
                            <svg t="1701076221025" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2445" width="200" height="200"><path d="M866 532.2V281.4c0-53.1-43.1-96.3-96.1-96.3h-28.3v-28.3c0-32-26-58-58-58s-58 26-58 58v30.7h-85.1v-30.7c0-32-26-58-58-58s-58 26-58 58v30.7h-85.2v-30.7c0-32-26-58-58-58s-58 26-58 58v28.3h-28.1c-53.1 0-96.3 43.2-96.3 96.3v489.2c0 53.2 43.2 96.5 96.3 96.5h338.2c43.2 38.3 98.2 59.2 156.5 59.2 63.1 0 122.5-24.6 167.2-69.2 44.6-44.7 69.2-104 69.2-167.2 0-58.8-21.3-114.3-60.3-157.7zM665 156.8c0-10.3 8.3-18.6 18.6-18.6s18.6 8.3 18.6 18.6v46c-0.1 0.7-0.1 1.3-0.1 2s0 1.3 0.1 2v64.9c0 10.3-8.3 18.7-18.6 18.7s-18.6-8.3-18.6-18.6v-115z m-201.1 0c0-10.3 8.3-18.6 18.6-18.6s18.6 8.3 18.6 18.6v114.9c0 10.3-8.3 18.7-18.6 18.7s-18.6-8.3-18.6-18.6v-115z m-182.6-18.6c10.3 0 18.6 8.3 18.6 18.6v115c0 4.9-1.9 9.6-5.4 13.1-3.5 3.5-8.2 5.5-13.2 5.5-10.3 0-18.6-8.3-18.6-18.6v-65c0.1-0.7 0.1-1.3 0.1-2s0-1.3-0.1-2v-46c0-10.3 8.3-18.6 18.6-18.6z m-86.1 86.3h28.1v47.3c0 32 26 58 58 58 15.6 0 30.2-6.1 41.1-17.1 10.9-11 16.9-25.6 16.9-41v-44.8h85.2v44.9c0 32 26 58 58 58s58-26.1 58-58.1v-44.8h85.1v44.9c0 32 26 58 58 58s58-26.1 58-58.1v-47.2h28.3c31.3 0 56.7 25.5 56.7 56.9v93.3H138.3v-93.3c0-31.4 25.5-56.9 56.9-56.9z m-56.9 546.1V414.1h688.3V497c-39.7-28.2-87-43.5-136.7-43.5-63.1 0-122.5 24.6-167.2 69.2l-0.3 0.3v-59.7h-78.8v98.5h47.5c-24.5 37.8-37.6 81.9-37.6 128 0 50.1 15.5 97.9 44.3 137.8H195.2c-31.4 0.1-56.9-25.5-56.9-57z m364.4-228.5h-39.4V483h39.4v59.1z m187.2 344.8c-108.6 0-197-88.4-197-197s88.4-197 197-197 197 88.4 197 197-88.4 197-197 197z" p-id="2446"></path><path d="M689.9 522.4c-92.3 0-167.5 75.1-167.5 167.5 0 92.3 75.1 167.5 167.5 167.5 92.3 0 167.5-75.1 167.5-167.5 0-92.3-75.2-167.5-167.5-167.5z m0 315.2c-81.5 0-147.8-66.3-147.8-147.7 0-81.5 66.3-147.8 147.8-147.8 81.5 0 147.7 66.3 147.7 147.8 0 81.5-66.2 147.7-147.7 147.7zM207.1 561.9H286v-98.5h-78.8v98.5z m19.8-78.8h39.4v59.1h-39.4v-59.1zM325.4 561.9h78.8v-98.5h-78.8v98.5z m19.7-78.8h39.4v59.1h-39.4v-59.1zM207.1 758.9H286v-98.5h-78.8v98.5z m19.8-78.8h39.4v59.1h-39.4v-59.1zM325.4 758.9h78.8v-98.5h-78.8v98.5z m19.7-78.8h39.4v59.1h-39.4v-59.1z" p-id="2447"></path><path d="M788.4 670.1h-88.6v-88.6c0-5.4-4.4-9.9-9.9-9.9s-9.9 4.4-9.9 9.9v108.4h108.4c5.4 0 9.9-4.4 9.9-9.9s-4.5-9.9-9.9-9.9z" p-id="2448"></path></svg>
                        </div>
                        <span className="title">计划列表</span>
                    </div>
                </div>
                <div className="add_plan" onClick={changeShow}>add a plan</div>
                {plans?.map((item)=>{
                        return (
                            <div className="plan-item" key={item.id}>
                                <div className="p_top">
                                    <div className="plan_title">{item.name}</div>
                                    <div className="p_leftTime">{item.if_checkin===false?item.left_time>(3600 * 24)?'剩余打卡时间:'+Math.floor(item.left_time/(3600 * 24))+'天':'剩余打卡时间:'+Math.floor(item.left_time/3600)+'小时'+Math.floor((item.left_time % 3600) / 60)+'分钟':''}</div>
                                    <div onClick={()=>unFold(item.id)} className="unfold">
                                        <svg t="1701100638999" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3417" width="200" height="200"><path d="M490.666667 601.6L797.866667 298.666667l59.733333 59.733333-302.933333 302.933333-59.733334 64-59.733333-59.733333L128 358.4 187.733333 298.666667l302.933334 302.933333z" fill="#444444" p-id="3418"></path></svg>
                                    </div>
                                    <div className="p-delete" onClick={()=>handleDelete(item.id)}>
                                        <svg t="1701336463026" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2324" width="200" height="200"><path d="M840 288H688v-56c0-40-32-72-72-72h-208C368 160 336 192 336 232V288h-152c-12.8 0-24 11.2-24 24s11.2 24 24 24h656c12.8 0 24-11.2 24-24s-11.2-24-24-24zM384 288v-56c0-12.8 11.2-24 24-24h208c12.8 0 24 11.2 24 24V288H384zM758.4 384c-12.8 0-24 11.2-24 24v363.2c0 24-19.2 44.8-44.8 44.8H332.8c-24 0-44.8-19.2-44.8-44.8V408c0-12.8-11.2-24-24-24s-24 11.2-24 24v363.2c0 51.2 41.6 92.8 92.8 92.8h358.4c51.2 0 92.8-41.6 92.8-92.8V408c-1.6-12.8-12.8-24-25.6-24z" fill="#cc695c" p-id="2325"></path><path d="M444.8 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24zM627.2 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24z" fill="#cc695c" p-id="2326"></path></svg>
                                    </div>
                                </div>
                                <div className="p_content"  style={{display: activeSections?.indexOf(item.id)>=0?'block':'none'}}>
                                    <span>{item.content}</span>
                                    <div className="tag">{item.if_open?"公开":"私密"}</div>
                                    <div className="cycle">打卡周期:{item.cycle}天</div>
                                    <div className="checkinCount">已打卡:{item.check_counts}次</div>
                                    <div className="checkin" onClick={item.if_checkin?'':()=>handleCheck(item.id)}>{item.if_checkin?'已打卡':'打卡'}</div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>

        </>
    )
}


