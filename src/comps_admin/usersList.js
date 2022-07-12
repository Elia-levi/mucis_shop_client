import React, { useEffect, useState,useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import AuthAdminComp from '../misc_comps/authAdminComp';
import LoadingScreen from '../misc_comps/loadingScreen';
import PageLinks from '../misc_comps/pageLinks';


function UsersList(props) {
  document.title = "Admin panel - User list";

  let [ar, setAr] = useState([]);
  const [loading, setLoading] = useState(false)
  const [ChangeRole, setChangeRole] = useState(false)
  let [numPage, setPageNum] = useState(1);

  let location = useLocation()
  const sortRef = useRef("");
  const checkboxRef = useRef(null);

  useEffect(() => {
    doApi()
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    setLoading(true);

    //?page collect query string
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    setPageNum(pageQuery)

    let url;
    (checkboxRef.current.checked) ? url = API_URL + "/users/usersList?page=" + numPage+"&sort="+sortRef.current.value+"&reverse=yes" : url = API_URL + "/users/usersList?page=" + numPage+"&sort="+sortRef.current.value

    try {
      let resp = await doApiGet(url);
      setAr(resp.data);
    }
    catch (err) {
      if (err.response) {
        console.log(err.response.data)
        alert("there problem come back later")
      }
    }
    setLoading(false)
  }

  const delUser = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setLoading(true);
      try {
        let url = API_URL + "/users/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          toast.info("users delted !");
        }
        // for show the new list without the product that we deleted
        doApi();
      }
      catch (err) {
        console.log(err.response);
        alert("there problem , try again later")
      }
    }
    setLoading(false)
  }

  // change role user for admin or back to regular user
  const changeRole = async (_name, _userId, _role) => {
    if (window.confirm("Are you sure you want to change " + _name + " to the " + _role + "?")) {
      setLoading(true);
      let url = API_URL + `/users/changeRole/${_userId}/${_role}`;
      try {
        let resp = await doApiMethod(url, "PATCH", {});
        if (resp.data.modifiedCount) {
          doApi();
        }
      }
      catch (err) {
        if (err.response) {
          console.log(err.response.data)
          alert("there problem come back later")
        }
      }
    }
    setLoading(false)
    setChangeRole(false)
  }

  const doFilter = async() => {
    doApi();
  };

  return (
    <div className='container' style={{ minHeight: "83vh" }}>
      <AuthAdminComp />
      <h1 className='text-center display-5 fw-bold my-4 fst-italic'>List of Users in system</h1>

      <div className='row justify-content-between align-items-center'>

        <div className='col-lg-5 d-lg-flex col-md-4'>
          <label className=' fw-bold mb-1 me-1'>filter:</label>
          <select ref={sortRef} className='form-select form-select-sm mb-1 me-2'>
            <option value="" >Choose filter</option>
            <option value="name" >name</option>
            <option value="role" >role</option>
          </select>

          <div className='col-lg-5 ms-3 d-md-flex'>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" ref={checkboxRef} value="" />
              <label className="form-check-label" style={{ fontSize: "0.7em", fontWeight: "bold" }}>
                From the largest to the smallest
              </label>
            </div>
          </div>
          <button className='btn btn-primary btn-sm rounded-pill mb-1' onClick={doFilter}>search</button>

        </div>

        <div className='col-lg-3'>
          <div className='d-flex justify-content-lg-end'>
            {ChangeRole ? <button className='btn border-white btn-outline-danger  mb-1 ' onClick={() => {
              setChangeRole(false)
            }} >X</button> :
              <button className='btn btn-primary border border-dark  mb-1 ' onClick={() => {
                setChangeRole(true)
              }} >Change the role</button>}
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className='table overflow-auto table-striped table-bordered border border-2 border-dark res_teb'>

          <thead style={{zIndex:"9"}}>
            <tr className='table-info text-center '>
              <th >#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Role</th>
              {ChangeRole ? <th className='col-1'>Change</th> :
                <th>Del</th>}
            </tr>
          </thead>

          <tbody>
            {ar.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td className=' fw-bold text-center'>{(i + 1) + 10 * (numPage - 1)}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td className='text-center '>

                    {(item.role === "admin") ?
                      <div className='fw-bold text-primary '>Admin</div>
                      :
                      <div className='text-dark'>User</div>
                    }
                  </td>

                  {ChangeRole ? <td>
                    {(item.role === "admin") ?
                      <button onClick={() => {
                        changeRole(item.name, item._id, "user")
                      }} className='btn-sm px-3 btn-outline-dark rounded-pill d-flex mx-auto'>Change to user</button>
                      :
                      <button
                        onClick={() => {
                          changeRole(item.name, item._id, "admin")
                        }}
                        className='btn-sm btn-outline-primary  rounded-pill d-flex mx-auto'>Change to admin</button>
                    }
                  </td> :
                    <td>
                      <button onClick={() => { delUser(item._id) }} className='btn-sm btn btn-danger btnDell d-flex mx-auto'>X</button>
                    </td>}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>


      <div className='text-center me-5'>
        <PageLinks perPage="10" apiUrlAmount={API_URL + "/users/amount"} urlLinkTo={"/admin/users"} clsCss="btn-sm  btn-dark me-1" />
      </div>
      {loading && <LoadingScreen />}
    </div>
  )
}

export default UsersList;