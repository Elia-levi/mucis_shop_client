import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch, BsCart3, BsCaretDownFill } from "react-icons/bs"

import { API_URL, doApiGet } from '../../services/apiService';
import LoadingScreen from '../../misc_comps/loadingScreen';
import SubCategoryHeadr from './subCategoryHeader';
import NavBar from './NavBar';

import { checkTokenLocal } from '../../services/localService';
import { AppContext } from "../../context/shopContext"


function ClientHeader(props) {
  const { showCart, setShowCart, cart_ar } = useContext(AppContext);

  const [loading, setLoading] = useState(false)
  const [ar, setAr] = useState([]);
  let [login, setLogin] = useState("");
  let [amount, setAmount] = useState(0);

  let inputRef = useRef();
  let location = useLocation();
  let nav = useNavigate();

  useEffect(() => {
    // check if login
    setLogin(checkTokenLocal())
    doApi();
    if (cart_ar.length !== 0) {
      let amount = cart_ar.length;
      setAmount(amount)
    } else {
      setAmount(0)
    }
    window.scrollTo(0, 0);
  }, [location, cart_ar])

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

  // work on every key click on the keyboard
  const onKeyboardClick = (e) => {
    // check if we click Enter 
    if (e.key === "Enter") {
      onSearchClick();
    }
  }

  const onSearchClick = () => {
    let input_val = inputRef.current.value;
    nav("/productsSearch?s=" + input_val);
  }


  return (
    <header className='shadow header-client container-fluid'>
      <div className="container">
        <NavBar />
        <div className="row justify-content-between align-items-center nav-user">
          <div className='col-2 logo d-flex'>
            <Link to="/">
              <h2 ><img src={"/images/Background1.png"} alt="logo" /></h2>
            </Link>
          </div>

          <nav className='col-md-10 nav-user'>
            <div className='d-flex align-items-center justify-content-between'>
              <ul className='nav '>
                <li><Link to="/">Home</Link></li>

                {/*mega_pop */}
                <li ><Link to="#" >Categories <BsCaretDownFill /></Link>
                  <div className='pop_up mega_pop'>
                    <div className="container">
                      <div className="row catHeader">
                        {ar.map(item => {
                          return (
                            <div className='col-3' key={item._id} >
                              <ul className='fw-semibold fst-italic text-danger list-group mt-3  ' style={{ fontSize: "1.4em" }}>{item.name}
                                <SubCategoryHeadr item={item} />
                              </ul>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </li>

                <li> <Link to="/checkout">Check out</Link></li>
                <li>  <Link to="/products_favs">Favorites</Link></li>
              </ul>

              <div className='col-md-5 d-flex justify-content-end align-items-center'>

                <div className='search_header d-flex border mx-xl-2 rounded'>
                  <input onKeyDown={onKeyboardClick} ref={inputRef} placeholder='search...' type="text" className='form-control' />
                  <button onClick={onSearchClick} className='btn '><BsSearch className='icon1' /></button>
                </div>

                <div className='cartOut  me-xl-3'>
                  <button onClick={() => { showCart === "none" ? setShowCart("block") : setShowCart("none") }} type="button" className="btn" >
                    <BsCart3 className='icon1 ' />
                  </button>
                  <span className=" badge rounded-pill bg-danger cartin">
                    {amount}
                  </span>
                </div>

                <div className='log_in_out'>
                  {login ?
                    <Link to="/logout" className='text-danger'>Log out</Link>
                    :
                    <React.Fragment >
                      <Link to="/login" >Login </Link>/
                      <Link to="/signup" > Sign up</Link>
                    </React.Fragment>
                  }
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div >
      {loading && <LoadingScreen />}
    </header >
  )
}

export default ClientHeader









