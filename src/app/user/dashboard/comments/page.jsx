import UserLayout from '@/components/master/User-Layout';
import CommentsList from '@/components/user/CommentsList';
import { cookies } from 'next/headers'
import React from 'react';

async function getData(cookies,pageNo,perPage,searchKey) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Comments = (await (await fetch(`${process.env.HOST}/api/userdashboard/comment?pageNo=${pageNo}&perPage=${perPage}&searchKey=${searchKey}`, option)).json())["data"]
    let Profile= (await (await fetch(`${process.env.HOST}/api/userdashboard/profile`,option)).json())['data']

    return{Comments,Profile}
}
const page = async ({ searchParams }) => {
    let pageNo = searchParams.pageNo
    let perPage =searchParams.perPage
    let searchKey=searchParams.searchKey
    const cookieStore = cookies()
    const data = await getData( cookieStore,pageNo,perPage,searchKey);
    return (
        <UserLayout data={data["Profile"]}>
            <CommentsList data={data["Comments"]} />
        </UserLayout>
    );
};

export default page;