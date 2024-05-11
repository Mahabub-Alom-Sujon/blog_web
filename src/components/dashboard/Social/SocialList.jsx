"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import {ErrorToast, SuccessToast} from "@/utility/FormHelper";
import { useRouter } from "next/navigation";
import LoaderButton from "@/components/master/LoaderButton";
import { DeleteAlert } from "@/utility/DeleteAlert";
import ReactPaginate from "react-paginate";
const SocialList = (props) => {
    const router = useRouter();
    const [submit, setSubmit] = useState(false);
    let [searchKey,setSearchKey]=useState(0);
    let [perPage, setPerPage] = useState(10);
    const PageKeyOnChange =(e) => {
        setPerPage(parseInt(e.target.value));
        //setPageNo(1); 
        router.push(`/admin/dashboard/SocialList?pageNo=1&perPage=${(parseInt(e.target.value))}&searchKey=${searchKey}`);
    };
    const handlePageClick = ({ selected }) => {
        //setPageNo(1)
        router.push(`/admin/dashboard/SocialList?pageNo=${selected + 1}&perPage=${perPage}&searchKey=${searchKey}`);
        router.refresh()
    };
    const searchOnChange=(e)=>{
        //setSearchKey(e.target.value)
        if ((e.target.value.length) === 0) {
            setSearchKey("0")
            router.refresh();
            router.push(`/admin/dashboard/SocialList?pageNo=1&perPage=${perPage}&searchKey=0`);
            
        }
        else {
            router.refresh();
            router.push(`/admin/dashboard/SocialList?pageNo=1&perPage=${perPage}&searchKey=${e.target.value}`)
            
        }
    }

    const formSubmit = async () => {
        setSubmit(true);
        router.push('/admin/dashboard/SocialCreate')
     }
    const onDelete = async (id) => {
        let Result = await DeleteAlert();
        if (Result.isConfirmed) {
            const options = {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                cache:"no-cache",
               // body: JSON.stringify({id:parseInt(id)})
            }
            let res=await fetch(`/api/dashboard/social?id=${id}`,options);
              let ResJson=await res.json();
              if (ResJson['status'] === "success") {
                  SuccessToast("Request Success")
                  router.refresh()
              }
              else {
                    ErrorToast("Request Fail ! Try Again")
              }
        }
        
    }
    return (
        <div className='dashboard'>
            <div className='container'>
                <div className='row'>
                    {/* {JSON.stringify(props.data)} */}
                    <div className='col-lg-12'>
                        <div className='create'>
                        <button onClick={formSubmit} className='frm-btn'>
                            {submit ? <LoaderButton /> :"New Social"}
                        </button>
                        </div>
                        
                        <div className='card shadow border-0 p-4'>
                            <div className='card-body p-0'>
                                <div className='container-fluid g-0'>
                                    <div className='row justify-content-end align-items-center'>
                                        <div className='col-lg-7'>
                                            <h4>Social List</h4>
                                        </div>
                                        <div className='col-lg-2 col-md-3 col-sm-5'>
                                            <select onChange={PageKeyOnChange} className="form-control form-select-sm form-select form-control-sm" >
                                                <option value="10">10 Per Page</option>
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="40">40 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                                <option value="200">200 Per Page</option>
                                                <option value="200">200 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-3 col-md-5 col-sm-7">
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
                                                    <th className="text-uppercase text-xxs font-weight-bolder opacity-8 ps-2">facebook</th>
                                                    <th className="text-uppercase text-xxs font-weight-bolder opacity-8 ps-2">youtube</th>
                                                    <th className="text-uppercase text-xxs font-weight-bolder opacity-8 ps-2">twitter</th>
                                                    <th className="text-uppercase text-xxs font-weight-bolder opacity-8 ps-2">linkedin</th>
                                                    <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-8">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.data["result"].map((item, i) => {
                                                        return <tr key={i}>
                                                                <td>
                                                                    <p className="text-xs text-start mb-0">{i + 1}</p>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <p className='mb-0'>{item["facebook"] }</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <p className='mb-0'>{item["youtube"] }</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <p className='mb-0'>{item["twitter"] }</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <p className='mb-0'>{item["linkedin"] }</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className='text-center'>
                                                                        <Link href={`/admin/dashboard/SocialUpdate?id=${item['id']}`}><AiOutlineEdit className='pen'/></Link>
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
                                        />
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialList;