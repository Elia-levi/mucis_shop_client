import React from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API_URL, doApiMethod } from '../../services/apiService';

function SignUpClient(props) {
  document.title = "Music shop-Sign up";

  let nav = useNavigate()

  let { register, handleSubmit, formState: { errors } } = useForm();

  let nameRef = register("name", { required: true, minLength: 2 });
  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })
  let passwordRef = register("password", { required: true, minLength: 3 });
  let addressRef = register("address", { required: true, minLength: 2 });
  let phoneRef = register("phone", { required: true, minLength: 9 });

  const onSubForm = (data) => {
    // data = the inputs in the form with ref in 1 object
    doApi(data)
  }

  const doApi = async (_dataBody) => {
    let url = API_URL + "/users/";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if (resp.data._id) {
        toast.success("You sign up");
        nav("/login");
      }
    }
    catch (err) {
      if (err.response.data.code === 11000) {
        toast.error("Email already in system , try log in")
      }
      else {
        alert("There problem , try come back later")
      }
    }
  }


  return (
    <div className='container col-md-5  mx-auto my-3'>
      <h1 className='my-3 text-center fw-bold'>Sign up to the store</h1>

      <form onSubmit={handleSubmit(onSubForm)} className='col-12 p-3 border border-dark mb-5'>

        <label>* Name:</label>
        <input {...nameRef} type="text" className='form-control border-info' />
        {errors.name ? <small className='text-danger d-block'>* Enter valid name, min 2 chars</small> : ""}

        <label>* Email:</label>
        <input {...emailRef} type="text" className='form-control border-info' />
        {errors.email ? <small className='text-danger d-block'>* Email invalid</small> : ""}

        <label>* Password:</label>
        <input {...passwordRef} type="text" className='form-control border-info' />
        {errors.password ? <small className='text-danger d-block'>* Enter valid password, min 3 chars</small> : ""}

        <label>* Address:</label>
        <input {...addressRef} type="text" className='form-control border-info' />
        {errors.address ? <small className='text-danger d-block'>* Enter valid address, min 2 chars</small> : ""}

        <label>* Phone:</label>
        <input {...phoneRef} type="text" className='form-control border-info' />
        {errors.phone ? <small className='text-danger d-block'>* Enter valid phone number, min 9 numbers</small> : ""}

        <button className='btn btn-info mt-4 d-flex mx-auto'>Sign up</button>
      </form>
    </div>
  )
}

export default SignUpClient