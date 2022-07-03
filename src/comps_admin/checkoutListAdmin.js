import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    doApi();
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    setLoading(true);
    try {
      let pageQ = query.get("page") || 1;
      setPage(pageQ - 1)
      let url = API_URL + "/orders/allOrders?page=" + pageQ;
      let resp = await doApiGet(url);
      setAr(resp.data);
    }
    catch (err) {
      alert("there problem come back later")
      if (err.response) {
        console.log(err.response.data)
      }
    }
    setLoading(false)
  }

  return (
    <div className='container' style={{ minHeight: "83vh" }}>
      <AuthAdminComp />
      <h1 className='text-center display-5 fw-bold my-3 fst-italic'>List of Order in system</h1>

      <div className="table-responsive">
      <table className='table overflow-auto table-striped table-bordered border border-2 border-dark res_teb'>

        <thead>
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