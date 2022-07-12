import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";


import { API_URL, doApiMethod } from '../services/apiService';

function LoginAdmin(props) {
  document.title = "Admin panel-Login";

  const [passwordShown, setPasswordShown] = useState(false);

  let nav = useNavigate()

  // data = the inputs in the form with ref in 1 object
  const onSubForm = (data) => {
    doApi(data)
  }

  const doApi = async (_dataBody) => {
    let url = API_URL + "/users/login"
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if (resp.data.token) {
        localStorage.setItem("tok", resp.data.token);
        // send user to product list
        nav("/admin/products");
        toast.info("Welcome back to admin panel!");
      }
      else {
        toast.error("There some error come back later...");
      }
    }
    catch (err) {
      toast.error(err.response.data.err);
      // err.response.data -> collect error with axios
      console.log(err.response.data)
    }
  }

  let { register, handleSubmit, formState: { errors } } = useForm();
  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })
  let passwordRef = register("password", { required: true, minLength: 3 });

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <div className='container col-md-6 mx-auto mt-5 ' style={{ minHeight: "73vh" }}>
      <h1 className='text-center display-6 fw-bold my-4 fst-italic'>Login</h1>

      <form onSubmit={handleSubmit(onSubForm)} className='col-9  mx-auto  '>

        <input {...emailRef} type="text" placeholder="Email" className='form-control border border-dark mb-2' />
        {errors.email ? <small className='text-danger d-block'>* Email invalid</small> : ""}

        <div className='d-flex align-items-center border border-dark rounded'>
          <input {...passwordRef} type={passwordShown ? "text" : "password"} placeholder="Password" className='form-control border-0' />
          <span onClick={togglePassword} style={{ border: "0", background: "white", cursor: "pointer" }}>{passwordShown ? <BsFillEyeFill className='fs-6 mx-2' /> : <BsFillEyeSlashFill className='fs-6 mx-2' />}</span>
        </div>
        {errors.password ? <small className='text-danger d-block'>* Enter valid password, min 3 chars</small> : ""}

        <div className='mt-1 ms-1' style={{ fontSize: "0.8em" }}>Forgotten password?<Link to="/forgottenPassword" style={{ textDecoration: "none", fontSize: "1em" }}> Reset it</Link></div>


        <button className='btn btn-success px-3 mt-1 d-flex mx-auto rounded-pill'>Login</button>
      </form>
    </div>
  )
}

export default LoginAdmin