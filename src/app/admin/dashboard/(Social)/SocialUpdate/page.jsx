import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import { cookies } from 'next/headers'
import SocialUpdate from '@/components/dashboard/Social/SocialUpdate';
async function getData(cookies,id) {
    let option = { method: "GET", headers: { 'Cookie': cookies }, cache: "no-cache" }
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
    let Social  = (await (await fetch(`${process.env.HOST}/api/dashboard/social?id=${id}`,{method:"PUT",headers:{'Cookie':cookies},cache:"no-cache"})).json())['data']
    return{Profile,Social}
}
const page = async (props) => {
     const cookieStore = cookies()
    let id=props.searchParams['id']
    const data=await getData(cookieStore,id);
    return (
        <AdminLayout data={data['Profile']}>
            <SocialUpdate id={id} data={data['Social']} />
        </AdminLayout>
    );
};

export default page;