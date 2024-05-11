"use client"
import Link from "next/link";
import Cookies from 'js-cookie';
const UserDropDown = () => {
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/'
    }

    return (
            <div className="float-right mx-3 h-auto d-flex">
                <div className="user-dropdown">
                    <img className="icon-nav-img icon-nav" src="/images/profile.png" alt=""/>
                    <div className="user-dropdown-content ">
                        <div className="mt-4 text-center">
                            <img className="icon-nav-img" src="/images/profile.png" alt=""/>
                            <hr className="user-dropdown-divider  p-0"/>
                        </div>
                        <Link href="/profile" className="side-bar-item">
                            <span className="side-bar-item-caption">Profile</span>
                        </Link>
                        <Link href="/comments" className="side-bar-item">
                            <span className="side-bar-item-caption">Comments</span>
                        </Link>
                        <Link href="/" className="side-bar-item" onClick={handleLogout}>
                            <span className="side-bar-item-caption">Logout</span>
                        </Link>
                    </div>
            
                </div>
            </div>

    );
};

export default UserDropDown;