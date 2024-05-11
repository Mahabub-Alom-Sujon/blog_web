import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import { cookies } from 'next/headers'
import CommentList from '@/components/dashboard/Comment/CommentList';
async function getData(cookies,pageNo,perPage,searchKey) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
    let Comment = (await (await fetch(`${process.env.HOST}/api/dashboard/comment?pageNo=${pageNo}&perPage=${perPage}&searchKey=${searchKey}`, option)).json())['data']
    return{Profile,Comment}
}
const page = async ({searchParams}) => {
    const cookieStore = cookies()
    let pageNo = searchParams.pageNo;
    let perPage = searchParams.perPage;
    let searchKey = searchParams.searchKey;
    const data=await getData(cookieStore,pageNo,perPage,searchKey);
    return (
        <AdminLayout data={data['Profile']}>
            <CommentList data={data['Comment'] } />
        </AdminLayout>
    );
};

export default page;