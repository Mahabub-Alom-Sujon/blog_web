import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import { cookies } from 'next/headers'
import PoliciesUpdate from '@/components/dashboard/Policies/PoliciesUpdate';
async function getData(cookies,id) {
    let option = { method: "GET", headers: { 'Cookie': cookies }, cache: "no-cache" }
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
    let Policies  = (await (await fetch(`${process.env.HOST}/api/dashboard/policies?id=${id}`,{method:"PUT",headers:{'Cookie':cookies},cache:"no-cache"})).json())['data']

    return{Profile,Policies}
}
const page = async (props) => {
    const cookieStore = cookies()
     let id=props.searchParams['id']
    const data = await getData(cookieStore,id);
    return (
        <AdminLayout data={data['Profile']}>
            <PoliciesUpdate id={id} data={data['Policies'] } />
        </AdminLayout>
    );
};
export default page;