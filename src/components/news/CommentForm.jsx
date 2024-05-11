"use client"
import React, { useState } from 'react';
import { ErrorToast, IsEmpty, SuccessToast } from "@/utility/FormHelper";
import { useRouter } from "next/navigation";
import LoaderButton from '../master/LoaderButton';
const CommentForm = (props) => {
    const router = useRouter();
    let [data, setData] = useState({postID:(props.postID),descriptions:""});
    const [submit, setSubmit] = useState(false);
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }
    const formSubmit = async () => {
        if(IsEmpty(data.descriptions)){
            ErrorToast("Comments Required !")
        }
        else{
            setSubmit(true);
            const options = {
                method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }

            let res=await fetch("/api/userdashboard/comment",options);
            let ResJson=await res.json();
            setSubmit(false);
            if (ResJson['status'] === "success") {
                SuccessToast("Request Success");
                setData({ ...data, descriptions: "" }); // Reset textarea value
                router.refresh()
                
            }
            else {
                router.push("user/login")
                ErrorToast("User login")
            }

        }
        
    }
    return (
        <section className='CommentForm'>
            <div className='container g-0'>
                <div className='row'>
                    <div className='col-lg-12 py-4'>
                        <div className='card shadow border-0 p-4'>
                            <div className='section-title'>
                                <h4>Write Yours Comments</h4>
                            </div>
                            <textarea rows={6} onChange={(e)=>{inputOnChange("descriptions",e.target.value)}} className="form-control mb-2" value={data.descriptions}/>
                            <div className='sub-from'>
                                <button onClick={formSubmit}>{submit?<LoaderButton/>:"Submit" }</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommentForm;