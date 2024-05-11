"use client"
import React, { useState } from 'react';
import LoaderButton from "@/components/master/LoaderButton";
import { ErrorToast, IsEmpty, SuccessToast } from "@/utility/FormHelper";
import {useRouter} from "next/navigation";
const SocilaCreate = () => {
    const router=useRouter();
    const [submit, setSubmit] = useState(false);
    let [data, setData] = useState({
        facebook:"",youtube:"",twitter:"",linkedin:""
    });
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }
    const formSubmit =async (e) => {
        e.preventDefault();
        if(IsEmpty(data.facebook)){
            ErrorToast("Facebool link Required")
        }
        else if (IsEmpty(data.youtube)) {
            ErrorToast("Youtube link Required")
        }
        else if (IsEmpty(data.twitter)) {
            ErrorToast("Twitter link Required")
        }
        else if (IsEmpty(data.linkedin)) {
            ErrorToast("Linkedin link Required")
        }
        else{
            setSubmit(true);
            const options = {
                method:'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
  
            let res=await fetch("/api/dashboard/social",options);
            let ResJson=await res.json();
  
            if (ResJson['status'] === "success") {
                setData({ name: ""}) 
                router.replace("/admin/dashboard/SocialList?pageNo=1&perPage=10&searchKey=0")
                router.refresh()
                SuccessToast("Create Success")
            }
            else {
                  setSubmit(false);
                  ErrorToast("Request Fail")
            }
  
        }
    }
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card shadow border-0 p-4'>
                            <div className='card-body p-0'>
                                <from className='dashboard'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                             <h4>Social Create</h4>
                                            <div className='section-title'></div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <input value={data.facebook} onChange={(e)=>{inputOnChange("facebook",e.target.value)}} className='form-control mb-4' type="text" placeholder='Facebook CDN' />
                                        </div>
                                        <div className='col-lg-6'>
                                            <input value={data.youtube} onChange={(e)=>{inputOnChange("youtube",e.target.value)}} className='form-control mb-4' type="text" placeholder='Youtube CDN' />
                                        </div>
                                        <div className='col-lg-6'>
                                            <input value={data.twitter} onChange={(e)=>{inputOnChange("twitter",e.target.value)}} className='form-control mb-4' type="text" placeholder='Twitter CDN' />
                                        </div>
                                        <div className='col-lg-6'>
                                            <input value={data.linkedin} onChange={(e)=>{inputOnChange("linkedin",e.target.value)}} className='form-control mb-4' type="text" placeholder='Linkedin CDN' />
                                        </div>
                                    </div>
                                    <button onClick={formSubmit} className='frm-btn'>
                                        {submit ? <LoaderButton /> :"Save Change"}
                                    </button>
                                </from>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SocilaCreate;