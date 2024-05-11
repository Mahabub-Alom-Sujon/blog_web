import PostList from '@/components/dashboard/Posts/PostList';
import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import { cookies } from 'next/headers'
async function getData(cookies,pageNo,perPage,searchKey) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
    let Post = (await (await fetch(`${process.env.HOST}/api/dashboard/post?pageNo=${pageNo}&perPage=${perPage}&searchKey=${searchKey}`, option)).json())['data']
    return { Profile,Post }
}
const page = async ({searchParams}) => {
    const cookieStore = cookies();
    let pageNo = searchParams.pageNo;
    let perPage = searchParams.perPage;
    let searchKey = searchParams.searchKey;
    const data=await getData(cookieStore,pageNo,perPage,searchKey);
    return (
        <div>
            <AdminLayout data={data['Profile']}>
                <PostList data={data['Post'] }/>
            </AdminLayout>
        </div>
    );
};

export default page;