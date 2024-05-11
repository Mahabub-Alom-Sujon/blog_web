"use client"
import React, { useState } from 'react';
import LoaderButton from "@/components/master/LoaderButton";
import { ErrorToast, IsEmpty, SuccessToast } from "@/utility/FormHelper";
import {useRouter} from "next/navigation";
const PoliciesUpdate = (props) => {
    const router=useRouter();
    const [submit, setSubmit] = useState(false);
    let [data, setData] = useState({
        long_des:props.data[0].long_des,
        type:props.data[0].type
    });
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }
    const formSubmit =async (e) => {
        e.preventDefault();
        if(IsEmpty(data.long_des)){
            ErrorToast("Description Required")
        }
        else if (IsEmpty(data.type)) {
            ErrorToast("Type Name Required")
        }
        else{
            setSubmit(true);
  
            const options = {
                method:'PATCH',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
            let res=await fetch(`/api/dashboard/policies?id=${props.id}`,options);
            let ResJson=await res.json();
            if (ResJson['status'] === "success") {
                setData({ long_des: "",type:""}) 
                router.replace("/admin/dashboard/PoliciesList?pageNo=1&perPage=10&searchKey=0")
                router.refresh()
                SuccessToast("Update Success")
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
                        {/* {JSON.stringify(props.data)} */}
                        <div className='card shadow border-0 p-4'>
                            <div className='card-body p-0'>
                                <from className='dashboard'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                             <h4>Policies Update</h4>
                                            <div className='section-title'></div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <input value={data.long_des} onChange={(e) => { inputOnChange("long_des", e.target.value) }} className='form-control mb-4' type="text" placeholder='Description Name' />
                                        </div>
                                        <div className='col-lg-6'>
                                             <input value={data.type} onChange={(e)=>{inputOnChange("type",e.target.value)}} className='form-control mb-4' type="text" placeholder='Type Name'/>
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

export default PoliciesUpdate;