export const revalidate = 0;
import React from 'react';
import AppNavBar from './AppNavBar';
import Footer from './Footer';
import {Toaster} from "react-hot-toast";
import { PrismaClient } from "@prisma/client";
async function getData() {
    const prisma = new PrismaClient();
    let categories = await prisma.categories.findMany({
        select:{id:true,name:true},
        orderBy: { id: "asc"}
    });
    let socials = await prisma.socials.findMany({
        select:{facebook:true,twitter:true,youtube:true,linkedin:true}
    });
    let recent = await prisma.posts.findMany({
        where:{type:"Recent"},
        select: {
            id: true,
            title:true,
            img1: true,
            img2: true,
            img3: true,
            img4: true,
            createdAt: true,
        }
    });
    //  let categories=(await (await fetch(`${process.env.HOST}/api/category`,{cache:"no-cache"})).json())['data']
    return {categories,socials,recent };
}

const PlainLayout = async (props) => {
    const data = await getData();
    //console.log(data)
    return (
        <>

            <AppNavBar data={data} />
                {props.children} 
                <Toaster position="top-center"/>
            <Footer data={data} />
        </>
    );
};

export default PlainLayout;
