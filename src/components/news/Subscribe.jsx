"use client";
import React, {useState} from 'react';
import {ErrorToast, IsEmail, SuccessToast} from "@/utility/FormHelper";
import LoaderButton from '../master/LoaderButton';
const Subscribe = () => {

    let [data, setData] = useState({email:""});
    const [submit, setSubmit] = useState(false);
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }

    const formSubmit =async () => {
        if(IsEmail(data.email)){
            ErrorToast("Valid Email Address Required")
        }
        else{
            setSubmit(true);
            const options = {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
            let res=await fetch("/api/subscribers",options);
            let ResJson=await res.json();
            setSubmit(false);
            setData({email:""})
            if(ResJson['status']==="success"){
                SuccessToast("Request Success")
            }
            else{
                ErrorToast("Request Fail")
            }
        }
    }
    return (
        <div className="sub-from">
            <input  value={data.email} onChange={(e)=>{inputOnChange("email",e.target.value)}} type="text" placeholder="Email Address" className="form-control mb-3"/>
            <button onClick={formSubmit}>{submit ? <LoaderButton/>:"Subscribe"}</button>
        </div>
    );
};


export default Subscribe;