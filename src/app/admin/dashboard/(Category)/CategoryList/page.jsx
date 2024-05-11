//export const revalidate = 0; 
import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import { cookies } from 'next/headers'
import CategoryList from '@/components/dashboard/Category/CategoryList';
async function getData(cookies,pageNo,perPage,searchKey) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
    let Category = (await (await fetch(`${process.env.HOST}/api/dashboard/categories?pageNo=${pageNo}&perPage=${perPage}&searchKey=${searchKey}`, option)).json())['data']
    return { Profile,Category }
}
const page = async ({searchParams}) => {
    const cookieStore = cookies();
    let pageNo = searchParams.pageNo;
    let perPage = searchParams.perPage;
    let searchKey = searchParams.searchKey;
    const data=await getData(cookieStore,pageNo,perPage,searchKey);
    return (
        <AdminLayout data={data['Profile']}>
            <CategoryList data={data['Category'] } />
        </AdminLayout>
    );
};

export default page;