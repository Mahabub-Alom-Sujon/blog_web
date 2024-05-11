import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import { cookies } from 'next/headers'
import PoliciesList from '@/components/dashboard/Policies/PoliciesList';
async function getData(cookies,pageNo,perPage,searchKey) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
    let Policies = (await (await fetch(`${process.env.HOST}/api/dashboard/policies?pageNo=${pageNo}&perPage=${perPage}&searchKey=${searchKey}`, option)).json())['data']
    return { Profile,Policies}
}
const page = async ({searchParams}) => {
    const cookieStore = cookies();
    let pageNo = searchParams.pageNo;
    let perPage = searchParams.perPage;
    let searchKey = searchParams.searchKey;
    const data=await getData(cookieStore,pageNo,perPage,searchKey);
    return (
        <AdminLayout data={data['Profile']}>
            <PoliciesList data={data['Policies']}/>
        </AdminLayout>
    );
};

export default page;