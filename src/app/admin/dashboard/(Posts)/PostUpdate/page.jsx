import AdminLayout from '@/components/master/Admin-Layout';
import PostUpdate from '@/components/dashboard/Posts/PostUpdate'
import React from 'react';
import { cookies } from 'next/headers'
import { PrismaClient } from "@prisma/client";
async function getData(cookies,id) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
    let Post = (await (await fetch(`${process.env.HOST}/api/dashboard/post?id=${id}`, { method: "PUT", headers: { 'Cookie': cookies }, cache: "no-cache" })).json())['data']
    const prisma = new PrismaClient();
    let Category = await prisma.categories.findMany({
        select: {
            id: true,
            name: true,
        },
        orderBy: { id:"asc"}
    })
    let Tag = await prisma.tags.findMany({
        select: {
            id: true,
            name: true,
        },
        orderBy: { id:"asc"}
    })
    
    return{Profile,Post,Category,Tag}
}
const page = async (props) => {
    const cookieStore = cookies()
    let id=props.searchParams['id']
    const data=await getData(cookieStore,id);
    return (
        <AdminLayout data={data['Profile']}>
            <PostUpdate id={id}  data={data['Post']} Category={data["Category"]} Tag={data['Tag']}/>
        </AdminLayout>
    );
};

export default page;