import React, { useEffect, useState,useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import AuthAdminComp from '../misc_comps/authAdminComp';
import LoadingScreen from '../misc_comps/loadingScreen';
import PageLinks from '../misc_comps/pageLinks';

function SubCategoriesList(props) {
  document.title = "Admin panel - SubCategories list";

  let [ar, setAr] = useState([]);
  let [numPage, setPageNum] = useState(1);
  let [catObj, setCatObj] = useState({})
  const [loading, setLoading] = useState(false);

  let location = useLocation()
  let nav = useNavigate()
  const sortRef = useRef("");
  const checkboxRef = useRef(null);

  useEffect(() => {
    doApi()
  }, [location])

  const doApi = async () => {
    setLoading(true);
    try {
      let url0 = API_URL + "/categories";
      let resp0 = await doApiGet(url0);
      let temp_ar = resp0.data;
      let categories_data = {};
      temp_ar.forEach(item => {
        categories_data[item.short_id] = item.name;
      })
      setCatObj(categories_data)

      const urlParams = new URLSearchParams(window.location.search);
      //?page collect query string
      let pageQuery = urlParams.get("page") || 1;
      setPageNum(pageQuery)

      let url;
      (checkboxRef.current.checked) ? url = API_URL + "/subCategories/?page=" + pageQuery+"&sort="+sortRef.current.value+"&reverse=yes" : url = API_URL + "/subCategories/?page=" + pageQuery+"&sort="+sortRef.current.value

      let resp = await doApiGet(url);
      setAr(resp.data);
    }
    catch (err) {
      if (err.response) {
        console.log(err.response.data)
        alert("there problem come back later")

      }
    }
    setLoading(false)
  }

  const delCategory = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete? ,Once you delete all products that belong to that subcategory will be deleted")) {
      setLoading(true);
      try {
        let url = API_URL + "/SubCategories/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          toast.info("SubCategories delted !");
        }
        // for show the new list without the subcategory that we deleted
        doApi();
      }
      catch (err) {
        console.log(err.response);
        alert("there problem , try again later")
      }
    }
    setLoading(false)
  }

  const doFilter = async() => {
    doApi();
  };

  const openInNewTab = url => {
    //setting target to _blank with window.open
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='container' style={{ minHeight: "83vh" }}>
      <AuthAdminComp />
      <h1 className='text-center display-5 fw-bold my-4 fst-italic'>List of subCategoires in system</h1>

      <div className='row justify-content-between align-items-center'>
        <div className='col-lg-3'>
          <Link to="/admin/addSubCategory" className="btn btn-success border border-dark mb-1">Add new subCategory</Link>
        </div>
        <div className='col-lg-5 d-lg-flex col-md-4'>
          <label className=' fw-bold mb-1 me-1'>filter:</label>
          <select ref={sortRef} className='form-select form-select-sm mb-1 me-2'>
            <option value="" >Choose filter</option>
            <option value="name" >name</option>
            <option value="cat_short_id" >category</option>
          </select>

          <div className='col-lg-5 ms-3 d-md-flex'>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" ref={checkboxRef} value=""/>
              <label className="form-check-label" style={{fontSize:"0.7em" ,fontWeight:"bold"}}>
              From the largest to the smallest
              </label>
              </div>
          </div>
          <button className='btn btn-primary btn-sm rounded-pill mb-1' onClick={doFilter}>search</button>
        </div>
      </div>

      <div className="table-responsive">
        <table className='table overflow-auto table-striped table-bordered border border-2 border-dark res_teb'>

          <thead style={{zIndex:"9"}}>
            <tr className='table-success text-center '>
              <th>#</th>
              <th>Name</th>
              <th>Url name</th>
              <th>Short id</th>
              <th>Category</th>
              <th>Image</th>
              <th>Edit/Del</th>
            </tr>
          </thead>

          <tbody>
            {ar.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td className=' fw-bold text-center'>{(i + 1) + 10 * (numPage - 1)}</td>
                  <td>{item.name}</td>
                  <td>{item.url_name}</td>
                  <td>{item.short_id}</td>
                  <td>{catObj[item.cat_short_id]}</td>
                  <td>
                    <button className='d-flex mx-auto imges_see ' onClick={() => openInNewTab(item.img_url)}>
                      <div className=' text-center '>See the image </div>
                    </button>
                  </td>
                  <td className='text-center'>
                    <button onClick={() => {
                      nav("/admin/editSubCategory/" + item.url_name)
                    }} className='btn btn-primary rounded-pill px-2  btn-sm res_teb_edit mb-md-0'>Edit</button>
                    <button onClick={() => { delCategory(item._id) }} className='btn btn-danger ms-md-1 btnDell btn-sm'>X</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className='text-center me-5'>
        <PageLinks perPage="10" apiUrlAmount={API_URL + "/subCategories/amount"} urlLinkTo={"/admin/subCategoriesList"} clsCss="btn-sm  btn-dark me-1" />
      </div>
      {loading && <LoadingScreen />}
    </div>
  )
}

export default SubCategoriesList;