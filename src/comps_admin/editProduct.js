import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';

import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import AuthAdminComp from '../misc_comps/authAdminComp';
import LoadingScreen from '../misc_comps/loadingScreen';

function EditProduct(props) {

  let [cat_ar, setCatAr] = useState([]);
  document.title = "Admin panel - Edit product";

  // the props of the products we want to edit
  let [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false)

  let params = useParams();
  let nav = useNavigate()

  let { register, handleSubmit, formState: { errors } } = useForm();
  let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
  let infoRef = register("info", { required: true, minLength: 2, maxLength: 500 })
  let priceRef = register("price", { required: true, min: 1, max: 999999 })
  let cat_short_idRef = register("cat_short_id", { required: true, minLength: 1, maxLength: 99 })
  let img_urlRef = register("img_url", { required: true, minLength: 3, maxLength: 500 })
  let qtyRef = register("qty", { required: true, min: 1, max: 9999 })

  useEffect(() => {
    doApi()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  // get the subcatgories for select box and also data of the product we want edit
  const doApi = async () => {
    setLoading(true);
    let url = API_URL + "/SubCategories/?perPage=1000";
    let resp = await doApiGet(url);
    setCatAr(resp.data);
    // get product props from api 
    let urlProduct = API_URL + "/products/single/" + params.id;
    let resp2 = await doApiGet(urlProduct);
    setProduct(resp2.data);
    setLoading(false)
  }

  const onSubForm = (formData) => {
    doFormApi(formData);
  }

  const doFormApi = async (formData) => {
    setLoading(true);
    let url = API_URL + "/products/" + params.id;
    try {
      let resp = await doApiMethod(url, "PUT", formData);
      if (resp.data.modifiedCount) {
        toast.success("Product updated");
        // back to the list of products in the admin panel
        nav("/admin/products")
      }
      else {
        toast.warning("You not change nothing for update.")
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There problem try again later"
      )
    }
    setLoading(false)
  }

  return (
    <div className='container col-md-6 mx-auto mt-4'>
      <AuthAdminComp />
      <h1 className='text-center display-5 fw-bold my-1 fst-italic'>Edit product</h1>

      {(product._id) ?
        <form onSubmit={handleSubmit(onSubForm)} className='col-12 p-3 border mt-2 rounded  shadow border-dark'>

          <label className=' fw-bold mb-1'>Name:</label>
          <input defaultValue={product.name} {...nameRef} type="text" className='form-control mb-2 ms-1' />
          {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99 chars</small> : ""}

          <label className=' fw-bold mb-1'>Info:</label>
          <textarea defaultValue={product.info} {...infoRef} className='form-control mb-2 ms-1' rows="4"></textarea>
          {errors.info ? <small className='text-danger d-block'>* Enter valid info, 3 to 500 chars</small> : ""}

          <div className='d-flex'>
            <div className='col-md-6 me-2'>
              <label className=' fw-bold '>Price:</label>
              <input defaultValue={product.price} {...priceRef} type="number" className='form-control mb-2' />
              {errors.price ? <small className='text-danger d-block'>* Enter valid  price, between 1 to 999999</small> : ""}
            </div>

            <div className='col-md-6 me-2'>
              <label className=' fw-bold '>Qty (amount in the stock):</label>
              <input defaultValue={product.qty} {...qtyRef} type="number" className='form-control mb-2' />
              {errors.qty ? <small className='text-danger d-block'>* Enter valid  qty, between 1 to 9999</small> : ""}
            </div>
          </div>

          <label className=' fw-bold mb-1'>Subcategory:</label>
          {/* DefaultValue - what to choose in the start from the options */}
          <select defaultValue={product.cat_short_id} {...cat_short_idRef} className='form-select mb-2 ms-1'>
            <option value="" >Choose subCategory</option>
            {cat_ar.map(item => {
              return (
                <option key={item._id} value={item.short_id}>{item.name}</option>
              )
            })}
            {/* loop from api of category */}
          </select>
          {errors.cat_short_id ? <small className='text-danger d-block'>You must choose category from the list </small> : ""}

          <label className=' fw-bold mb-1'>Img url:</label>
          <input defaultValue={product.img_url} {...img_urlRef} type="text" className='ms-1 form-control mb-2' />
          {errors.img_url ? <small className='text-danger d-block'>* Enter valid  img url </small> : ""}

          <div className='d-flex justify-content-center'>
            <button className='mt-4 btn btn-primary me-4' >Update Product</button>
            <button onClick={() => {
              nav(-1)
            }} className='btn btn-danger mt-4'>Canel</button>
          </div>
        </form> : (loading && <LoadingScreen />)}
    </div>
  )
}

export default EditProduct