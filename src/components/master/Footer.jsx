import Link from 'next/link';
import React from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Subscribe from '../news/Subscribe';
import Image from 'next/image';
import moment from "moment/moment";
const Footer = (props) => {
    const recent = props.data["recent"];
    const slicedData = recent.slice(0, 3);
    return (
        <section id='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-3 col-md-6'>
                        <div className='single-footer-widget'>
                            <Link href="/">
                                <img className='logo' src='/images/logo-3.png' alt=''/>
                            </Link>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                             <ul className='nav'>
                                    <li className='nav-item mb-0'>
                                    <Link href={props.data['socials'][0]['facebook']} target="_blank">
                                            <i><FaFacebookF /></i>
                                        </Link>
                                    </li>
                                    <li className='nav-item mb-0'>
                                        <Link href={props.data['socials'][0]['youtube']} target="_blank">
                                            <i><FaYoutube/></i>
                                        </Link>
                                    </li>
                                    <li className='nav-item mb-0'>
                                        <Link href={props.data['socials'][0]['linkedin']} target="_blank">
                                            <i><FaLinkedinIn /></i>
                                        </Link>
                                    </li>
                                    <li className='nav-item mb-0'>
                                    <Link href={props.data['socials'][0]['twitter']} target="_blank">
                                            <i><FaTwitter /></i>
                                        </Link>
                                    </li>
                                </ul>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12'>
                        <div class="single-footer-widget">
                            <h2>Recent post</h2>
                            <div class="post-content">
                                {
                                    slicedData.map((item, i) => {
                                        return<div className='row align-items-center mb-3' key={i}>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="post-image">
                                                    <Link href={`/details?id=${item['id']}`}>
                                                        <Image
                                                            src={item["img4"]}
                                                            alt='imge'
                                                            width={500}
                                                            height={500}
                                                            layout='responsive'
                                                            priority
                                                        />
                                                        {/* <img src={item.img4} alt="image"/> */}
                                                    </Link> 
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-sm-9">
                                                <h4>
                                                    <Link href={`/details?id=${item['id']}`}>{item["title"]}</Link>
                                                </h4>
                                                <span>{moment(item.createdAt).format('LL')}</span>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>

                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6'>
                        <div className='single-footer-widget'>
                            <h2>Recommended</h2>
                            <ul>
                                {
                                    props.data['categories'].map((Item,i)=>{
                                        return (

                                            <li key={i} >
                                                <Link href={"/category?id="+Item['id']} >{Item['name']}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6'>
                        <div className='single-footer-widget mb-0'>
                            <h2>Subscribe</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <Subscribe/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;