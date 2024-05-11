"use client"
import React, {useState} from 'react';
import { Carousel } from "react-bootstrap";
import Link from "next/link";
import Image from 'next/image';
import moment from "moment/moment";
const Hero = (props) => {
    const [index,setIndex]=useState(0)
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }
    return (
        <section id='hero-area'>
            <div className='container g-0'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='single-main-news'>
                            <Carousel activeIndex={index} onSelect={handleSelect} controls={true}>
                                {
                                    props.data["Slider"].slice(0,2).map((item,i)=>{
                                        return (
                                            <Carousel.Item key={i}>
                                                <Link  href={`/details?id=${item['id']}`}>
                                                    {/* <img alt="img" className="w-100" src={item['img1']}  /> */}
                                                    <Image
                                                        src={item["img1"]}
                                                        alt='hreo img'
                                                        width={800}
                                                        height={800}
                                                        layout='responsive'
                                                        priority
                                            
                                                    />
                                                    <Carousel.Caption className="caption" >
                                                        <h4>{item['title']}</h4>
                                                        <p>{item['short_des']}</p>
                                                    </Carousel.Caption>
                                                </Link>
                                            </Carousel.Item>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='hero-area-right'>
                            {
                                props.data['Slider'].slice(2,6).map((item, i) => {
                                    return (
                                        <div key={i} className='card shadow border-0 mb-3'>
                                            <div className='single-main-news-box d-inline-block'>
                                                <div className='thumb'>
                                                    <Link href={`/details?id=${item['id']}`}>
                                                        <Image
                                                            src={item["img1"]}
                                                            alt='hreo img'
                                                            width={150}
                                                            height={150}
                                                            layout='responsive'
                                                            priority
                                            
                                                        />
                                                    </Link>
                                                </div>
                                                <div className='news-content'>
                                                    <span>{item.categories.name}</span>
                                                    <h4>
                                                        <Link href={`/details?id=${item['id']}`}>{item['title'].slice(0,60)}</Link>
                                                    </h4>
                                                    <p className='mb-0'>{moment(item.createdAt).format('LL') }</p>
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
        </section>
    );
};

export default Hero;
