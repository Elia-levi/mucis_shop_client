import React, { useEffect, useState } from 'react';

import ProducItem from '../productItem';
import AuthClientComp from './authClientComp';
import LoadingScreen from '../../misc_comps/loadingScreen';

import { API_URL, doApiGet } from '../../services/apiService';


function FavsProducts(props) {
  document.title = "Music shop-Favorites";

  let [ar,setAr] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    doApiListFav()
  },[])

  const doApiListFav = async() => {
    setLoading(true);
    let url = API_URL+"/favs/productsInfo";
    let resp = await doApiGet(url)
    setAr(resp.data)
    setLoading(false)
  }

  return (
    <div className='container-fluid my-4' style={{ minHeight: "85vh" }}>
      <div className="container">
        <AuthClientComp />
        <h3 className='text-center display-6'>List of products that you added to favorites</h3>
        <h5 className='text-center text-warning'>Click on star to remove them from the list</h5>
        <div className="row">
          {ar.map(item => {
            return (
              <ProducItem key={item._id} item={item} />
            )
          })}
        </div>
      </div>
      {loading && <LoadingScreen />}
    </div>
  )
}

export default FavsProducts