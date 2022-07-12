import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch, BsCart3 } from "react-icons/bs"
import { FaBars } from "react-icons/fa";

import { SidebarData } from './SidebarData';

import { checkTokenLocal } from '../../services/localService';
import { AppContext } from "../../context/shopContext"


function NavBar() {
    const { showCart, setShowCart, cart_ar } = useContext(AppContext)

    let [amount, setAmount] = useState(0);
    const [sidebar, setSidebar] = useState(false);
    let [login, setLogin] = useState("");

    let location = useLocation();
    let inputRef = useRef()
    let nav = useNavigate()


    useEffect(() => {
        // check if login
        setLogin(checkTokenLocal())
        if (cart_ar.length !== 0) {
            let amount = cart_ar.length;
            setAmount(amount)
        } else {
            setAmount(0)
        }
        window.scrollTo(0, 0);
    }, [location, cart_ar])

    const onKeyboardClick = (e) => {
        // check if we click Enter 
        if (e.key === "Enter") {
            onSearchClick();
        }
    }

    const onSearchClick = () => {
        let input_val = inputRef.current.value;
        nav("/productsSearch?s=" + input_val);
    }

    const showSidebar = () => setSidebar(!sidebar);


    return (
        <React.Fragment>
            <div className=' d-lg-none row justify-content-between align-items-center'>
                <div className=' logo col-2 d-flex align-items-center justify-content-start'>
                    <button className='menu-bars-user btn align-items-center' >
                        <FaBars className='text-dark' onClick={showSidebar} />
                    </button>

                    <nav className={sidebar ? 'nav-menu-user active' : 'nav-menu-user'}>
                        <ul className='nav-menu-items-user' onClick={showSidebar}>

                            <h2 ><img src={"/images/Background1.png"} alt="logo" /></h2>

                            {SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}

                            <li className=' float-start ms-4 mt-5 login-navBar d-flex'>
                                {login ?
                                    <Link to="/logout" className='btn-danger btn-sm btn text-white'>Log out</Link>
                                    :
                                    <React.Fragment>
                                        <Link className='btn-info btn-sm text-whit btn-sm text-white me-2' to="/login">Login </Link>
                                        <Link className='btn-success btn-sm text-whit btn-sm  text-white' to="/signup"> Sign up</Link>
                                    </React.Fragment>
                                }
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className='d-flex col-10 align-items-center justify-content-end'>
                    <div className='search_header d-flex border  rounded align-items-center '>
                        <input onKeyDown={onKeyboardClick} ref={inputRef} placeholder='search...' type="text" className='form-control' />
                        <button onClick={onSearchClick} className='btn '><BsSearch className='icon1' /></button>
                    </div>

                    <div className='cartOut ms-3  '>
                        <button onClick={() => { showCart === "none" ? setShowCart("block") : setShowCart("none") }} type="button" className="btn" >
                            <BsCart3 className='icon1 ' />
                        </button>
                        <span className=" badge rounded-pill bg-danger cartin">
                            {amount}
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NavBar;