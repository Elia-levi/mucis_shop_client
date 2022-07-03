import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import LoadingScreen from '../misc_comps/loadingScreen';
import PageLinks from '../misc_comps/pageLinks';
import ProducItem from './productItem';

import { API_URL, doApiGet } from '../services/apiService';


function ProductsListPage(props) {
  document.title = "Music shop-Products list";

  const [ar, setAr] = useState([])
  const [shortId, setShortId] = useState(0)
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const location = useLocation();
  let params = useParams();

  useEffect(() => {
    setAr([]);
    doApi();
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    setLoading(true);

    // First of all a collection of information about the subcategory according to its own
    // So I have the abbreviated ID to bring all the products
    let urlCategory = API_URL + "/subCategories/single/" + params.cat_url;
    let resp1 = await doApiGet(urlCategory);
    let short_id = resp1.data?.short_id;
    let name1 = resp1.data?.name;
    setName(name1)
    setShortId(short_id)

    // get page number
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    let urlProds = API_URL + "/products/?perPage=8&cat=" + short_id + "&page=" + pageQuery;
    let resp2 = await doApiGet(urlProds)
    setAr(resp2.data)

    // check amount of produts of category:
    let urlAmounts = API_URL + "/products/amount?cat=" + short_id;
    let resp3 = await doApiGet(urlAmounts);
    setAmount(resp3.data.amount)
    setLoading(false)
  }
  

  return (
    <div className='container-fluid' style={{ minHeight: "85vh" }}>
      <div className="container">

        {ar.length === 0 ? <h4 className='text-center fw-semibold fs-3 fst-italic my-4'>No products found in this subcategory ({name})</h4> : <h4 className='text-center fw-semibold fs-3 fst-italic my-4'>Products of {name}</h4>}

        <div className="row mb-5">
          {ar.map(item => {
            return (
              <ProducItem key={item._id} item={item} />
            )
          })}
        </div>
        
        <div className='d-flex justify-content-center'>
          {amount < 9 ? "" :
            <PageLinks perPage="8" apiUrlAmount={API_URL + "/products/amount?cat=" + shortId} urlLinkTo={"/products/" + params.cat_url} clsCss="btn-sm btn-dark me-1" />
          }
        </div>
      </div>
      {loading && <LoadingScreen />}
    </div>
  )
}

export default ProductsListPage