import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BsCart3} from "react-icons/bs"

import InfoProductsList from './infoProductsList';
import LoadingScreen from '../misc_comps/loadingScreen';

import { API_URL, doApiGet } from '../services/apiService';
import { addProdVisitedToLocal } from '../services/localService';
import {AppContext} from "../context/shopContext"


function ProductInfo(props){
  document.title = "Music shop-Product info";

  const {addToCart } = useContext(AppContext);

  const [product,setProduct] = useState({});
  const [loading,setLoading] = useState(false)

  let params = useParams();
  let nav = useNavigate();
  let location = useLocation();

  useEffect(() => {
    setLoading(true);
    doApi();
  },[location]) // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async() => {
    let url = API_URL + "/products/single/"+params.id;
    let resp = await doApiGet(url);
     setProduct(resp.data)
    //  save in visited in local
     addProdVisitedToLocal(resp.data.short_id)
     setLoading(false)
  }

  const onAddToCartClick = () => {
    // ...cart_ar - take all cell from the old and add new product
    addToCart(product)
  }

  return(
    <div className='container p-4' style={{minHeight:"85vh"}}>
      <div className="row">      

        <div className="col-md-4">
          <img src={product.img_url } alt={product.name} className='img-thumbnail shadow' style={{height:"400px" ,width:"450px"}} />
        </div>

        <div className="col-md-8">
          <h2 className='h2-info'>{product.name}</h2>
          <p><strong>Info:</strong> {product.info}</p>
          <h5>Price: ${product.price}</h5>
          <h6>Quantity: {product.qty} </h6>
          
          <button onClick={() => {
            nav(-1);
          }} className='btn btn-danger mt-2'>Back</button>

          {product.qty > 0 ? 
          <button onClick={onAddToCartClick} className="btn btn-info ms-2 mt-2">Add to cart 
          <BsCart3 className="ms-2 mb-1"/>+
          </button> :
           <button  className="btn  btn-danger ms-2 mt-2">SOLD OUT!!!</button>
          }
        </div>
      </div>

      {product.cat_short_id ? 
      <InfoProductsList cat_short_id={product.cat_short_id} />
      : "" }

      {loading && <LoadingScreen />}
    </div> 
  )
}

export default ProductInfo