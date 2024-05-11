import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import { cookies } from 'next/headers'
import CategoryUpdate from '@/components/dashboard/Category/CategoryUpdate';
async function getData(cookies,id) {
    let option = { method: "GET", headers: { 'Cookie': cookies }, cache: "no-cache" }
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
     let Category  = (await (await fetch(`${process.env.HOST}/api/dashboard/categories?id=${id}`,{method:"PUT",headers:{'Cookie':cookies},cache:"no-cache"})).json())['data']
    return{Profile,Category}
}
const page = async (props) => {
    const cookieStore = cookies()
    let id=props.searchParams['id']
    const data=await getData(cookieStore,id);
    return (
        <AdminLayout data={data['Profile']}>
            <CategoryUpdate id={id} data={data['Category'] } />
        </AdminLayout>
    );
};

export default page;