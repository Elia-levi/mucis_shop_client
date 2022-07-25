import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import AuthClientComp from './authClientComp';

import { FaUserCircle, FaEdit } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { CgShoppingBag } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

import { toast } from 'react-toastify';

import LoadingScreen from '../../misc_comps/loadingScreen';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';


function UsrInfo(props) {
  document.title = "Music shop-User info";

  let [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  const fileRef = useRef();

  let { register, handleSubmit, formState: { errors } } = useForm();
  let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
  let phoneRef = register("phone", { required: true, minLength: 10, maxLength: 10 })
  let addressRef = register("address", { required: true, minLength: 1, maxLength: 99 })

  useEffect(() => {
    doApiUser()
  }, [user])

  const doApiUser = async () => {
    setLoading(true);
    let url = API_URL + "/users/myInfo";
    let resp = await doApiGet(url)
    setUser(resp.data)
    setLoading(false)
  }

  const onSubForm = (formData) => {
    doFormApi(formData);
  }

  const doFormApi = async (formData) => {
    console.log(formData)
    let url = API_URL + "/users/" + user._id;
    try {
      let resp = await doApiMethod(url, "PUT", formData);
      console.log(resp.data.modifiedCount)
      if (resp.data.modifiedCount) {
        toast.success("user updated");
      }
      else {
        toast.warning("you not change nothing")
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There problem try again later")
    }
  }

  // Add image user
  const handleChange = async () => {
    let myData = new FormData();
    myData.append("my_file", fileRef.current.files[0])
    try {
      let _url = API_URL + "/upload";
      let resp = await axios({
        method: "POST",
        url: _url,
        data: myData,
        headers: {
          'x-api-key': localStorage["tok"],
          'content-type': "multipart/form-data"
        }
      });
      if (resp.data.modifiedCount) {
        toast.success("user updated");
      }
    } catch (err) {
      console.log(err.response);
      alert("There problem try again later")
    }
  };

  return (
    <div className='container-fluid my-4' style={{ minHeight: "76vh" }}>
      <div className="container user_info ">
        <AuthClientComp />
        <h2 className='text-center display-6 fw-bold my-4 fst-italic'>User info</h2>

        <div className='row shadow' style={{ background: "#FFFFFF", borderRadius: "12px", border: "#A1EAFB solid 2px" }}>

          <div className='col-lg-4  ' style={{ minHeight: "450px" }}>

            {!user.img_user || user.img_user === "" ?
              <div className=' user_img mx-auto mt-2' >
                < FaUserCircle style={{ fontSize: "205px" }} />

                {/* To change style of file input 2*/}
                <button onClick={() => fileRef.current.click()}>
                  < FaEdit className='user_img_edit' />
                </button>
              </div>
              :
              <div className=' user_img mx-auto mt-3' >
                <img src={user.img_user} alt={user.name} className=" border border-dark border-4 rounded-circle" style={{ height: "200px", width: "200px" }} />

                {/* To change the file input 2 */}
                <button onClick={() => fileRef.current.click()}>
                  < FaEdit className='user_img_edit' />
                </button>
              </div>
            }

            {/* To change style of file input 1 */}
            <input
              ref={fileRef}
              onChange={handleChange}
              accept="image/*"
              type="file"
              hidden
            />

            <div className='text-center fs-4 mb-2 pb-2 mt-1 fw-semibold border-bottom'>{user.name}</div>

            <article>
              <li ><MdFavoriteBorder /> <Link to="/products_favs">My favorites</Link></li>
              <li ><CgShoppingBag /> <Link to="/oldOrders">My order</Link></li>
              <li ><AiOutlinePlus /><Link to="/addProductClient">Post a new ad</Link></li>
              <li className='border-0' >< BiLogOutCircle className='text-danger' /><Link to="/logout" className="text-danger">logout</Link></li>
            </article>

          </div>
          <div className='col-lg-8  border-start ' style={{ minHeight: "450px" }}>
            {(user._id) ?
              <form onSubmit={handleSubmit(onSubForm)} className='col-10 mx-auto p-3  mt-2 rounded '>

                <label className=' fw-bold mb-1'>Name:</label>
                <input defaultValue={user.name} {...nameRef} type="text" className='form-control mb-2 ms-1' />
                {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99 chars</small> : ""}

                <label className=' fw-bold mb-1'>Phone:</label>
                <input defaultValue={user.phone} {...phoneRef} type="phone" className='form-control mb-2 ms-1' />
                {errors.phone ? <small className='text-danger d-block'>* Enter valid phone, only 10 chars</small> : ""}

                <label className=' fw-bold mb-1'>Address:</label>
                <input defaultValue={user.address} {...addressRef} type="text" className='form-control mb-2 ms-1' />
                {errors.address ? <small className='text-danger d-block'>* Enter valid url for address, between 1 to 500 chars</small> : ""}

                <div className='d-flex justify-content-center'>
                  <button className='mt-4 btn btn-outline-info rounded-pill px-5' >Save the change</button>
                </div>
              </form> : (loading && <LoadingScreen />)}
          </div>
        </div>
      </div>
    </div>

  )
}

export default UsrInfo

