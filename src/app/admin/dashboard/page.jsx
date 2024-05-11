import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import { cookies } from 'next/headers'
async function getData(cookies,) {
    let option = { method: "GET", headers: { 'Cookie': cookies,}}
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`,option)).json())['data']
    let Post = (await (await fetch(`${process.env.HOST}/api/dashboard/report/post-report`, option)).json())['data']
    let Category = (await (await fetch(`${process.env.HOST}/api/dashboard/report/category-report`, option)).json())['data']
    let Tag = (await (await fetch(`${process.env.HOST}/api/dashboard/report/tag-report`, option)).json())['data']
    let Comment = (await (await fetch(`${process.env.HOST}/api/dashboard/report/comment-report`, option)).json())['data']
    return{Profile,Post,Category,Tag,Comment}
}
const page = async () => {
    const cookieStore = cookies()
    const data=await getData(cookieStore);
    return (
        <AdminLayout data={data['Profile']}>
            <div className='dashboard-home'>
                <div className='container'>
                {/* {JSON.stringify(data.Profile)} */}
                    <div className='row'>
                        <div className='col-lg-3 col-md-6'>
                            <div className='card shadow border-0'>
                                <div className='card-body'>
                                    <div className='dashboard-box text-center'>
                                        <h3>Total Post</h3>
                                        <span>{data.Post}</span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-6'>
                            <div className='card shadow border-0'>
                                <div className='card-body'>
                                    <div className='dashboard-box text-center'>
                                        <h3>Total Category</h3>
                                        <span>{data.Category}</span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-6'>
                            <div className='card shadow border-0'>
                                <div className='card-body'>
                                    <div className='dashboard-box text-center'>
                                        <h3>Total Tag</h3>
                                        <span>{data.Tag}</span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-6'>
                            <div className='card shadow border-0'>
                                <div className='card-body'>
                                    <div className='dashboard-box text-center'>
                                        <h3>Total Comment</h3>
                                        <span>{data.Comment}</span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </AdminLayout>
    );
};

export default page;