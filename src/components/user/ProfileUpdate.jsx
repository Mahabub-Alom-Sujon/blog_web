"use client"
import { useEffect, useState } from "react";
import {ErrorToast, IsEmail, IsEmpty, SuccessToast, getBase64} from "@/utility/FormHelper";
import {useRouter} from "next/navigation";
import LoaderButton from "../master/LoaderButton";

const ProfileUpdate = (props) => {
    const [storedPhoto, setStoredPhoto] = useState(null);

    useEffect(() => {
        const photo = localStorage.getItem('photo');
        setStoredPhoto(photo);
    }, []);
    const [data, setData] = useState({
        firstName: props.data['firstName'],
        lastName: props.data['lastName'],
        email: props.data['email'],
        password: props.data['password'],
        phone: props.data["phone"],
        address: props.data["address"],
        city: props.data['city'],
        postCode: props.data["postCode"],
        photo:props.data["photo"]
    });
    const [submit, setSubmit] = useState(false);
    const router = useRouter();
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }
    // const PreviewImage = async (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const base64String = await getBase64(file);
    //         setData(prevData => ({
    //             ...prevData,
    //             photo: base64String
    //         }));
    //         //e.target.value = null;
    //     }
    // };

        const PreviewImage = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const base64String = await getBase64(file);
                setData(prevData => ({
                    ...prevData,
                    photo: base64String
                }));
                // setStoredPhoto(base64String);
                // localStorage.setItem('photo', base64String); // Update localStorage
            }
        };
    const formSubmit = async () => {
        if (IsEmpty(data.firstName)) {
            ErrorToast("First Name Required")
        }
        else if(IsEmpty(data.lastName)){
            ErrorToast("Last Name Required")
        }
        else if(IsEmail(data.email)){
            ErrorToast("Valid Email Address Required")
        }
        
        else if (IsEmpty(data.password)) {
            ErrorToast("Password Required")
        }
        else if(IsEmpty(data.phone)){
            ErrorToast("Phone Required")
        }
        else if(IsEmpty(data.address)){
            ErrorToast("address Required")
        }
        else if(IsEmpty(data.city)){
            ErrorToast("City Required")
        }
        else if(IsEmpty(data.postCode)){
            ErrorToast("PostCode Required")
        }
        else{
            setSubmit(true);
            const options = {
                method: 'PUT',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
            let res=await fetch("/api/userdashboard/profile",options);
            let ResJson=await res.json();
            setSubmit(false);
            if(ResJson['status']==="success"){
                SuccessToast("Update Success")
                router.refresh()
            }
            else{
                
                ErrorToast("Request Fail")
            }
        }
    }
    return (
        <section id="login">
            {/* {JSON.stringify(props.data)} */}
            <div className='container g-0'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-lg-10'>
                        <div className='login-form'>
                            <from className="card animated fadeIn p-5 shadow border-0">
                                <h2>Profile</h2>
                                 {/* {storedPhoto && <img className="icon-nav-img-lg mb-4" src={storedPhoto} alt="User" /> } */}
                                <img  className="icon-nav-img-lg mb-4" src={data.photo} />
                                <input  onChange={PreviewImage}   className="form-control mb-4" type="file"/>
                                <input value={data.firstName} onChange={(e)=>{inputOnChange("firstName",e.target.value)}} type="text" placeholder='First Name' className="form-control mb-4" />
                                <input value={data.lastName} onChange={(e)=>{inputOnChange("lastName",e.target.value)}} type="text" placeholder='Last Name' className="form-control mb-4" />
                                <input value={data.email} onChange={(e) => { inputOnChange("email", e.target.value) }} readOnly={true} type="email" placeholder='Email' className="form-control mb-4" />
                                <input value={data.password} onChange={(e)=>{inputOnChange("password",e.target.value)}} type="password" placeholder='password' className="form-control mb-4" />
                                <input value={data.phone} onChange={(e)=>{inputOnChange("phone",e.target.value)}} type="text" placeholder='Phone' className="form-control mb-4" />
                                <input value={data.address} onChange={(e)=>{inputOnChange("address",e.target.value)}} type="text" placeholder='Address' className="form-control mb-4" />
                                <input value={data.city} onChange={(e)=>{inputOnChange("city",e.target.value)}} type="text" placeholder='City' className="form-control mb-4" />
                                <input value={data.postCode} onChange={(e)=>{inputOnChange("postCode",e.target.value)}} type="text" placeholder='PostCode' className="form-control mb-4" />
                                <button onClick={formSubmit} className='frm-btn'>
                                    {submit ?<LoaderButton/>:"Update"}
                                </button>
                            </from>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileUpdate;