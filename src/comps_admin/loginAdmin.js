import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';

import { API_URL, doApiMethod } from '../services/apiService';

function LoginAdmin(props) {
  document.title = "Admin panel-Login";

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

  return (
    <div className='container col-md-6 mx-auto mt-5 ' style={{ minHeight: "73vh" }}>
      <h1 className='text-center display-6 fw-bold my-4 fst-italic'>Login to system</h1>

      <form onSubmit={handleSubmit(onSubForm)} className='col-9  mx-auto  '>

        <input {...emailRef} type="text" placeholder="Email" className='form-control border border-dark mb-2' />
        {errors.email ? <small className='text-danger d-block'>* Email invalid</small> : ""}

        <input {...passwordRef} type="text" placeholder="Password" className='border border-dark form-control' />
        {errors.password ? <small className='text-danger d-block'>* Enter valid password, min 3 chars</small> : ""}
        
        <button className='btn btn-success px-3 mt-4 d-flex mx-auto'>Login</button>
      </form>
    </div>
  )
}

export default LoginAdmin