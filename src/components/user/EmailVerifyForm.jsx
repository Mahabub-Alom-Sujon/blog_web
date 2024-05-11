"use client"
import {useState} from "react";
import {ErrorToast, IsEmail, IsEmpty, SetEmail, SuccessToast} from "@/utility/FormHelper";
import {useRouter} from "next/navigation";
import LoaderButton from "../master/LoaderButton";
const EmailVerifyForm = () => {
    const router=useRouter();
    let [data, setData] = useState({ email: ""});
    const [submit, setSubmit] = useState(false);
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }
    const formSubmit =async (e) => {
        e.preventDefault();
        if(IsEmail(data.email)){
            ErrorToast("Valid Email Address Required")
        }
        else if(IsEmpty(data.email)){
            ErrorToast("Email Address Empty")
        }
        else{
            setSubmit(true);
            let res=await fetch(`/api/user/verifyEmail?email=${data.email}`)
            let ResJson=await res.json();
  
            if (ResJson['status'] === "success") {
                 // Temporary Session
                 SetEmail(data.email);
                router.push("/user/otpVerify")
                SuccessToast("Request Success")
            }
            else {
                  setSubmit(false);
                  ErrorToast("Invalid Email Address!")
            }
  
        }
    }
    return (
        <section id='login'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='login-form'>
                            <from onSubmit={formSubmit} className="card animated fadeIn p-5 my-3 shadow border-0">
                                <h2>Email Address</h2>
                                <input value={data.email} onChange={(e)=>{inputOnChange("email",e.target.value)}} type="email" placeholder='Email' className="form-control mb-4" />
                                <button onClick={formSubmit} className='frm-btn'>
                                    {submit? <LoaderButton/>:"Login"}
                                </button>
                            </from>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmailVerifyForm;