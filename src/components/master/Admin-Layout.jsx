"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { useRef } from 'react';
import { FaHouseChimney } from "react-icons/fa6";
import { Toaster } from "react-hot-toast";
import { RiDashboardLine } from "react-icons/ri";
import { BsCircle } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { AiOutlineBars, AiOutlineLogout, AiOutlineMail } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Navbar } from "react-bootstrap";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Change import statement
import UserDropDown from './UserDropDown';
const AdminLayout = (props) => {
    const router = useRouter();
    let current = usePathname();
    let currentPath=usePathname();
    let contentRef, sideNavRef = useRef();
    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;
        if (sideNav.classList.contains("side-nav-open")) {
        sideNav.classList.add("side-nav-close");
        sideNav.classList.remove("side-nav-open");
        content.classList.add("content-expand");
        content.classList.remove("content");
        } else {
        sideNav.classList.remove("side-nav-close");
        sideNav.classList.add("side-nav-open");
        content.classList.remove("content-expand");
        content.classList.add("content");
        }
    };
    let title="HOME";
    if(currentPath==="/"){
        title="HOME";
    }
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/'
    }
    return (
        <>
            {/* {JSON.stringify(props.data)} */}
            <div ref={(div) => { sideNavRef = div }} className='side-nav-open'>
                <div>
                    <Link href="/">
                        <img className='side-nav-logo sticky-top' srcSet='/images/logo-3.png' />
                    </Link>
                        
                     
                </div>
                <Link className={current === "/admin/dashboard" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href="/admin/dashboard" >
                    <RiDashboardLine className='side-bar-item-icon' />
                    <span className="mx-2 side-bar-item-caption">Dashboard</span>
                </Link>
                <Link className={current === "/admin/dashboard/CategoryList" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href={`/admin/dashboard/CategoryList?pageNo=1&perPage=10&searchKey=0`} >
                    <BsCircle className='side-bar-item-icon' />
                    <span className="mx-2 side-bar-item-caption">Category List</span>
                </Link>
                <Link className={current === "/admin/dashboard/TagList" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href={`/admin/dashboard/TagList?pageNo=1&perPage=10&searchKey=0`} >
                    <BsCircle className='side-bar-item-icon' />
                    <span className="mx-2 side-bar-item-caption">Tags List</span>
                </Link>
                <Link className={current === "/admin/dashboard/PostList" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href={`/admin/dashboard/PostList?pageNo=1&perPage=10&searchKey=0`} >
                    <BsCircle className='side-bar-item-icon' />
                    <span className="mx-2 side-bar-item-caption">Post List</span>
                </Link>
                <Link className={current === "/admin/dashboard/Comment" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href={`/admin/dashboard/Comment?pageNo=1&perPage=10&searchKey=0`} >
                    <BiComment className='side-bar-item-icon' />
                    <span className="mx-2 side-bar-item-caption">Comment List</span>
                </Link>
                <Link className={current === "/admin/dashboard/Subscriber" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href={`/admin/dashboard/Subscriber?pageNo=1&perPage=10&searchKey=0`} >
                    <AiOutlineMail className='side-bar-item-icon' />
                    <span className="mx-2 side-bar-item-caption">Subscriber List</span>
                </Link>
                <Link className={current === "/admin/dashboard/SocialList" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href={`/admin/dashboard/SocialList?pageNo=1&perPage=10&searchKey=0`} >
                    <BsCircle className='side-bar-item-icon' />
                    <span className="mx-2 side-bar-item-caption">Social List</span>
                </Link>
                <Link className={current === "/admin/dashboard/PoliciesList" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href={`/admin/dashboard/PoliciesList?pageNo=1&perPage=10&searchKey=0`} >
                    <BsCircle className='side-bar-item-icon' />
                    <span className="mx-2 side-bar-item-caption">Policies List</span>
                </Link>
                {/* <Link className={current === "/admin/dashboard/Profile" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href="/admin/dashboard/Profile" >
                    <CgProfile className='side-bar-item-icon' />
                    <span className="mx-2 side-bar-item-caption">Profile</span>
                </Link>
                <Link onClick={handleLogout} className={current === "/" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href="/" >
                    <AiOutlineLogout className='side-bar-item-icon'/>
                    <span className="mx-2 side-bar-item-caption">Logout</span>
                </Link> */}
            </div>
            <div ref={(div) => contentRef = div} className='content'>
                <Navbar className="px-0 shadow-sm sticky-top bg-white z-3">
                    <div className="container-fluid">
                        <Navbar.Brand >
                            <span className="icon-nav m-0 h5" onClick={MenuBarClickHandler}>
                                <AiOutlineBars className='icon' />
                            </span>
                            <Link href="/" >
                                <span className="mx-2 f-16">{title}</span>
                            </Link>
                           
                        </Navbar.Brand>
                        {/* <UserDropDown/> */}
                        <div className='user-dashboard'>
                            {/* <Link href="/user/dashboard/profile">
                                <img className="img"  src={props.data["photo"] } />
                            </Link> */}
                             <div className="user-dropdown">
                                <img className="icon-nav-img icon-nav" src={props.data['photo']} alt=""/>
                                <div className="user-dropdown-content ">
                                    <div className="mt-4 text-center">
                                        <img className="icon-nav-img me-0" src={props.data['photo']} alt=""/>
                                        <div className="user-dropdown-divider mt-4"></div>
                                    </div>
                                    <Link href="/admin/dashboard/Profile" className="side-bar-item">
                                        <span className="side-bar-item-caption">Profile</span>
                                    </Link>
                                    <Link href="/" className="side-bar-item" onClick={handleLogout}>
                                        <span className="side-bar-item-caption">Logout</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Navbar>

                <div className="p-3">{props.children}</div>
                <Toaster position="top-center"/>
            </div>
        </>
    );
};

export default AdminLayout;