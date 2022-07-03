import React from 'react';

import { BsFacebook, BsTwitter } from "react-icons/bs"
import { FaInstagram, FaYoutube } from "react-icons/fa"

function ClientFooter(props) {
  let year = (new Date()).getFullYear();
  return (
    <footer className='footer-client container-fluid  text-white'>
      <div className="container">
        <div className='row '>

          <div className='col-md-4'>
            <h2 className='mt-4 pb-2'><img src={"/images/Background.png"} alt="logo" /></h2>
            <p className='ms-2 fw-semibold mb-2'>owner:<span className='fw-light m-0' style={{ fontSize: "0.9em" }}> Noam Avenue.</span></p>
            <p className='ms-2 fw-semibold mb-2'>Address:<span className='fw-light m-0' style={{ fontSize: "0.9em" }}> hatvor 16 TLV.</span></p>
            <p className='ms-2 fw-semibold mb-2'>Country:<span className='fw-light m-0' style={{ fontSize: "0.9em" }}> Israel.</span></p>
          </div>

          <div className='col-md-4'>
            <h3 className='mt-4 pb-2 fw-semibold'>CONTACT</h3>
            <p className='ms-2 fw-semibold mb-2'>Email:<span className='fw-light m-0' style={{ fontSize: "0.9em" }}> NeedEnter@gmail.com.</span></p>
            <p className='ms-2 fw-semibold mb-2'>Tel:<span className='fw-light m-0' style={{ fontSize: "0.9em" }}> 050-5123456.</span></p>
          </div>

          <div className='col-md-4'>
            <h3 className='mt-4 pb-2 fw-semibold'>SOCIAL</h3>
            <div className='d-flex '>
              <BsFacebook className="fs-3 me-3 text-primary" />
              <FaInstagram className="fs-2 me-3 instegram" />
              <BsTwitter className="fs-3 me-3 text-info" />
              <FaYoutube className="fs-3 text-danger" />
            </div>
          </div>
        </div>
        
        <div className='text-center py-3'>
          All rights reserved © to team of music shop  {year}
        </div>
      </div>
    </footer>
  )
}

export default ClientFooter