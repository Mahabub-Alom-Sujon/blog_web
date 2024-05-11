"use client"
import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import moment from "moment/moment";
const TagList = (props) => {
    const [showAll, setShowAll] = useState(false);
    const visibleData = showAll ? props.data: props.data.slice(0,6)
    return (
        <section id='searchList'>
            <div className='continer g-0'>
                <div className='row'>
                    {/* {JSON.stringify(props.data.result[0].categories.name)} */}
                    {
                            visibleData.map((item, i) => {
                                return<div className='col-lg-6 col-md-6 col-sm-12' key={i}>
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
                                            <span>{item.tags.name}</span>
                                            <h3>
                                                <Link href={`/details?id=${item['id']}`}>{item.title.slice(0,100) }</Link>
                                            </h3>
                                            <p>
                                                <Link href={`/details?id=${item['id']}`}>{item.tags.name }</Link> / {moment(item.createdAt).format('LL')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            })
                    }
                     <div className='col-lg-12 d-flex justify-content-center my-4'>
                    {!showAll ? (
                            <button className='search-btn' onClick={() => setShowAll(true)}>Load More</button>
                        ) : (
                            <button className='search-btn' onClick={() => setShowAll(false)}>Hide More</button>
                    )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TagList;