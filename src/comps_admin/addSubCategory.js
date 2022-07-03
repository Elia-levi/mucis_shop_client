import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API_URL, doApiGet, doApiMethod } from '../services/apiService'
import AuthAdminComp from '../misc_comps/authAdminComp';


function AddSubCategory(props) {
  document.title = "Admin panel - Add subCategories";

  let [cat_ar, setCatAr] = useState([]);
  // for disabled the send btn for avoid multi click on him
  let [btnSend, setBtnSend] = useState(false)

  let nav = useNavigate();

  let { register, handleSubmit, formState: { errors } } = useForm();
  let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
  let url_nameRef = register("url_name", { required: true, minLength: 2, maxLength: 500 })
  let img_urlRef = register("img_url", { required: true, minLength: 3, maxLength: 500 })
  let cat_short_idRef = register("cat_short_id", { required: true, minLength: 1, maxLength: 99 })

  useEffect(() => {
    doApi()
  }, [])

  // get the catgories for select box
  const doApi = async () => {
    let url = API_URL + "/Categories";
    let resp = await doApiGet(url);
    setCatAr(resp.data);
  }


  const onSubForm = (formData) => {
    setBtnSend(true);
    doFormApi(formData);
  }

  const doFormApi = async (formData) => {
    let url = API_URL + "/SubCategories";
    try {
      let resp = await doApiMethod(url, "POST", formData);
      if (resp.data._id) {
        toast.success("subCategory added")
        // back to the list of subCategories in the admin panel
        nav("/admin/subCategoriesList")
      }
    }
    catch (err) {
      console.log(err.response)
      alert("There problem try again later")
      nav("/admin/subCategoriesList")
    }
  }

  return (
    <div className='container col-md-6 mx-auto mt-4'>
      <AuthAdminComp />
      <h1 className='text-center display-5 fw-bold my-1 fst-italic'>Add new subategory</h1>
      <form onSubmit={handleSubmit(onSubForm)} className='col-12 p-3 border mt-2 rounded  shadow border-dark'>

        <label className=' fw-bold mb-1  '>Name:</label>
        <input {...nameRef} type="text" placeholder="Name" className='form-control mb-2 ms-1' />
        {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99 chars</small> : ""}

        <label className=' fw-bold mb-1'>Url name:</label>
        <input {...url_nameRef} type="text" placeholder="Url name" className='form-control mb-2 ms-1' />
        {errors.url_name ? <small className='text-danger d-block'>* Enter valid url name, between 1 to 500 chars</small> : ""}

        <label className=' fw-bold mb-1'>Image url:</label>
        <input {...img_urlRef} type="text" placeholder="Image url" className='form-control mb-2 ms-1' />
        {errors.img_url ? <small className='text-danger d-block'>* Enter valid url for image, between 1 to 500 chars</small> : ""}

        <label className=' fw-bold mb-1'>Category:</label>
        <select {...cat_short_idRef} className='form-select mb-2 ms-1'>
          <option value="" >Choose Category</option>
          {cat_ar.map(item => {
            return (
              <option key={item._id} value={item.short_id}>{item.name}</option>
            )
          })}
          {/* loop from api of category */}
        </select>
        {errors.cat_short_id ? <small className='text-danger d-block'>You must choose category from the list </small> : ""}

        {/* disable-> if true user cant click */}
        <div className='d-flex justify-content-center'>
          <button className='btn btn-success my-3 me-4' disabled={btnSend}>Add new subcategory</button>
          <button onClick={() => {
            nav(-1)
          }} className='btn btn-danger my-3'>Canel</button>
        </div>
      </form>
    </div>
  )
}

export default AddSubCategory