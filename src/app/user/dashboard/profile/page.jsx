import UserLayout from '@/components/master/User-Layout';
import ProfileUpdate from '@/components/user/ProfileUpdate';
import React from 'react';
import { cookies } from 'next/headers'
async function getData(cookies) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Profile= (await (await fetch(`${process.env.HOST}/api/userdashboard/profile`,option)).json())['data']

    return{Profile:Profile}
}
const page = async () => {
    const cookieStore = cookies()
    const data=await getData(cookieStore);
    return (

        <UserLayout data={data["Profile"]}>
            <ProfileUpdate data={data["Profile"] } />
        </UserLayout>
    );
};

export default page;