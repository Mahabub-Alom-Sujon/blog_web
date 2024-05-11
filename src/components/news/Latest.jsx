import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Subscribe from '@/components/news/Subscribe';
import moment from "moment/moment";
const Latest = async (props) => {
    return (
        <div className='container g-0'>
            <div className='row'>
                <div className='col-lg-12 col-md-6 col-sm-12'>
                    {/* {JSON.stringify(props.data)} */}
                    <div className='latest-news'>
                        <div className='section-title'>
                            <h4>Latest</h4>
                        </div>
                        {
                            props.data.slice(0,6).map((item, i) => {
                                return<article className='item card shadow d-inline-block border-0' key={i}>
                                    <div className='thumb'>
                                        <Link href={`/details?id=${item['id']}`}>
                                            <Image
                                                src={item["img4"]}
                                                alt='imge'
                                                width={100}
                                                height={110}
                                                layout='responsive'
                                                priority
                                            />
                                        </Link>
                                    </div>
                                    <div className='info p-2'>
                                        <h4>
                                            <Link href={`/details?id=${item['id']}`}>{item['title'].slice(0,50)}</Link>
                                        </h4>
                                        <span>{moment(item.createdAt).format('LL')}</span>
                                    </div>
                                </article>
                            })
                        }
                    </div>
                </div>
                <div className='col-lg-12 col-md-6'>
                    <div className='sub-com'>
                        <h2 className='text-center'>Subscribe</h2>
                        <p className='text-center pb-2'>Subscribe to get the new updates!</p>
                        <Subscribe/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Latest;
