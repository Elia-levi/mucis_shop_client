import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API_URL, doApiMethod } from '../services/apiService';


function CheckoutItem(props) {
  let nav = useNavigate();

  let item = props.item;
  // fix date
  let date = item.date_created.replace("T"," ");
  date = date.substring(0,date.indexOf(":")+3);


  const delOrder = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        let url = API_URL + "/orders/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          toast.info("Order delted !");
        }
        // for show the new list without the order that we deleted
        props.doApi();
      }
      catch (err) {
        console.log(err.response);
        alert("there problem , try again later")
      }
    }
  }
  return (
    <tr>
      <td className=' fw-bold text-center'>{props.index + 1}</td>
      <td>{date}</td>
      <td>{item.status}</td>
      <td>{item.name}</td>
      <td>{item.address}</td>
      <td>${item.total_price}</td>
      <td className='text-center'>{item.products_ar.length}</td>
      <td className='text-center'>
        <button onClick={() => {
         nav("/admin/checkoutInfo/" + item._id)
        }} className='btn btn-info rounded-pill px-2  btn-sm res_teb_edit mb-md-0'>Info</button>
        <button onClick={() => { delOrder(item._id) }} className='btn btn-danger btnDell ms-md-1  btn-sm'>X</button>
      </td>
    </tr>
  )
}

export default CheckoutItem;