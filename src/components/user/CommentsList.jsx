"use client"
import React, { useState } from 'react';
import { PiEyeBold } from "react-icons/pi";
import ReactPaginate from "react-paginate";
import { MdDelete } from "react-icons/md";
import Link from 'next/link';
import {ErrorToast, SuccessToast} from "@/utility/FormHelper";
import { useRouter } from "next/navigation";
import {DeleteAlert} from "@/utility/DeleteAlert";
const CommentsList = (props) => {
    const router = useRouter();
    let [searchKey,setSearchKey]=useState("0");
    let [perPage, setPerPage] = useState(5);
    const [pageNo, setPageNo] = useState(1);
    const onDelete = async (id) => {
        let Result = await DeleteAlert();
        if (Result.isConfirmed) {
            const options = {
                method: 'DELETE',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({ id: id })
            }
            let res=await fetch("/api/userdashboard/comment",options);
              let ResJson=await res.json();
    
              if (ResJson['status'] === "success") {
                  SuccessToast("Request Success")
                  router.refresh();
                  
              }
              else {
                    ErrorToast("Request Fail")
              }
        }
        
    }
    const PageKeyOnChange =(e) => {
        setPerPage(parseInt(e.target.value));
        setPageNo(1);
        router.refresh();
        router.push(`/user/dashboard/comments/?pageNo=1&perPage=${e.target.value}&searchKey=${searchKey}`);
        
    };
    const handlePageClick = (event) => {
        router.refresh();
        router.push(`/user/dashboard/comments/?pageNo=${event.selected+1}&perPage=${perPage}&searchKey=${searchKey}`);
       
    };
    const searchOnChange=(e)=>{
        setSearchKey(e.target.value)
        if ((e.target.value.length) === 0) {
            setSearchKey("0")
            router.refresh();
            router.push(`/user/dashboard/comments/?pageNo=1&perPage=${perPage}&searchKey=0`);
            
        }
        else {
            router.refresh();
            router.push(`/user/dashboard/comments/?pageNo=1&perPage=${perPage}&searchKey=${e.target.value}`)
            
        }
    }
    const searchData = () => {
        
    }
    return (
        <section id='user-table'>
            {/* {JSON.stringify(props.data['result'])} */}
             <div className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card shadow border-0 p-4'>
                            <div className='card-body p-0'>
                                <div className='container-fluid'>
                                    <div className='row justify-content-end align-items-center'>
                                        <div className='col-lg-6'>
                                            <h4>Comments List</h4>
                                        </div>
                                        <div className='col-lg-2 col-md-3 col-sm-5 '>
                                            <select onChange={PageKeyOnChange} className="form-control form-select-sm form-select form-control-sm" >
                                                <option value="5">5 Per Page</option>
                                                <option value="10">10 Per Page</option>
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                                <option value="200">200 Per Page</option>
                                                <option value="200">200 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-4 col-md-5 col-sm-7">
                                            <div className="input-group">
                                                <input onChange={searchOnChange} type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-12'>
                                        <div className='section-title'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='table-responsive data-table'>
                                         <table className='table'>
                                            <thead className='sticky-top bg-white z-1'>
                                                <tr>
                                                    <th className="text-uppercase text-xxs font-weight-bolder opacity-8">#No</th>
                                                    <th className="text-uppercase text-xxs font-weight-bolder opacity-8">Images</th>
                                                    <th className="text-uppercase text-xxs font-weight-bolder opacity-8 ps-2 text-center">Title</th>
                                                    <th className="text-uppercase text-xxs font-weight-bolder opacity-8 ps-2">Comments</th>
                                                    <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-8">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.data["result"].map((item, i) => {
                                                        return <tr key={i}>
                                                                <td>
                                                                    <p className="text-xs text-start">{i + 1}</p>
                                                                </td>
                                                                <td>
                                                                    <div className="img">
                                                                        <img src={item.posts["img4"] } />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <h6>{item.posts["title"] }</h6>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <p>{item["descriptions"] }</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className='text-center'>
                                                                        <Link href={`/details?id=${item.posts['id']}`}><PiEyeBold className='eye'/></Link>
                                                                        <span onClick={()=>onDelete(item["id"])}><MdDelete className='delete'/></span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                    })
                                                }
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className='col-lg-12 d-flex justify-content-center'>
                                    <nav aria-label="Page navigation example">
                                        <ReactPaginate
                                            previousLabel="<"
                                            nextLabel=">"
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            breakLabel="..."
                                            breakClassName="page-item"
                                            breakLinkClassName="page-link"
                                            pageCount={Math.ceil(props.data.Total / perPage)}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={handlePageClick}
                                            containerClassName="pagination"
                                            activeClassName="active"
                                            initialPage={parseInt(pageNo) - 1}
                                        />
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommentsList;