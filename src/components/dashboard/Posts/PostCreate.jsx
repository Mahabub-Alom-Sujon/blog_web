"use client"
import React, { useState } from 'react';
import LoaderButton from "@/components/master/LoaderButton";
import { ErrorToast,IsEmpty, SuccessToast } from "@/utility/FormHelper";
import { useRouter } from "next/navigation";
//import ReactQuill from 'react-quill';
import Editor from "@/utility/Editor";
import 'react-quill/dist/quill.snow.css';
const PostCreate = (props) => {
     const router=useRouter();
    const [submit, setSubmit] = useState(false);
    //const [editorData, setEditorData] = useState("");
    let [data, setData] = useState({
        title: "",short_des: "",img1: "",img2: "",img3: "",img4: "",keywords: "",long_des:"",type: "",catID:"",tagID:"",
        
    });
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value,
            [name]: name === "catID" || name === "tagID" ? parseInt(value) : value
        }))
    }
    const formSubmit =async (e) => {
        e.preventDefault();
        if(IsEmpty(data.title)){
            ErrorToast("Title Name Required")
        }
        else if(IsEmpty(data.short_des)){
            ErrorToast("Short description Required")
        }
        else if (IsEmpty(data.img1)) {
            ErrorToast("img1 Required")
        }
        else if (IsEmpty(data.img2)) {
            ErrorToast("img2 Required")
        }
        else if (IsEmpty(data.img3)) {
            ErrorToast("img3 Required")
        }
        else if (IsEmpty(data.img4)) {
            ErrorToast("img4 Required")
        }
        else if(IsEmpty(data.keywords)) {
            ErrorToast("Keywords Required")
        }
        else if(IsEmpty(data.type)) {
            ErrorToast("Type Required")
        }
        else if(IsEmpty(data.catID)) {
            ErrorToast("Category Required")
        }
        else if(IsEmpty(data.tagID)) {
            ErrorToast("Tag Required")
        }
        else if(IsEmpty(data.long_des)) {
            ErrorToast("long_des Required")
        }
        else{
            setSubmit(true);
            const options = {
                method:'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
            let res = await fetch("/api/dashboard/post", options);
            let ResJson=await res.json();
            if (ResJson['status'] === "success") {
                setData({title:"",short_des:"",img1:"",img2:"",img3:"",img4:"",keywords:"",
                long_des:"",type:"",catID:"",tagID:""}) 
                router.replace("/admin/dashboard/PostList?pageNo=1&perPage=10&searchKey=0")
                router.refresh()
                //debugger
                SuccessToast("Create Success")
            }
            else {
                //debugger
                setSubmit(false);
                ErrorToast("Request Fail")
            }
  
        }
    }
    return (
        <>
            <div className='container'>
                {/* {JSON.stringify(props.Category)}
                {JSON.stringify(props.Tag)} */}
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card shadow border-0 p-4'>
                            <div className='card-body p-0'>
                                <from className='dashboard'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                             <h4>Post Create</h4>
                                            <div className='section-title'></div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <input value={data.title} onChange={(e)=>{inputOnChange("title",e.target.value)}} className='form-control mb-4' type="text" placeholder='Title Name' />
                                        </div>
                                        <div className='col-lg-6'>
                                            <input value={data.short_des} onChange={(e)=>{inputOnChange("short_des",e.target.value)}} className='form-control mb-4' type="text" placeholder='Short description' />
                                        </div>
                                        <div className='col-lg-6'>
                                            <input value={data.img1} onChange={(e)=>{inputOnChange("img1",e.target.value)}} className='form-control mb-4' type="text" placeholder='Image1 CDN' />
                                        </div>
                                        <div className='col-lg-6'>
                                            <input value={data.img2} onChange={(e)=>{inputOnChange("img2",e.target.value)}} className='form-control mb-4' type="text" placeholder='Image2 CDN' />
                                        </div>
                                        <div className='col-lg-6'>
                                            <input value={data.img3} onChange={(e)=>{inputOnChange("img3",e.target.value)}} className='form-control mb-4' type="text" placeholder='Image3 CDN'/>
                                        </div>
                                        <div className='col-lg-6'>
                                            <input value={data.img4} onChange={(e)=>{inputOnChange("img4",e.target.value)}} className='form-control mb-4' type="text" placeholder='Image4 CDN'/>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-6'>
                                            <input value={data.keywords} onChange={(e)=>{inputOnChange("keywords",e.target.value)}} className='form-control mb-4' type="text" placeholder='Keywords' />
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-6'>
                                            <input value={data.type} onChange={(e)=>{inputOnChange("type",e.target.value)}} className='form-control mb-4' type="text" placeholder='Type'/>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-6'>
                                            <select value={data.catID} onChange={(e)=>{inputOnChange("catID",e.target.value)}}  className='form-control mb-4'>
                                                <option value="">Select Category</option>
                                                {
                                                    props.Category.map((item, i) => {
                                                        return(<option key={i.toLocaleString()} value={item.id}>{item.name}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-6'>
                                            <select value={data.tagID} onChange={(e)=>{inputOnChange("tagID",e.target.value)}}  className='form-control mb-4'>
                                                <option value="">Select Tag</option>
                                                {
                                                    props.Tag.map((item, i) => {
                                                        return(<option key={i.toLocaleString()} value={item.id}>{item.name}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className='col-lg-12 mb-4'>
                                            {/* <ReactQuill theme="snow" value={data.long_des} onChange={(e)=>{inputOnChange("long_des",e.target.value)}} /> */}
                                            <Editor
                                                data={data.long_des}
                                                onDataChange={(value) => inputOnChange("long_des", value)}
                                                // data={editorData}
                                                // onDataChange={setEditorData}
                                            />
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

export default PostCreate;