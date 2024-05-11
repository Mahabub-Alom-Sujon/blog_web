import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PrismaClient } from "@prisma/client";
import moment from "moment/moment";
async function getData() {
    const prisma = new PrismaClient();
    let Sports = await prisma.posts.findMany({
        where: { type: "Sports" },
        select: {
            id: true,
            title:true,
            img1: true,
            img2: true,
            img3: true,
            img4: true,
            createdAt: true,
            // categories: {
            //     select: {
            //         id: true,
            //         name:true
            //     }
            // }
        }
        // include: {
        //     categories: {
        //         select: {
        //             id: true,
        //             name:true,
        //         }
        //     }
        // }
    });
    let Tech = await prisma.posts.findMany({
        where: { type: "Tech" },
        select: {
            id: true,
            title:true,
            img1: true,
            img2: true,
            img3: true,
            img4: true,
            createdAt: true,
            // categories: {
            //     select: {
            //         id: true,
            //         name:true
            //     }
            // }
        }
    });
  return {Sports,Tech};
}
const Sports = async () => {
     const data = await getData();
    return (
        <section id='sports'>
            <div className='container g-0'>
                <div className='row'>
                    <div className='col-lg-6 col-md-6'>
                        <div className='section-title'>
                            <h4>Sports</h4>
                        </div>
                        {
                            data["Sports"].slice(0,3).map((item, i) => {
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
                                                    <Link href={`/details?id=${item['id']}`}>{item["title"].slice(0,45)}</Link>
                                                </h3>
                                                <p>{moment(item.createdAt).format('LL')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className='col-lg-6 col-md-6'>
                        <div className='section-title'>
                            <h4>Tech</h4>
                        </div>
                        {
                            data["Tech"].slice(0,3).map((item, i) => {
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
                                                    <Link href={`/details?id=${item['id']}`}>{item["title"].slice(0,43)}</Link>
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
        </section>
    );
};

export default Sports;