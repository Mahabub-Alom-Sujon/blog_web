import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PrismaClient } from "@prisma/client";
import moment from "moment/moment";
async function getData() {
    const prisma = new PrismaClient();
    let Popular = await prisma.posts.findMany({
        where: { type: "Popular" },
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
    
  return {Popular};
}
const PopularList = async () => {
    const data = await getData();
    return (
        <section id='popular'>
            <div className='container g-0'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='most-popular-news'>
                            <div className='section-title'>
                                <h4>Most popular</h4>
                            </div>
                            <div className='row'>
                                {
                                    data.Popular.slice(0,4).map((item, i) => {
                                        return<div className='col-lg-6 col-md-6' key={i}>
                                            <div className='single-most-popular-news card shadow'>
                                                <div className='popular-news-image'>
                                                    <Link href={`/details?id=${item['id']}`}>
                                                        <Image
                                                            src={item["img4"]}
                                                            alt='imge'
                                                            width={356}
                                                            height={178}
                                                            layout='responsive'
                                                            priority
                                                        />
                                                        {/* <img src={item['img4']} /> */}
                                                    </Link>
                                                </div>
                                                <div className='popular-news-content p-3 card-body'>
                                                    <span>{item.categories.name}</span>
                                                    <h3>
                                                        <Link href={`/details?id=${item['id']}`}>{item.title}</Link>
                                                    </h3>
                                                    <p>
                                                        <Link href={`/details?id=${item['id']}`}>{item.categories.name }</Link> / {moment(item.createdAt).format('LL')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularList;