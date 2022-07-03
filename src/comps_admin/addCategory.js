import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API_URL, doApiMethod } from '../services/apiService'
import AuthAdminComp from '../misc_comps/authAdminComp';

function AddCategory(props) {
  document.title = "Admin panel - Add category";

  // for disabled the send btn for avoid multi click on him
  let [btnSend, setBtnSend] = useState(false)
  let nav = useNavigate()

  let { register, handleSubmit, formState: { errors } } = useForm();
  let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
  let url_nameRef = register("url_name", { required: true, minLength: 2, maxLength: 500 })
  let img_urlRef = register("img_url", { required: true, minLength: 3, maxLength: 500 })

  const onSubForm = (formData) => {
    setBtnSend(true);
    doFormApi(formData);
  }

  const doFormApi = async (formData) => {
    let url = API_URL + "/categories";
    try {
      let resp = await doApiMethod(url, "POST", formData);
      if (resp.data._id) {
        toast.success("Category added")
        nav("/admin/categories")
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There problem try again later")
      nav("/admin/categories")
    }
  }

  return (
    <div className='container col-md-6 mx-auto mt-5' style={{ minHeight: "76vh" }}>
      <AuthAdminComp />
      <h1 className='text-center display-5 fw-bold my-1 fst-italic'>Add new category</h1>
      <form onSubmit={handleSubmit(onSubForm)} className='col-12 p-3 border mt-2 rounded shadow border-dark'>

        <label className=' fw-bold mb-1  '>Name:</label>
        <input {...nameRef} type="text" placeholder="Name" className='form-control mb-2 ms-1' />
        {errors.name ? <small className='text-danger d-block '>* Enter valid name 2 to 99 chars</small> : ""}

        <label className=' fw-bold mb-1'>Url name:</label>
        <input {...url_nameRef} type="text" placeholder="Url name" className='form-control mb-2 ms-1' />
        {errors.url_name ? <small className='text-danger d-block'>* Enter valid url name, between 1 to 500 chars</small> : ""}

        <label className=' fw-bold mb-1'>Image url:</label>
        <input {...img_urlRef} type="text" placeholder="Image url" className='form-control mb-2 ms-1' />
        {errors.img_url ? <small className='text-danger d-block'>* Enter valid url for image, between 1 to 500 chars</small> : ""}

        <div className='d-flex justify-content-center'>
          <button className='mt-4 btn btn-success me-4' disabled={btnSend}>Add new category</button>
          <button onClick={() => {
            nav(-1)
          }} className='btn btn-danger mt-4'>Canel</button>
        </div>
      </form>
    </div>
  )
}

export default AddCategory