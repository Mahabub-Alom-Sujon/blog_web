import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import { cookies } from 'next/headers'
import ProfileUpdate from '@/components/dashboard/Profile/ProfileUpdate';
async function getData(cookies) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Profile= (await (await fetch(`${process.env.HOST}/api/dashboard/profile`,option)).json())['data']

    return{Profile:Profile}
}
const page = async () => {
    const cookieStore = cookies()
    const data=await getData(cookieStore);
    return (
        <AdminLayout data={data["Profile"] }>
            <ProfileUpdate data={data['Profile'] } />
        </AdminLayout>
    );
};
export default page;