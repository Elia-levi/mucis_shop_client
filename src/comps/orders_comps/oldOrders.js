import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import AuthClientComp from '../users_comps/authClientComp';
import LoadingScreen from '../../misc_comps/loadingScreen';


function OldOrders(props){
  document.title = "Music shop - My order";

  const [ar,setAr] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    doApi();
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async() => {
    setLoading(true);
    let url = API_URL+"/orders/userOrder";
    let resp = await doApiGet(url);
    // console.log(resp.data)
    let temp_ar = resp.data.filter(item => item.status !== "pending")
    setAr(temp_ar);
    setLoading(false)
  }

  return(
    <div className='container mt-3' style={{ minHeight: "85vh" }}>
      <AuthClientComp />
      <h1 className='text-center display-5 fw-bold my-4 fst-italic'>My order</h1>
      <div className="table-responsive">

      <table className='table text-wrap table-bordered border border-2 border-dark res_teb table-striped'>
        <thead style={{zIndex:"9"}} >
          <tr className='table-primary text-center '>
            <th>#</th>
            <th>status</th>
            <th>total price</th>
            <th>Date of order</th>
            <th>info</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {ar.map((item,i) => {
            let date = item.date_created.replace("T"," ");
            date = date.substring(0,date.indexOf(":")+3);

            return(
             <tr key={item._id}>
               <td>{i+1}</td>
               <td>{item.status}</td>
               <td>{item.total_price}</td>
               <td>{date}</td>
               <td>
                 <Link style={{textDecoration:"none"}} to={"/oldOrders/"+item._id}>More info</Link>
               </td>
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

export default OldOrders