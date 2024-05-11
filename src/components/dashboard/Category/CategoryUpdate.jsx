"use client"
import React, { useState } from 'react';
import LoaderButton from "@/components/master/LoaderButton";
import { ErrorToast, IsEmpty, SuccessToast } from "@/utility/FormHelper";
import {useRouter} from "next/navigation";
const CategoryCreate = (props) => {
    const router=useRouter();
    const [submit, setSubmit] = useState(false);
    let [data, setData] = useState({
        name:props.data[0]['name'],
    });
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }
    const formSubmit =async (e) => {
        e.preventDefault();
        if(IsEmpty(data.name)){
            ErrorToast("Category Name Required")
        }
        else{
            setSubmit(true);
  
            const options = {
                method:'PATCH',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
  
            let res=await fetch(`/api/dashboard/categories?id=${props.id}`,options);
            let ResJson=await res.json();
  
            if (ResJson['status'] === "success") {
                setData({ ...data, name: "" }) 
                router.replace("/admin/dashboard/CategoryList?pageNo=1&perPage=10&searchKey=0")
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
                                    <div className='row g-0'>
                                        <div className='col-lg-12'>
                                             <h4>Category Update</h4>
                                            <div className='section-title'></div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <input value={data.name} onChange={(e)=>{inputOnChange("name",e.target.value)}} className='form-control mb-4' type="text" placeholder='Category Name' />
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

export default CategoryCreate;