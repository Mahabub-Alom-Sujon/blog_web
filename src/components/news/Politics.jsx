import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PrismaClient } from "@prisma/client";
import moment from "moment/moment";
async function getData() {
    const prisma = new PrismaClient();
    let Politics = await prisma.posts.findMany({
        where: { type: "Politics" },
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
    
  return {Politics};
}
const Politics = async () => {
    const data = await getData();
    return (
        <section id='Politics'>
            <div className='container g-0'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='section-title'>
                            <h4>Politics</h4>
                        </div>
                        <div className='row'>
                            <div className='col-lg-6 col-md-6'>
                                {
                                    data.Politics.slice(0,1).map((item, i) => {
                                        return<div key={i}>
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
                                                <div className='popular-news-content p-3'>
                                                    <span>{item.categories.name}</span>
                                                    <h3>
                                                        <Link href={`/details?id=${item['id']}`}>{item.title.slice(0,100) }</Link>
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
                            <div className='col-lg-6 col-md-6'>
                                {
                                    data["Politics"].slice(1,4).map((item, i) => {
                                        return<div className='politics-news-post card shadow border-0' key={i}>
                                            <div className='row align-items-center'>
                                                <div className='col-lg-4 col-sm-4'>
                                                    <div className='politics-news-image'>
                                                            <Link href={`/details?id=${item['id']}`}>
                                                                <Image
                                                                    src={item["img4"]}
                                                                    alt='imge'
                                                                    width={500}
                                                                    height={500}
                                                                    layout='responsive'
                                                                    priority
                                                                />
                                                                {/* <img src={item['img4']} /> */}
                                                            </Link>
                                                    </div>
                                                </div>
                                                <div className='col-lg-8 col-sm-8'>
                                                    <div className='politics-news-content'>
                                                        <h3>
                                                            <Link href={`/details?id=${item['id']}`}>{item["title"].slice(0,45)}.....</Link>
                                                        </h3>
                                                        <p>{moment(item.createdAt).format('LL')}</p>
                                                    </div>
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

export default Politics;