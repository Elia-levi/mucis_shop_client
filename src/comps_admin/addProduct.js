import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import AuthAdminComp from '../misc_comps/authAdminComp';


function AddProduct(props) {
  document.title = "Admin panel - Add product";

  // categoried data the will load from api request
  let [cat_ar, setCatAr] = useState([]);
  // for disabled the send btn for avoid multi click on him
  let [btnSend, setBtnSend] = useState(false)

  let nav = useNavigate();

  let { register, handleSubmit, formState: { errors } } = useForm();
  let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
  let infoRef = register("info", { required: true, minLength: 2, maxLength: 500 })
  let priceRef = register("price", { required: true, min: 1, max: 999999 })
  let cat_short_idRef = register("cat_short_id", { required: true, minLength: 1, maxLength: 99 })
  let img_urlRef = register("img_url", { required: true, minLength: 3, maxLength: 500 })
  // qty - amount of product in the store
  let qtyRef = register("qty", { required: true, min: 1, max: 9999 })

  useEffect(() => {
    doApi()
  }, [])

  // get the SubCatgories for select box
  const doApi = async () => {
    let url = API_URL + "/SubCategories/?perPage=100";
    let resp = await doApiGet(url);
    setCatAr(resp.data);
  }

  const onSubForm = (formData) => {
    setBtnSend(true);
    doFormApi(formData);
  }

  const doFormApi = async (formData) => {
    let url = API_URL + "/products";
    try {
      let resp = await doApiMethod(url, "POST", formData);
      if (resp.data._id) {
        toast.success("Product added");
        // back to the list of products in the admin panel
        nav("/admin/products")
      }
    }
    catch (err) {
      console.log(err.response.data)
      alert("There problem try again later")
      nav("/admin/products")
    }
  }

  return (
    <div className='container col-md-6 mx-auto mt-4'>
      <AuthAdminComp />
      <h1 className='text-center display-5 fw-bold my-1 fst-italic'>Add new product</h1>
      <form onSubmit={handleSubmit(onSubForm)} className='col-12 p-3 border mt-2 rounded shadow border-dar'>

        <label className=' fw-bold mb-1'>Name:</label>
        <input {...nameRef} type="text" placeholder="Name" className='form-control mb-2 ms-1' />
        {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99 chars</small> : ""}

        <label className=' fw-bold mb-1'>Info:</label>
        <textarea {...infoRef} placeholder="Info" className='form-control mb-2 ms-1' ></textarea>
        {errors.info ? <small className='text-danger d-block'>* Enter valid info, 3 to 500 chars</small> : ""}

        <div className='d-flex'>
          <div className='col-md-6 me-2'>
            <label className=' fw-bold '>Price:</label>
            <input {...priceRef} type="number" defaultValue="50" className='form-control mb-2 ' />
            {errors.price ? <small className='text-danger d-block'>* Enter valid  price, between 1 to 999999</small> : ""}
          </div>
          <div className='col-md-6 me-2'>
            <label className=' fw-bold '>Qty (amount in the stock):</label>
            <input {...qtyRef} type="number" defaultValue="1" className='form-control mb-2' />
            {errors.qty ? <small className='text-danger d-block mb-1'>* Enter valid  qty, between 1 to 9999</small> : ""}
          </div>
        </div>

        <label className=' fw-bold mb-1'>SubCategory:</label>
        <select {...cat_short_idRef} placeholder="SubCategory" className='form-control mb-2 ms-1' >
          <option value="" >Choose SubCategory</option>
          {cat_ar.map(item => {
            return (
              <option key={item._id} value={item.short_id}>{item.name}</option>
            )
          })}
          {/* loop from api of SubCategory */}
        </select>
        {errors.cat_short_id ? <small className='text-danger d-block'>You must choose Subategory from the list </small> : ""}

        <label className=' fw-bold mb-1'>Img url:</label>
        <input {...img_urlRef} type="text" placeholder="Img url" className='form-control mb-2 ms-1' />
        {errors.img_url ? <small className='text-danger d-block'>* Enter valid  img url </small> : ""}

        <div className='d-flex justify-content-center '>
          <button className='btn btn-success my-3 me-4' disabled={btnSend}>Add new product</button>
          <button onClick={() => {
            nav(-1)
          }} className='btn btn-danger my-3'>Canel</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct