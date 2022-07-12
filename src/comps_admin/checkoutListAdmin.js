import React, { useEffect, useState,useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { API_URL, doApiGet } from '../services/apiService';
import CheckoutItem from './checkoutItem';
import LoadingScreen from '../misc_comps/loadingScreen';
import AuthAdminComp from '../misc_comps/authAdminComp';
import PageLinks from '../misc_comps/pageLinks';


function CheckoutListAdmin(props) {
  document.title = "Admin panel - Order List";

  const [ar, setAr] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false)

  // for collect query string from url like ?page=
  const [query] = useSearchParams()
  const location = useLocation();
  const sortRef = useRef("");
  const checkboxRef = useRef(null);

  useEffect(() => {
    doApi();
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    setLoading(true);
    try {
      let pageQ = query.get("page") || 1;
      setPage(pageQ - 1)

      let url;
      (checkboxRef.current.checked) ? url = API_URL + "/orders/allOrders?page=" + pageQ+"&sort="+sortRef.current.value+"&reverse=yes" : url = API_URL + "/orders/allOrders?page=" + pageQ+"&sort="+sortRef.current.value
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

  const doFilter = async() => {
    doApi();
  };

  return (
    <div className='container' style={{ minHeight: "83vh" }}>
      <AuthAdminComp />
      <h1 className='text-center display-5 fw-bold my-4 fst-italic'>List of Order in system</h1>

      <div className=' d-lg-flex  col-lg-7'>
        <div className='col-lg-4 col-md-4 d-lg-flex'>
          <label className=' fw-bold mb-1 me-1'>filter:</label>
          <select ref={sortRef} className='form-select form-select-sm mb-1 me-2'>
            <option value="" >Choose filter</option>
            <option value="status" >status</option>
            <option value="date_created" >date</option>

          </select>
          </div>

          <div className=' ms-3 col-lg-3 d-md-flex'>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" ref={checkboxRef} value=""/>
              <label className="form-check-label" style={{fontSize:"0.7em" ,fontWeight:"bold"}}>
              From the largest to the smallest
              </label>
              </div>
          </div>
          <button className='btn btn-primary btn-sm rounded-pill mb-1' onClick={doFilter}>search</button>
        </div>

      <div className="table-responsive">
      <table className='table overflow-auto table-striped table-bordered border border-2 border-dark res_teb'>

        <thead style={{zIndex:"9"}}>
          <tr className='table-danger text-center'>
            <th>#</th>
            <th>Date</th>
            <th>Status</th>
            <th>Name</th>
            <th>Address</th>
            <th>Total price</th>
            <th className='col-1' style={{fontSize:"0.8em"}}>Quantity of products</th>
            <th>Info/Del</th>
          </tr>
        </thead>

        <tbody>
          {ar.map((item, i) => {
            return (
              <CheckoutItem key={item._id} item={item} index={i + page * 10} doApi={doApi} />
            )
          })}
        </tbody>
      </table>
      </div>

      <div className='text-center me-5'>
        <PageLinks perPage="10" apiUrlAmount={API_URL + "/orders/allOrdersCount"} urlLinkTo={"/admin/checkout"} clsCss="btn-sm shadow btn-dark me-1" />
      </div>
      {loading && <LoadingScreen />}
    </div>
  )
}

export default CheckoutListAdmin