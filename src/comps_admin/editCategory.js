import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API_URL, doApiGet, doApiMethod } from '../services/apiService'
import AuthAdminComp from '../misc_comps/authAdminComp';
import LoadingScreen from '../misc_comps/loadingScreen';

function EditCategory(props) {
  document.title = "Admin panel - Edit category";

  let [category, setCategory] = useState({})
  const [loading, setLoading] = useState(false)

  let params = useParams();
  let nav = useNavigate();

  let { register, handleSubmit, formState: { errors } } = useForm();
  let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
  let url_nameRef = register("url_name", { required: true, minLength: 2, maxLength: 500 })
  let img_urlRef = register("img_url", { required: true, minLength: 3, maxLength: 500 })

  useEffect(() => {
    doApi();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    setLoading(true);
    let urlProduct = API_URL + "/categories/single/" + params.url_name;
    let resp2 = await doApiGet(urlProduct);
    setCategory(resp2.data);
    setLoading(false)
  }

  const onSubForm = (formData) => {
    doFormApi(formData);
  }

  const doFormApi = async (formData) => {
    setLoading(true);
    let url = API_URL + "/categories/" + category._id;
    try {
      let resp = await doApiMethod(url, "PUT", formData);
      if (resp.data.modifiedCount) {
        toast.success("Category updated");
        // back to the list of Category in the admin panel
        nav("/admin/categories")
      }
      else {
        toast.warning("you not change nothing")
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There problem try again later")
      nav("/admin/categories")
    }
    setLoading(false)
  }

  return (
    <div className='container col-md-6 mx-auto mt-5' style={{ minHeight: "76vh" }}>
      <AuthAdminComp />
      <h1 className='text-center display-5 fw-bold my-1 fst-italic'>Edit category</h1>

      {(category._id) ?
        <form onSubmit={handleSubmit(onSubForm)} className='col-md-12 p-3 border mt-2 rounded shadow border-dark'>

          <label className=' fw-bold mb-1'>Name:</label>
          <input defaultValue={category.name} {...nameRef} type="text" className='form-control mb-3 ms-1' />
          {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99 chars</small> : ""}

          <label className=' fw-bold mb-1'>Url name:</label>
          <input defaultValue={category.url_name} {...url_nameRef} type="text" className='form-control mb-3 ms-1' />
          {errors.url_name ? <small className='text-danger d-block'>* Enter valid url name, between 1 to 500 chars</small> : ""}

          <label className=' fw-bold mb-1'>Image url:</label>
          <input defaultValue={category.img_url} {...img_urlRef} type="text" className='form-control mb-3 ms-1' />
          {errors.img_url ? <small className='text-danger d-block'>* Enter valid url for image, between 1 to 500 chars</small> : ""}

          <div className='d-flex justify-content-center'>
            <button className='mt-4 btn btn-primary  me-4' >Update category</button>
            <button onClick={() => {
              nav(-1)
            }} className='btn btn-danger mt-4'>Canel</button>
          </div>
        </form> : (loading && <LoadingScreen />)}
    </div>
  )
}

export default EditCategory