import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { MdOutlineCategory, MdProductionQuantityLimits } from "react-icons/md";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";

import NavBarAdmin from './NavBarAdmin';


function HeaderAdmin(props) {
  window.scrollTo(0, 0);

  let nav = useNavigate()

  const onLogOutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      nav("/admin/logout");
    }
  }

  return (
    <div className='header_admin container-fluid shadow'>
      <div className='container d-flex justify-content-lg-between align-items-center'>
        <NavBarAdmin />
        <Link to="/admin/" ><h2 className='col-auto me-4 logo'> <img src={"/images/Background.png"} alt="logo"  /></h2></Link>

        <nav className='col-md-9 nav-admin '>
          <Link to="/admin/categories" ><BiCategory /> Categories </Link>
          <Link to="/admin/subCategoriesList" ><MdOutlineCategory /> SubCategories </Link>
          <Link to="/admin/products" ><MdProductionQuantityLimits /> Products </Link>
          <Link to="/admin/users" ><FiUsers /> Users </Link>
          <Link style={{ border: "none" }} to="/admin/checkout" > <IoBagCheckOutline /> Orders</Link>
          {/* we cant do nav command to Link comp */}
          {localStorage["tok"] ?
            <button onClick={onLogOutClick} className='btn-sm btn btn-danger float-md-end '>Log out < FiLogOut className='text-white' /></button> : ""}
        </nav>
      </div>
    </div>
  )
}

export default HeaderAdmin