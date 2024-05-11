"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { useRef } from 'react';
import { FaHouseChimney } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { Toaster } from "react-hot-toast";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineBars, AiOutlineLogout } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { Navbar } from "react-bootstrap";
import Cookies from 'js-cookie';
const UserLayout = (props) => {
    let [searchKey, SetSearchKey] = useState("0");
    let [pageNo, SetpageNo] = useState(1);
    let [perPage, SetperPage]= useState(5);
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
            <div ref={(div) =>{sideNavRef=div}} className='side-nav-open'>
                <Link href="/">
                    <img className='side-nav-logo' srcSet='/images/logo-3.png' />
                </Link>
                <Link className={current === "/" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href="/" >
                    <FaHouseChimney className='side-bar-item-icon' />
                    <span className="mx-2 side-bar-item-caption">Home</span>
                </Link>
                <Link className={current === "/user/dashboard" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href="/user/dashboard" >
                    <RiDashboardLine className='side-bar-item-icon' />
                    <span className="mx-2 side-bar-item-caption">Dashboard</span>
                </Link>
                <Link className={current === "/user/dashboard/profile" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href="/user/dashboard/profile" >
                    <CgProfile  className='side-bar-item-icon'/>
                    <span className="mx-2 side-bar-item-caption">Profile</span>
                </Link>
                <Link className={current === "/user/dashboard/comments" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href={`/user/dashboard/comments?pageNo=${pageNo}&perPage=${perPage}&searchKey=${searchKey}`} >
                    <FaRegCommentAlt className='side-bar-item-icon'/>
                    <span className="mx-2 side-bar-item-caption">Comments</span>
                </Link>
                <Link onClick={handleLogout} className={current === "/" ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} href="/" >
                    <AiOutlineLogout className='side-bar-item-icon'/>
                    <span className="mx-2 side-bar-item-caption">Logout</span>
                </Link>
            </div>
            <div ref={(div) => contentRef = div} className='content'>
                <Navbar className="px-0 shadow-sm sticky-top bg-white z-3">
                    <div className="container-fluid">
                        <Navbar.Brand >
                            <span className="icon-nav m-0 h5" onClick={MenuBarClickHandler}>
                                <AiOutlineBars className='' />
                            </span>
                            <span className="mx-2 f-16">{title}</span>
                        </Navbar.Brand>
                        <div className='user-dashboard'>
                            <Link href="/user/dashboard/profile">
                                <img className="img"  src={props.data["photo"] } />
                            </Link>
                           
                        </div>
                    </div>
                </Navbar>

                <div className="p-3">{props.children}</div>
                <Toaster position="top-center"/>
            </div>
        </>
    );
};

export default UserLayout;