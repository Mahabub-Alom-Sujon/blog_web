import PlainLayout from '@/components/master/Plain-Layout';
import Latest from '@/components/news/Latest';
import TagList from '@/components/news/TagList';
import Tags from '@/components/news/Tags';
import { PrismaClient } from "@prisma/client";
import React from 'react';
async function getData(id) {
    let tags = (await (await fetch(`${process.env.HOST}/api/tagSingle?id=${id}`)).json())['data']
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
    return {tags,Latest}
}
const page = async ({searchParams}) => {
    let id=searchParams['id']
    const data=await getData(id)
    return (
        <div>
            <PlainLayout>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8 col-md-12'>
                            <TagList id={id} data={data['tags'] } />
                        </div>
                        <div className='col-lg-4 col-md-12'>
                            <Latest data={data['Latest'] } />
                            <Tags/>
                        </div>
                    </div>
                </div>
            </PlainLayout>
        </div>
    );
};

export default page;