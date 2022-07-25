import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import LoadingScreen from '../../misc_comps/loadingScreen';


function OldOrderInfoClient(props){
  let [ar, setAr] = useState([]);
  let [orderInfo, setOrderInfo] = useState({});
  let [orderDate,setOrderDate] = useState("");
  const [loading, setLoading] = useState(false)
  let params = useParams();
  let nav = useNavigate()

 
  useEffect(() => {
    document.title = "Music shop -My order info";

    doApi();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    setLoading(true);
    let url = API_URL + "/orders/productsInfo/" + params.idOrder;
    let resp = await doApiGet(url);
    // console.log(resp.data);
    // defiendDate
    let date = resp.data.order.date_created.replace("T"," ");
    date = date.substring(0,date.indexOf(":")+3);
    setOrderDate(date);
    setOrderInfo(resp.data.order);
    setAr(resp.data.products);
    setLoading(false)
  }

  const openInNewTab = url => {
    // setting target to _blank with window.open
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return(
    <div className='container' style={{ minHeight: "83vh" }}>
        <h1 className='text-center display-6 fw-bold my-3 fst-italic mt-4'>Order info</h1>
        <div className='text-end'>
        <h5>Status of order: {orderInfo.status}</h5>
        <h5>Date: {orderDate}</h5>
        </div>
      <div className='d-flex justify-content-between align-items-center mb-1'>
        <button onClick={() => {
          nav(-1)
        }} className='btn btn-danger btn-sm'>Back</button>
        <h4 className='total_price'>Total price of order:${orderInfo.total_price}</h4>
      </div>      <div className="table-responsive">

      <table className='table text-wrap table-bordered border border-2 border-dark res_teb table-striped'>
        <thead style={{zIndex:"9"}}>
        <tr className='table-primary text-center'>
            <th>#</th>
            <th>name</th>
            <th>short_id</th>
            <th>img</th>
            <th>Price of one item</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td title={item.info}>{item.name}</td>
                <td>{item.short_id}</td>
                <td>
                    <button className='d-flex mx-auto imges_see ' onClick={() => openInNewTab(item.img_url)}>
                      <div className=' text-center '>See the image </div>
                    </button>
                  </td>
                <td>{item.price}</td>
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

export default OldOrderInfoClient