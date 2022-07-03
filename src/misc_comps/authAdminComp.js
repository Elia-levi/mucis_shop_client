import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API_URL, doApiGet } from '../services/apiService';

  // comp that will added to another comps where the user
  // must be an admin

function AuthAdminComp(props){
  let nav = useNavigate();

  useEffect(() => {
    // check if there token in the browser
    if(localStorage["tok"]){
      doApi()
    }
    else{
      toast.error("You must be admin to be here! or you need to login again")
      nav("/admin")
    }
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async() => {
    let url = API_URL + "/users/myInfo";
    try{
      let resp = await doApiGet(url)
      // check if the token is of admin
      if(resp.data.role !== "admin"){
        toast.error("You must be admin to be here! or you need to login again")
        nav("/admin/logout")
      }
    }
    catch(err){
      // if there not token at all
      console.log(err.response);
      alert("You must be admin to be here! or you need to login again")
      nav("/admin/logout")
    }
  }

  return(
    <React.Fragment></React.Fragment>
  )
}

export default AuthAdminComp