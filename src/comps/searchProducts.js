import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ProducItem from './productItem';
import LoadingScreen from '../misc_comps/loadingScreen';

import { API_URL, doApiGet } from '../services/apiService';


function SearchProducts(props){
  document.title = "Music shop-Search product";

  const [ar,setAr] = useState([]); 
  const [whatSearch,setWhatSearch] = useState("");
  const [loading,setLoading] = useState(false)

  let location = useLocation();
  
  useEffect(() => {
    doApi()
  },[location]) // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async() => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    let searchQuery = urlParams.get("s") || "";
    if(searchQuery===""){

    }else{
    setWhatSearch(searchQuery);
    let url = API_URL+"/products/search?s="+searchQuery;
    let resp = await doApiGet(url);
    setAr(resp.data);
    }
    setLoading(false)
  }

  return(
    <div className='container-fluid pb-4' style={{ minHeight: "85vh" }}>
      <div className="container">
        <h2 className='text-center my-4'>Search for "{whatSearch}"</h2>

        {ar.length === 0  ? <h3 className='text-center'>Search not match, try another query</h3> : ""}
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

export default SearchProducts