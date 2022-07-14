import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthClientComp from './authClientComp';

import LoadingScreen from '../../misc_comps/loadingScreen';

import { API_URL, doApiGet } from '../../services/apiService';


function UsrInfo(props) {
    document.title = "Music shop-profile";

    let [user,setUser] = useState({})
    const [loading,setLoading] = useState(false)
  
    useEffect(() => {
      doApiUser()
    },[])

    const doApiUser = async() => {
        setLoading(true);
        let url = API_URL+"/users/myInfo";
        let resp = await doApiGet(url)
        setUser(resp.data)
        setLoading(false)
      }

    return (
        <div className='container-fluid my-4' style={{ minHeight: "76vh" }}>
        <div className="container">
          <AuthClientComp />
          <h2 className='text-center display-6 fw-bold my-4 fst-italic'>User info</h2>
                <div className='col-lg-6'>
                <img src={user.img_user} />
                <Link to="/logout" className="text-danger">logout</Link>


                </div>
                <div className='col-lg-6'>
                    

                </div>

            </div>
            {loading && <LoadingScreen />}
        </div>

    )
}

export default UsrInfo

