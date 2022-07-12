import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";


import { API_URL, doApiMethod } from '../../services/apiService';
import { saveTokenLocal } from '../../services/localService';
import { AppContext } from "../../context/shopContext"

function LogInClient(props) {
  document.title = "Music shop-Login";

  const [passwordShown, setPasswordShown] = useState(false);

  const { doFavApi } = useContext(AppContext);

  let nav = useNavigate();

  let { register, handleSubmit, formState: { errors } } = useForm();
  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })
  let passwordRef = register("password", { required: true, minLength: 3 });

  const onSubForm = (data) => {
    // data = the inputs in the form with ref in 1 object
    doApi(data)
  }

  const doApi = async (_dataBody) => {
    let url = API_URL + "/users/login";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if(resp.data.status==="FAILED"){
        toast.error(resp.data.massage);
      }
      if (resp.data.token) {
        toast.success("You logged in");
        saveTokenLocal(resp.data.token);
        nav("/");
        doFavApi();
      }
    }
    catch (err) {
      toast.error("User password not match, or there another problem")
    }
  }

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <div className='container col-md-6 mx-auto mt-5 ' style={{ minHeight: "73vh" }}>
      <h1 className='text-center display-6 fw-bold my-4 fst-italic'>Login</h1>

      <form onSubmit={handleSubmit(onSubForm)} className='col-9  mx-auto  '>

        <input  {...emailRef} type="text" placeholder="Email" className='form-control border border-dark mb-2' />
        {errors.email ? <small className='text-danger d-block'>* Email invalid</small> : ""}

        <div className='d-flex align-items-center border border-dark rounded'>
          <input {...passwordRef} type={passwordShown ? "text" : "password"} placeholder="Password" className='form-control border-0' />
          <span onClick={togglePassword} style={{ border: "0", background: "white", cursor: "pointer" }}>{passwordShown ? <BsFillEyeFill className='fs-6 mx-2' /> : <BsFillEyeSlashFill className='fs-6 mx-2' />}</span>
        </div>
        {errors.password ? <small className='text-danger d-block'>* Enter valid password, min 3 chars</small> : ""}

        <div className='d-md-flex align-items-center justify-content-md-between'>
          <div className='mt-1 ms-1' style={{ fontSize: "0.8em" }}>Forgotten password?<Link to="/forgottenPassword" className='mt-1 ms-1' style={{ textDecoration: "none", fontSize: "1em" }}> Reset it</Link></div>
          <div className='mt-1 ms-1' style={{ fontSize: "0.8em" }}> New here? <Link to="/signup"  style={{ textDecoration: "none" }}> signup</Link></div>
        </div>

        <button className='btn btn-success px-3 mt-2 d-flex mx-auto rounded-pill'>Login</button>
      </form>
    </div>
  )
}

export default LogInClient