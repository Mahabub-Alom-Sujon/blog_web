export const revalidate = 0; 
import AdminLayout from '@/components/master/Admin-Layout';
import React from 'react';
import { cookies } from 'next/headers'
import { PrismaClient } from "@prisma/client";
import PostCreate from '@/components/dashboard/Posts/PostCreate';
async function getData(cookies) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Profile = (await (await fetch(`${process.env.HOST}/api/dashboard/profile`, option)).json())['data']
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
    return{Profile,Category,Tag}
}
const page = async () => {
    const cookieStore = cookies()
    const data=await getData(cookieStore);
    return (
        <AdminLayout data={data['Profile']}>
            <PostCreate Category={data["Category"]} Tag={data['Tag']} />
        </AdminLayout>
    );
};

export default page;