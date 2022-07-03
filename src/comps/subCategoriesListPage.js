import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import PageLinks from '../misc_comps/pageLinks';
import LoadingScreen from '../misc_comps/loadingScreen';

import { API_URL, doApiGet } from '../services/apiService';

import "./css/home.css";


function SubCategoriesListPage(props) {
  document.title = "Music shop-Subcategories list";

  const [ar, setAr] = useState([])
  const [shortId, setShortId] = useState(0)
  const [amount, setAmount] = useState(0)
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false)

  const location = useLocation();
  let params = useParams();

  useEffect(() => {
    setAr([]);
    doApi();
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    setLoading(true);
    // First of all a collection of information about the category according to its own
    // So I have the abbreviated ID to bring all the subcategories
    let urlCategory = API_URL + "/categories/single/" + params.cat_url;
    let resp1 = await doApiGet(urlCategory);
    let short_id = resp1.data?.short_id;
    let name1 = resp1.data?.name;
    setName(name1)
    setShortId(short_id)

    // get page number
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    let urlProds = API_URL + "/subCategories/?perPage=9&cat=" + short_id + "&page=" + pageQuery;
    let resp2 = await doApiGet(urlProds)
    setAr(resp2.data)

    // check amount of produts of category:
    let urlAmounts = API_URL + "/subCategories/amount?cat=" + short_id;
    let resp3 = await doApiGet(urlAmounts);
    setAmount(resp3.data.amount)
    setLoading(false)
  }

  return (
    <div className='container-fluid' style={{ minHeight: "85vh" }}>
      <div className="container ">

        {ar.length === 0 ? <h4 className='text-center fw-semibold fs-3 fst-italic my-4'>No subcategories found in this category ({name})</h4> : <h4 className='text-center fw-semibold fs-3 fst-italic my-4'>Sub Categories of {name}</h4>}

        <div className="row subcategories_list">
          {ar.map(item => {
            return (
              <Link to={"/products/" + item.url_name} key={item._id} className='myCard col-md-6 col-lg-4 p-3'>
                <div className="shadow   text-dark ">
                  <div style={{ backgroundImage: `url(${item.img_url})` }} className='img_card d-flex'>
                    <h5 className='p-2 my-auto img_card_in'>{item.name}</h5>
                  </div>
                </div>
              </Link>)
          })}
        </div>

        <div className='d-flex justify-content-center '>
          {amount < 10 ? "" :
            <PageLinks perPage="9" apiUrlAmount={API_URL + "/subCategories/amount?cat=" + shortId} urlLinkTo={"/subCategories/" + params.cat_url} clsCss="btn-sm btn-dark me-1" />
          }
        </div>
      </div>
      {loading && <LoadingScreen />}
    </div>
  )
}

export default SubCategoriesListPage