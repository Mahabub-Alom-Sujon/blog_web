"use client"
import React from 'react';
import parse from 'html-react-parser';
import Image from 'next/image';
import { useRouter } from "next/navigation";
const NewsDetails = (props) => {
    const router = useRouter();
    return (
        <section id="details">
           {/* {JSON.stringify(props.data)} */}
            <div className='container g-0'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card shadow border-0'>
                            <div className='p-4'>
                            <h4 className='mb-0'>{props.data['title']}</h4>
                            </div>
                            {/* <img className="w-100" src={props.data['img4']} /> */}
                                <Image
                                        src={props.data["img4"]}
                                        alt='imge'
                                        width={500}
                                        height={500}
                                        layout='responsive'
                                        priority
                                />
                            <div className='p-4'>
                                {parse(props.data['long_des'])}
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsDetails;