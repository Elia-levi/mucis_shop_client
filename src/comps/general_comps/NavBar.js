import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch, BsCart3 } from "react-icons/bs"
import { FaBars } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import { SidebarData } from './SidebarData';

import { API_URL, doApiGet } from '../../services/apiService';
import { checkTokenLocal } from '../../services/localService';
import { AppContext } from "../../context/shopContext"


function NavBar() {
    const { showCart, setShowCart, cart_ar } = useContext(AppContext)

    let [amount, setAmount] = useState(0);
    const [sidebar, setSidebar] = useState(false);
    let [login, setLogin] = useState("");
    let [user, setUser] = useState({})


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
        if (login) {
            doApiUser();
        }
        window.scrollTo(0, 0);
    }, [location, cart_ar, login])

    const onKeyboardClick = (e) => {
        // check if we click Enter 
        if (e.key === "Enter") {
            onSearchClick();
        }
    }

    const doApiUser = async () => {
        let url = API_URL + "/users/myInfo";
        let resp = await doApiGet(url)
        setUser(resp.data)
    }

    const onSearchClick = () => {
        let input_val = inputRef.current.value;
        nav("/productsSearch?s=" + input_val);
    }

    const showSidebar = () => {
        setShowCart("none")
        setSidebar(!sidebar)
    };

    const showCartFunc = () => {
        if (showCart === "none") {
            setShowCart("block");
            setSidebar(false);
        } else {
            setShowCart("none")
        }
    };


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

                            <li className='  ms-1 mt-3 login-navBar d-flex'>
                                {login ?
                                    ""
                                    :
                                    <React.Fragment>
                                        <Link className='btn-info btn-sm text-whit btn-sm text-white me-2 rounded-pill' to="/login">Login </Link>
                                        <Link className='btn-success btn-sm text-whit btn-sm  text-white rounded-pill' to="/signup"> Sign up</Link>
                                    </React.Fragment>
                                }
                            </li>

                            {SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                <div className='d-flex col-10 align-items-center justify-content-end'>
                    <div className='search_header d-flex border  rounded align-items-center '>
                        <input onKeyDown={onKeyboardClick} ref={inputRef} placeholder='search...' type="text" className='form-control' />
                        <button onClick={onSearchClick} className='btn '><BsSearch className='icon1' /></button>
                    </div>

                    <div className='cartOut mx-2  '>
                        <button onClick={showCartFunc} type="button" className="btn" >
                            <BsCart3 className='icon1 ' />
                        </button>
                        <span className=" badge rounded-pill bg-danger cartin">
                            {amount}
                        </span>
                    </div>

                    {
                        (() => {
                            if (!login) {
                                return ("")
                            } else if (login && (!user.img_user || user.img_user === "")) {
                                return (
                                    <Link to="/userInfo" className='text-dark'>< FaUserCircle style={{ fontSize: "2.2em" }} /></Link>
                                )
                            } else {
                                return (
                                    <Link to="/userInfo">
                                        <img src={user.img_user} alt={user.name} className="rounded-circle" style={{ height: "40px", width: "40px" }} />
                                    </Link>
                                )
                            }
                        })()
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default NavBar;

