import PlainLayout from '@/components/master/Plain-Layout';
import Latest from '@/components/news/Latest';
import Tags from '@/components/news/Tags';
import { PrismaClient } from "@prisma/client";
import React from 'react';
import NewsList from '@/components/news/NewsList';
async function getData(keyword){
    let search = (await (await fetch(`${process.env.HOST}/api/search?keyword=${keyword}`)).json())['data']
    const prisma = new PrismaClient();
    let Latest = await prisma.posts.findMany({
        where: { type: "Latest" },
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
    return {search,Latest}
}
const page = async ({searchParams}) => {
    let keyword=searchParams['keyword'];
    const data=await getData(keyword);
    return (
        <div>
            <PlainLayout>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <NewsList data={data["search"]} />
                        </div>
                        <div className='col-lg-4'>
                            <Latest data={data['Latest']} />
                            <Tags/>
                        </div>
                    </div>
                </div>
            </PlainLayout>
        </div>
    );
};

export default page;