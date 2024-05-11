import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import TagCreate  from '@/components/dashboard/Tags/TagCreate';
import { cookies } from 'next/headers'
async function getData(cookies) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
    return{Profile,}
}
const page = async () => {
    const cookieStore = cookies()
    const data=await getData(cookieStore);
    return (
        <AdminLayout data={data['Profile']}>
            <TagCreate/>
        </AdminLayout>
    );
};

export default page;