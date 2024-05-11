import AdminLayout from '@/components/master/Admin-Layout';
import SubscriberList from '@/components/dashboard/Subscriber/SubscriberList';
import React from 'react';
import { cookies } from 'next/headers'
async function getData(cookies,pageNo,perPage,searchKey) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
    let Subscriber = (await (await fetch(`${process.env.HOST}/api/dashboard/subscribers?pageNo=${pageNo}&perPage=${perPage}&searchKey=${searchKey}`, option)).json())['data']
    return{Profile,Subscriber}
}
const page = async ({searchParams}) => {
    const cookieStore = cookies()
    let pageNo = searchParams.pageNo;
    let perPage = searchParams.perPage;
    let searchKey = searchParams.searchKey;
    const data=await getData(cookieStore,pageNo,perPage,searchKey);
    return (
        <AdminLayout data={data['Profile']}>
            <SubscriberList data={data['Subscriber'] } />
        </AdminLayout>
    );
};

export default page;