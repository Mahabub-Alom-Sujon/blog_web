import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import { cookies } from 'next/headers'
import TagUpdata from '@/components/dashboard/Tags/TagUpdata';
async function getData(cookies,id) {
    let option = { method: "GET", headers: { 'Cookie': cookies }, cache: "no-cache" }
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
     let Tag  = (await (await fetch(`${process.env.HOST}/api/dashboard/tags?id=${id}`,{method:"PUT",headers:{'Cookie':cookies},cache:"no-cache"})).json())['data']
    return{Profile,Tag}
}
const page = async (props) => {
    const cookieStore = cookies()
    let id=props.searchParams['id']
    const data=await getData(cookieStore,id);
    return (
        <AdminLayout data={data['Profile']}>
            <TagUpdata id={id} data={data["Tag"] } />
        </AdminLayout>
    );
};

export default page;