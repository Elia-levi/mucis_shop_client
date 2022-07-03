import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shuffle }from 'lodash'

import ProducItem from './productItem';
import LoadingScreen from '../misc_comps/loadingScreen';

import { API_URL, doApiGet } from '../services/apiService';


function InfoProductsList(props){
  let [ar,setAr] = useState([]);
  const [loading,setLoading] = useState(false)

  let params = useParams();

  useEffect(() => {
    setLoading(true);
    doApi()
  },[params.id])// eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async() =>{ 
    let url = API_URL+"/products?perPage=100&cat="+props.cat_short_id;
    // let url = API_URL+"/products?perPage=100";
    let resp = await doApiGet(url);
    // check if we are in the product page
    // not show it again in the list of new products
    // in first time
    let temp_ar = resp.data;
    temp_ar = temp_ar.filter(item => {
      return item._id !== params.id;
    })
    if(temp_ar.length > 4){
      temp_ar=shuffle(temp_ar);
      temp_ar=temp_ar.splice(0,4);
    }
    setAr(temp_ar);
    setLoading(false)
  }
  

  return(
    <div className='mt-5 mb-3 border-top border-dark'>
      {ar.length>0 ?
      <h2 className='text-center fw-bold fs-2 fst-italic my-4'>
        More products in our store
      </h2>:""}
      <div className="row">
        {ar.map(item => {
          return(
            <ProducItem key={item._id} item={item} />
          )
        })}
      </div>
      {loading && <LoadingScreen />}
    </div> 
  )
}

export default InfoProductsList