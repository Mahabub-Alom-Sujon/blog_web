import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import { cookies } from 'next/headers'
import TagList from '@/components/dashboard/Tags/TagList';
async function getData(cookies,pageNo,perPage,searchKey) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
    let Tag = (await (await fetch(`${process.env.HOST}/api/dashboard/tags?pageNo=${pageNo}&perPage=${perPage}&searchKey=${searchKey}`, option)).json())['data']
    return{Profile,Tag}
}
const page = async ({searchParams}) => {
    const cookieStore = cookies()
    let pageNo = searchParams.pageNo;
    let perPage = searchParams.perPage;
    let searchKey = searchParams.searchKey;
    const data = await getData(cookieStore,pageNo,perPage,searchKey);
    return (
        <AdminLayout data={data["Profile"]}>
            <TagList data={data['Tag']} />
        </AdminLayout>
    );
};

export default page;