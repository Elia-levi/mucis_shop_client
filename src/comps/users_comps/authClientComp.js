import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../services/apiService';
import { SHOP_TOKEN } from '../../services/localService';

function AuthClientComp(props) {
  let nav = useNavigate()

  useEffect(() => {
    if (localStorage[SHOP_TOKEN]) {
      doApiAuth();
    }
    else {
      // nav to login
      nav("/login")
      // show toast message in yellow that the user must be connected    
      toast.warning("You must be logged in user to be here, please log in and come back")
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // check the token of user
  const doApiAuth = async () => {
    let url = API_URL + "/users/checkUserToken";
    try {
      await doApiGet(url);
    }
    catch (err) {
      toast.warning("You need to log in again.")
      nav("/logout")
      console.log(err.response);
    }
  }

  return (
    <React.Fragment></React.Fragment>
  )
}

export default AuthClientComp