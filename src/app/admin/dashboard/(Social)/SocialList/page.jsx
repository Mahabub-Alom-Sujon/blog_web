import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import { cookies } from 'next/headers'
import SocialList from '@/components/dashboard/Social/SocialList';
async function getData(cookies,pageNo,perPage,searchKey) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
    let Socila = (await (await fetch(`${process.env.HOST}/api/dashboard/social?pageNo=${pageNo}&perPage=${perPage}&searchKey=${searchKey}`, option)).json())['data']
    return { Profile,Socila}
}
const page = async ({searchParams}) => {
    const cookieStore = cookies();
    let pageNo = searchParams.pageNo;
    let perPage = searchParams.perPage;
    let searchKey = searchParams.searchKey;
    const data=await getData(cookieStore,pageNo,perPage,searchKey);
    return (
        <AdminLayout data={data['Profile']}>
            <SocialList data={data['Socila']}/>
        </AdminLayout>
    );
};

export default page;