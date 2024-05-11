"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { BiLogoFacebook } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import {Nav, Navbar} from "react-bootstrap";
//import { IsEmpty } from '@/utility/FormHelper';
const AppNavBar = (props) => {
    const router = useRouter()
    let [searchKey,SetSearchKey]=useState("0");
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const decodedToken = decodeToken(token);
            setLoggedIn(true);
            setIsAdmin(decodedToken.role === 'admin');
        } else {
            setLoggedIn(false);
            setIsAdmin(false);
        }
    }, []);

    const decodeToken = (token) => {
        return JSON.parse(atob(token.split('.')[1]));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKey.trim() !== '0') {
            router.push(`/search?keyword=${searchKey}`)
        } else {
            toast.error("Please enter a search keyword.")

        }
    };

    return (
        <section>
            <div className='top-header-area'>
                <div className='container g-0'>
                    <div className='row align-items-center'>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                            <ul className='top-header-social'>
                                <li>
                                    <Link href={props.data["socials"][0]["facebook"]}>
                                        <BiLogoFacebook className='social-link' />
                                    </Link>
                                </li>
                                <li>
                                    <Link href={props.data["socials"][0]["youtube"]}>
                                        <FaYoutube className='social-link' />
                                    </Link>
                                </li>
                                <li>
                                    <Link href={props.data["socials"][0]["twitter"]}>
                                        <BiLogoLinkedin className='social-link' />
                                    </Link>
                                </li>
                                <li>
                                    <Link href={props.data["socials"][0]["linkedin"]}>
                                        <BsTwitter className='social-link' />
                                    </Link>
                                </li>
                           </ul>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                            <div className='top-header-right d-flex'>
                                <ul className='ms-auto'>
                                    <li>
                                    {loggedIn && (
                                            isAdmin ? (
                                                <Link href="/admin/dashboard">Dashboard <MdDashboard /></Link>
                                            ) : (
                                                <Link href="/user/dashboard">Dashboard <MdDashboard/></Link>
                                            )
                                        )}
                                        {!loggedIn && <Link href="/user/login">Login</Link>}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main-navbar'>
                <Navbar expand="lg">
                    <div className='container g-0'>
                        <div className='navbar-brand'>
                            <Link className="navbar-brand me-0" href="/">
                                <Image
                                    src="/images/logo-1.png"
                                    alt='logo'
                                    width={142}
                                    height={32}
                                    layout='responsive'
                                    priority
                                
                                />
                            </Link>
                        </div>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className='ms-auto'>
                                <ul className="navbar-nav mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link"   href={"/"}>Home</Link>
                                    </li>
                                    {
                                        props.data['categories'].slice(0,7).map((Item,i)=>{
                                            return (
                                                <li key={i} className='nav-item'>
                                                    <Link className="nav-link" href={`/category?id=${Item?.id}`}>{Item['name']}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <form className="d-flex align-items-center position-relative ms-3" role="search">
                                    <input onChange={(e)=>{SetSearchKey(e.target.value)}} className="form-control" type="search" placeholder="Search for.." aria-label="Search" />
                                    <button className='search' onClick={handleSearch} type='submit'>
                                        <i><IoIosSearch /></i>
                                    </button>
                                </form>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
                
            </div>
            
        </section>
    );
};

export default AppNavBar;