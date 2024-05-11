"use client"
import {useState} from "react";
import {ErrorToast, IsEmail, IsEmpty, SuccessToast} from "@/utility/FormHelper";
import Link from "next/link";
import LoaderButton from "../master/LoaderButton";
const LoginForm = () => {
    let [data, setData] = useState({
        email: "",
        password: "",
    });

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
        else if(IsEmpty(data.password)){
            ErrorToast("Password Required")
        }
        else{
            setSubmit(true);
  
            const options = {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
  
            let res=await fetch("/api/user/login",options);
            let ResJson=await res.json();
  
            if (ResJson['status'] === "success") {
                  setData({email:"",password:""}) 
                  SuccessToast("Login Success")
                  window.location.href = '/'; 
            }
            else {
                  setSubmit(false);
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

                            <from className="card animated fadeIn p-5 shadow border-0">
                                <h2>Login</h2>
                                <input value={data.email} onChange={(e)=>{inputOnChange("email",e.target.value)}} type="email" placeholder='Email' className="form-control mb-4" />
                                <input value={data.password} onChange={(e) => { inputOnChange("password", e.target.value) }} type="password" placeholder='Password' className='form-control mb-4' />
                                <button onClick={formSubmit} className='frm-btn'>
                                    {submit ? <LoaderButton /> :"Login" }
                                </button>
                                    
                                <div className="my-4 d-flex">
                                    <Link href="/user/registration" className="nav-link mx-2">Sign Up |</Link>
                                    <Link href="/user/emailVerify" className="nav-link mx-2">Forget Password</Link>
                                </div>
                            </from>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;