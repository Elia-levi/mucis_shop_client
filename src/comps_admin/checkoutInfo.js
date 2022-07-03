import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import LoadingScreen from '../misc_comps/loadingScreen';
import AuthAdminComp from '../misc_comps/authAdminComp';



// show info about the order checkout
// also give the option to change status
function CheckoutInfo(props) {
  document.title = "Admin panel - Order info";

  let [ar, setAr] = useState([]);
  let [orderInfo, setOrderInfo] = useState({});
  const [loading, setLoading] = useState(false)

  let params = useParams();
  let selectRef = useRef();
  let nav = useNavigate()

  useEffect(() => {
    doApi();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    setLoading(true);
    let url = API_URL + "/orders/productsInfo/" + params.id;
    let resp = await doApiGet(url);
    setOrderInfo(resp.data.order);
    setAr(resp.data.products);
    setLoading(false)
  }

  const onStatusChanged = async () => {
    let status = selectRef.current.value;
    let url = API_URL + "/orders/" + orderInfo._id + "?status=" + status;
    let resp = await doApiMethod(url, "PATCH", {});
    if (resp.data.modifiedCount === 1) {
      doApi();
    }
  }

  const openInNewTab = url => {
    // setting target to _blank with window.open
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='container' style={{ minHeight: "83vh" }}>
      <AuthAdminComp />
      <h1 className='text-center display-6 fw-bold my-3 fst-italic'>Order info</h1>

      <div className="row">

        <div className="col-md-6 p-3">
          <div className="p-3 border bg-light  text-dark shadow border border-dark rounded bg-opacity-75" style={{ height: "130px" }}>
            <h5 >Name: <small>{orderInfo.name}</small></h5>
            <h5 >Address: <small>{orderInfo.address}</small></h5>
            <h5 >phone: <small>{orderInfo.phone}</small></h5>
          </div>
        </div>

        <article className="col-md-6 p-3">
          <div className="p-3 border bg-light  text-dark shadow  border border-dark rounded bg-opacity-75" style={{ height: "130px" }}>
            <h5 >Status of order:
              <small className=' fw-bold'> {orderInfo.status}</small></h5>
            <h5>Change status:</h5>
            <select defaultValue={orderInfo.status} ref={selectRef} onChange={() => { onStatusChanged() }} className='form-select'>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="canceld">Canceld</option>
            </select>
          </div>
        </article>
      </div>

      <div className='d-flex justify-content-between align-items-center mb-1'>
        <button onClick={() => {
          nav(-1)
        }} className='btn btn-danger'>Back</button>
        <h4 className='total_price'>Total price of order:${orderInfo.total_price}</h4>
      </div>

      <div className="table-responsive">
        <table className='table overflow-auto table-striped table-bordered border border-2 border-dark res_teb'>
          <thead>
            <tr className='table-danger text-center '>
              <th>#</th>
              <th>Name</th>
              <th>Short_id</th>
              <th>Image</th>
              <th className='col-1'>Price of one item</th>
            </tr>
          </thead>

          <tbody>
            {ar.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td className=' fw-bold text-center'>{i + 1}</td>
                  <td title={item.info}>{item.name}</td>
                  <td>{item.short_id}</td>
                  <td>
                    <button className='d-flex mx-auto imges_see ' onClick={() => openInNewTab(item.img_url)}>
                      <div className=' text-center '>See the image </div>
                    </button>
                  </td>
                  <td className='text-center' >${item.price}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {loading && <LoadingScreen />}
    </div>
  )
}

export default CheckoutInfo