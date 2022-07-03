import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';

import { API_URL, doApiGet, doApiMethod } from '../services/apiService'
import AuthAdminComp from '../misc_comps/authAdminComp';
import LoadingScreen from '../misc_comps/loadingScreen';

function EditSubCategory(props) {
  document.title = "Admin panel - Edit subCategories";

  let [cat_ar, setCatAr] = useState([]);
  let [category, setCategory] = useState({})
  const [loading, setLoading] = useState(false);

  let params = useParams();
  let nav = useNavigate();

  let { register, handleSubmit, formState: { errors } } = useForm();
  let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
  let url_nameRef = register("url_name", { required: true, minLength: 2, maxLength: 500 })
  let img_urlRef = register("img_url", { required: true, minLength: 3, maxLength: 500 })
  let cat_short_idRef = register("cat_short_id", { required: true, minLength: 1, maxLength: 99 })

  useEffect(() => {
    doApi();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    setLoading(true);
    let url = API_URL + "/categories";
    let resp = await doApiGet(url);
    setCatAr(resp.data);

    let urlProduct = API_URL + "/SubCategories/single/" + params.url_name;
    let resp2 = await doApiGet(urlProduct);
    console.log(resp2.data)
    setCategory(resp2.data);
    setLoading(false)
  }

  const onSubForm = (formData) => {
    doFormApi(formData);
  }

  const doFormApi = async (formData) => {
    setLoading(true);
    let url = API_URL + "/SubCategories/" + category._id;
    try {
      let resp = await doApiMethod(url, "PUT", formData);
      if (resp.data.modifiedCount) {
        toast.success("subCategory updated");
        // back to the list of subCategory in the admin panel
        nav("/admin/subCategoriesList")
      }
      else {
        toast.warning("you not change nothing")
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There problem try again later")
      nav("/admin/subCategoriesList")
    }
    setLoading(false)
  }

  return (
    <div className='container col-md-6 mx-auto mt-4'>
      <AuthAdminComp />
      <h1 className='text-center display-5 fw-bold my-1 fst-italic'>Edit subcategory</h1>

      {(category._id) ?
        <form onSubmit={handleSubmit(onSubForm)} className='col-12 p-3 border mt-2 rounded  shadow border-dark'>

          <label className=' fw-bold mb-1'>Name:</label>
          <input defaultValue={category.name} {...nameRef} type="text" className='form-control mb-3 ms-1' />
          {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99 chars</small> : ""}

          <label className=' fw-bold mb-1'>Url name:</label>
          <input defaultValue={category.url_name} {...url_nameRef} type="text" className='form-control mb-2 ms-1' />
          {errors.url_name ? <small className='text-danger d-block'>* Enter valid url name, between 1 to 500 chars</small> : ""}

          <label className=' fw-bold mb-1'>Image url:</label>
          <input defaultValue={category.img_url} {...img_urlRef} type="text" className='form-control mb-2 ms-1' />
          {errors.img_url ? <small className='text-danger d-block'>* Enter valid url for image, between 1 to 500 chars</small> : ""}

          <label className=' fw-bold mb-1'>Category:</label>
          {/* DefaultValue - what to choose in the start from the options */}
          <select defaultValue={category.cat_short_id} {...cat_short_idRef} className='form-select mb-2 ms-1'>
            <option value="" >Choose Category</option>
            {cat_ar.map(item => {
              return (
                <option key={item._id} value={item.short_id}>{item.name}</option>
              )
            })}
            {/* loop from api of category */}
          </select>
          {errors.cat_short_id ? <small className='text-danger d-block'>You must choose subcategory from the list </small> : ""}

          <div className='d-flex justify-content-center'>
            <button className='mt-4 btn btn-primary me-4' >update subcategory</button>
            <button onClick={() => {
              nav(-1)
            }} className='btn btn-danger mt-4'>Canel</button>
          </div>
        </form> : (loading && <LoadingScreen />)}
    </div>
  )
}

export default EditSubCategory