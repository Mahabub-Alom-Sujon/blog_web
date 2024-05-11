//export const revalidate = 0;
import PlainLayout from '@/components/master/Plain-Layout';
import Hero from '@/components/news/Hero';
import React from 'react';
import { PrismaClient } from "@prisma/client";
import PopularList from '@/components/news/PopularList';
import Latest from '@/components/news/Latest';
import Politics from '@/components/news/Politics';
import Business from '@/components/news/Business';
import Sports from '@/components/news/Sports';
import Tags from '@/components/news/Tags';
async function getData() {
  const prisma = new PrismaClient();
  let Slider = await prisma.posts.findMany({
    where: { type: "Slider" },
    select: {
            id: true,
            title: true,
            short_des:true,
            img1: true,
            img2: true,
            img3: true,
            img4: true,
            createdAt: true,
            categories: {
                select: {
                    id: true,
                    name:true
                }
            }
        }
    // include: {
    //   categories: {
    //     select: {
    //       id: true,
    //       name:true
    //     }
    //   }
    // }
  });
  let Business = await prisma.posts.findMany({
    where: { type: "Business" },
    select: {
            id: true,
            title:true,
            img1: true,
            img2: true,
            img3: true,
            img4: true,
            createdAt: true,
            categories: {
                select: {
                    id: true,
                    name:true
                }
            }
        }
  });
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
  return { Slider,Business,Latest };
  
}

const page = async () => {
  const data = await getData();
  return (
    <>
      <PlainLayout>
        <Hero data={data} />
        <div className='container g-0'>
          <div className='row'>
            <div className='col-lg-8'>
              <PopularList/>
              <Politics/>
              <Business data={data} />
              <Sports/>
            </div>
            <div className='col-lg-4'>
              <Latest data={data['Latest']} />
              <Tags/>
            </div>
          </div>
        </div>
      </PlainLayout>

    </>
  );
};

export default page;