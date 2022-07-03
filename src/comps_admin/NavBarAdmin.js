import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FiLogOut } from "react-icons/fi";

import { SidebarDataAdmin } from './SidebarDataAdmin';


function NavBarAdmin() {
    const [sidebar, setSidebar] = useState(false);

    let nav = useNavigate()

    const onLogOutClick = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            nav("/admin/logout");
        }
    }

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <React.Fragment>
            <IconContext.Provider value={{ color: 'red' }}>

                <div className='navbar d-lg-none'>
                    <button className='menu-bars btn ' >
                        <FaBars className='text-white' onClick={showSidebar} />
                    </button>
                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        {SidebarDataAdmin.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                        <li className='float-start ms-4 mt-4'>
                            {localStorage["tok"] ?
                                <button onClick={onLogOutClick} className='btn text-white  bg-danger  '>Log out < FiLogOut className='text-white' /></button> : ""}
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </React.Fragment>
    )
}

export default NavBarAdmin;