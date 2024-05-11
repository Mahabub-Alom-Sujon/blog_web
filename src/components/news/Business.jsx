"use client"
import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moment from "moment/moment";
const Business = (props) => {
    return (
        <section id='popular bg-secondary-subtle'>
            <div className='container g-0'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='most-popular-news'>
                            <div className='section-title'>
                                <h4>Business</h4>
                            </div>
                            <div className='row'>
                                {
                                    props.data["Business"].slice(0,4).map((item, i) => {
                                        return(<div className='col-lg-6 col-md-6' key={i}>
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
                                        )
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

export default Business;