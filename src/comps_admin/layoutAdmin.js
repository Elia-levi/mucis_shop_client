import React from 'react';
import { Outlet } from 'react-router-dom';

import HeaderAdmin from './headerAdmin';
import AdminFooter from './adminFooter';

import "./cssAdmin/adminHeader.css"
import "./cssAdmin/cssAdmin.css"


function LayoutAdmin(props){
  
  return(
    <React.Fragment>
      <HeaderAdmin />
      <Outlet />
      <AdminFooter/>
    </React.Fragment>
  )
}

export default LayoutAdmin