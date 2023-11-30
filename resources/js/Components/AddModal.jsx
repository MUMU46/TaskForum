import '../../css/addModal.css'
import {useState} from "react";
export default function AddModal ({show,onSubmit,changeShow}) {

    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [ifOpen,setIfOpen] = useState(false);
    const [cycle,setCycle] = useState('')
    function  handleTitle(e){
        setTitle(e.target.value);
    }

    function  handleContent(e){
        setContent(e.target.value);
    }

    function  handleCheck(e){
        //console.log(e.target.checked);
        setIfOpen(e.target.checked);
    }
    function handleCycle(e){
        setCycle(e.target.value)
    }

    function handleClose(){
        changeShow();
        setTitle('');
        setCycle('');
        setContent('');
        setIfOpen(false);
    }
    function handleSubmit(){
        onSubmit(title,content,ifOpen,cycle);
    }


    return (
        <>
            <div className="add-plan" style={{display:show?'block':'none'}}>
                <div className="add-box">
                    <div className="close" onClick={handleClose}>X</div>
                    <div className="add-title">
                        <div className="t-name">计划标题:</div>
                        <input onInput={(e)=>handleTitle(e)} value={title} className="plan_input" />
                    </div>
                    <div className="add-cycle">
                        <span className="c-name">打卡周期(天):</span>
                        <input onInput={(e)=>handleCycle(e)} className="c_time" value={cycle}/>
                    </div>
                    <div className="plan_content">
                        <div className="c-name">计划内容:</div>
                        <textarea onInput={(e)=>handleContent(e)} value={content} className="plan_texta" />
                    </div>
                    <div className="button-box">
                        <input onChange={(e)=>handleCheck(e)} checked={ifOpen} className="open-check" type="checkbox"  />
                        <span>公开可见</span>
                        <button onClick={handleSubmit} className="add_button">发布</button>
                    </div>
                </div>
            </div>
        </>
    )
};
