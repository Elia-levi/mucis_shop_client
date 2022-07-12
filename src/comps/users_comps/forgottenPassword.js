import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import {useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { MdEmail } from "react-icons/md";

import LoadingScreen from '../../misc_comps/loadingScreen';
import { API_URL, doApiMethod } from '../../services/apiService';

function ForgottenPassword(props) {
  document.title = "Music shop-Password reset";

  const [loading,setLoading] = useState(false)

  let nav = useNavigate();

  let { register, handleSubmit, formState: { errors } } = useForm();
  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })

  const onSubForm = (data) => {
    // data = the inputs in the form with ref in 1 object
    // need to change
    // data.redirectUrl = "http://localhost:3000/passwordRest";
    data.redirectUrl = "https://musicsshop.netlify.app/";
    doApi(data)
  }

  const doApi = async (_dataBody) => {
    setLoading(true);
    let url = API_URL + "/users/requestPasswordReset";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if(resp.data.status==="FAILED"){
        toast.error(resp.data.massage);
      }
      if (resp.data.status==="PANDING") {
        nav(`/emailSent/${_dataBody.email}/${true}`);
      }
    }
    catch (err) {
      toast.error("There some error come back later...")
    }
    setLoading(false);
  }


  return (
    <div className='container col-md-4 mx-auto mt-5 ' style={{ minHeight: "73vh" }}>
      <h2 className='text-center display-6 fw-bold my-4 fst-italic'>Password reset</h2>

      <form onSubmit={handleSubmit(onSubForm)} className='col-11  mx-auto  '>

          <label className='mt-2' style={{ fontSize: "0.9em" }}>Enter your email address</label>
          <div className='d-flex align-items-center border'>
            <MdEmail className='fs-5 mx-2' />
            <input {...emailRef} type="text" className='form-control border-0' />
          </div>
          {errors.email ? <small style={{ fontSize: "0.8em" }} className='text-danger d-block'>* Email invalid</small> : ""}

        <button className='btn btn-primary  mt-3 d-flex mx-auto rounded-pill pt-2 px-4'>Submit</button>
      </form>
      {loading && <LoadingScreen />}
    </div>
  )
}

export default ForgottenPassword