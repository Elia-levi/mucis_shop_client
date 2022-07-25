import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import LoadingScreen from '../misc_comps/loadingScreen';

import { API_URL, doApiGet } from '../services/apiService';


function HomeCategoryList(props) {
  const [ar, setAr] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    setLoading(true);
    try {
      let url = API_URL + "/categories";
      let resp = await doApiGet(url);
      setAr(resp.data);
    }
    catch (err) {
      console.log(err.response);
      alert("There problem try again later")
    }
    setLoading(false)
  }


  return (
    <div className='container-fluid shadow border-bottom border-dark '>
      <div className='container py-4 categories_list'>
        <h2 className='text-center display-6 fw-bold my-2 fst-italic'>Choose category of products</h2>
        <div className="row">
          {ar.map(item => {
            return (
              <Link to={"/subCategories/" + item.url_name} key={item._id} className='myCard col-md-6 col-lg-4 p-2'>
                <div className="shadow text-dark ">
                  <div style={{ backgroundImage: `url(${item.img_url})` }} className='img_card d-flex'>
                    <h5 className='p-2 my-auto img_card_in'>{item.name}</h5>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      {loading && <LoadingScreen />}
    </div>
  )
}

export default HomeCategoryList