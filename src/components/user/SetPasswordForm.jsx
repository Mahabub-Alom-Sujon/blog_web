"use client"
import { useState } from "react";
import { ErrorToast, GetEmail, IsEmpty,getOTP, SuccessToast } from "@/utility/FormHelper";
import {useRouter} from "next/navigation"
import LoaderButton from "../master/LoaderButton";
const SetPasswordForm = () => {
    const [data, setData] = useState({ password: "", c_password: "", email: GetEmail(), otp:getOTP() });
     const [submit, setSubmit] = useState(false);
    const router=useRouter();
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }
     const formSubmit = async (e) => {
      e.preventDefault();
      if(IsEmpty(data.password)){
          ErrorToast("Password Required")
      }
      else if(IsEmpty(data.c_password)){
          ErrorToast("Confirm Password Required")
      }
      else if(data.c_password!==data.password){
          ErrorToast("Password & Confirm Password Should be Same")
      }
      else{
          setSubmit(true);
          const options = {
              method: 'POST',
              headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
              body: JSON.stringify(data)
          }

          let res=await fetch("/api/user/resetPassword",options);
          let ResJson = await res.json();
          setSubmit(false);
          if(ResJson['status']==="success"){
              SuccessToast("Request Success");
            if (typeof localStorage !== 'undefined') {
                localStorage.clear();
            }
            router.push("/user/login")
          }
          else{
                ErrorToast("Request Fail")
          }
      }
    }

    return (
        <section id='login'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='login-form'>
                        <from onSubmit={formSubmit} className="card animated fadeIn p-5 shadow border-0">
                            <h2>Set Passwor</h2>
                            <input value={data.password} onChange={(e) => { inputOnChange("password", e.target.value) }} type="password" placeholder='Your Password' className="form-control mb-4" />
                            <input value={data.c_password} onChange={(e)=>{inputOnChange("c_password",e.target.value)}} type="password" placeholder='confirm Password' className="form-control mb-4" />
                                <button onClick={formSubmit} className='frm-btn'>{submit ?<LoaderButton/>:"Next" }</button>
                        </from>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default SetPasswordForm;