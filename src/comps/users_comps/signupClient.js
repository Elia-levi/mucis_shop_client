import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';

import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { FaUserAlt, FaLock, FaHome, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { API_URL, doApiMethod } from '../../services/apiService';
import LoadingScreen from '../../misc_comps/loadingScreen';


function SignUpClient(props) {
  document.title = "Music shop-Sign up";

  const [loading,setLoading] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShownAgin, setPasswordShownAgin] = useState(false);

  let nav = useNavigate()

  let { register, getValues, handleSubmit, formState: { errors } } = useForm();
  let nameRef = register("name", { required: true, minLength: 2 });
  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })
  let passwordRef = register("password", { required: true, minLength: 3 });
  let passwordRefAgain = register("passwordAgain", { validate: value => value === getValues("password") });
  let addressRef = register("address", { required: true, minLength: 2 });
  let phoneRef = register("phone", { required: true, minLength: 9 });

  const onSubForm = (data) => {
    // data = the inputs in the form with ref in 1 object
    delete data.passwordAgain;
    doApi(data)
  }

  const doApi = async (_dataBody) => {
    setLoading(true);
    let url = API_URL + "/users/";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      setLoading(false);
      if (resp.data.status==="PANDING") {
        nav("/emailSent/"+_dataBody.email);
      }
    }
    catch (err) {
      if (err.response.data.code === 11000) {
        toast.error("Email already in system , try log in or you need verified")
      }
      else {
        alert("There problem , try come back later")
      }
    }
    setLoading(false);
  }

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const togglePasswordAgin = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShownAgin(!passwordShownAgin);
  };


  return (
    <div className='container-fluid'>
      <div className='container col-md-4  mx-auto my-4 pb-4   border  shadow' style={{ borderRadius: '20px' }}>
        <h3 className='my-3 text-center text-primary fw-normal'>Signup</h3>

        <form onSubmit={handleSubmit(onSubForm)} className='col-11 mx-auto ' >

          <label style={{ fontSize: "0.9em" }}>Full name</label>
          <div className='d-flex align-items-center border'>
            <FaUserAlt className='fs-5 mx-2' />
            <input {...nameRef} type="text" className='form-control border-0' />
          </div>
          {errors.name ? <small style={{ fontSize: "0.8em" }} className='text-danger d-block'>* Enter valid name, min 2 chars</small> : ""}

          <label className='mt-2' style={{ fontSize: "0.9em" }}>Email address</label>
          <div className='d-flex align-items-center border'>
            <MdEmail className='fs-5 mx-2' />
            <input {...emailRef} type="text" className='form-control border-0' />
          </div>
          {errors.email ? <small style={{ fontSize: "0.8em" }} className='text-danger d-block'>* Email invalid</small> : ""}

          <label className='mt-2' style={{ fontSize: "0.9em" }}>Password</label>
          <div className='d-flex align-items-center border'>
            <FaLock className='fs-5 mx-2' />
            <input {...passwordRef} type={passwordShown ? "text" : "password"} className='form-control border-0' />
            <span onClick={togglePassword} style={{ border: "0", background: "white", cursor: "pointer" }}>{passwordShown ? <BsFillEyeFill className='fs-6 mx-2' /> : <BsFillEyeSlashFill className='fs-6 mx-2' />}</span>
          </div>
          {errors.password ? <small style={{ fontSize: "0.8em" }} className='text-danger d-block'>* Enter valid password, min 3 chars</small> : ""}

          <label className='mt-2' style={{ fontSize: "0.9em" }}>Confirm your password</label>
          <div className='d-flex align-items-center border'>
            <FaLock className='fs-5 mx-2' />
            <input {...passwordRefAgain} type={passwordShownAgin ? "text" : "password"} className='form-control border-0' />
            <span onClick={togglePasswordAgin} style={{ border: "0", background: "white", cursor: "pointer" }}>{passwordShownAgin ? <BsFillEyeFill className='fs-6 mx-2' /> : <BsFillEyeSlashFill className='fs-6 mx-2' />}</span>
          </div>
          {errors.passwordAgain ? <small style={{ fontSize: "0.8em" }} className='text-danger d-block'>* Password need to be equal to the first</small> : ""}

          <label className='mt-2' style={{ fontSize: "0.9em" }}>Address</label>
          <div className='d-flex align-items-center border'>
            <FaHome className='fs-5 mx-2' />
            <input {...addressRef} type="text" className='form-control border-0' />
          </div>
          {errors.address ? <small style={{ fontSize: "0.8em" }} className='text-danger d-block'>* Enter valid address, min 2 chars</small> : ""}

          <label className='mt-2' style={{ fontSize: "0.9em" }}>Phone</label>
          <div className='d-flex align-items-center border'>
            <FaPhoneAlt className='fs-5 mx-2' />
            <input {...phoneRef} type="phone" className='form-control border-0' />
          </div>
          {errors.phone ? <small style={{ fontSize: "0.8em" }} className='text-danger d-block'>* Enter valid phone number, min 9 numbers</small> : ""}

          <button className='btn btn-outline-primary border-primary border-2 border mt-4 mb-2 d-flex mx-auto rounded-pill pt-2 px-4'>Sign up</button>
          <div className='text-center'>Already have an account? <Link to="/login" style={{ textDecoration: "none" }}>Login</Link></div>
        </form>
      </div>
      {loading && <LoadingScreen />}
    </div>
  )
}

export default SignUpClient