import React, {  useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";

import LoadingScreen from '../../misc_comps/loadingScreen';
import { API_URL, doApiMethod } from '../../services/apiService';


function PasswordRest(props) {
    document.title = "Music shop-rest password";

    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordShownAgin, setPasswordShownAgin] = useState(false);
    const [loading,setLoading] = useState(false)

    let nav = useNavigate();
    const { userId, resetString } = useParams();

    let { register, getValues, handleSubmit, formState: { errors } } = useForm();
    let passwordRef = register("newPassword", { required: true, minLength: 3 });
    let passwordRefAgain = register("passwordAgain", { validate: value => value === getValues("newPassword") });


    const onSubForm = (data) => {
        // data = the inputs in the form with ref in 1 object
        delete data.passwordAgain;
        data.userId=userId;
        data.resetString=resetString;
        doApi(data)
    }

    const doApi = async (_dataBody) => {
        setLoading(true);
        let url = API_URL + "/users/resetPassword";
        try {
            let resp = await doApiMethod(url, "POST", _dataBody);
            if(resp.data.status==="FAILED"){
              toast.error(resp.data.massage);
            }
            if (resp.data.status==="SUCCESS") {
              nav(`/emailSent`);
            }
          }
          catch (err) {
            toast.error("There some error come back later...")
          }
          setLoading(false);
    }

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    const togglePasswordAgin = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShownAgin(!passwordShownAgin);
    };

    return (
        <div className='container col-md-4 mx-auto mt-5 ' style={{ minHeight: "73vh" }}>
            <h2 className='text-center display-6 fw-bold my-4 fst-italic'>Password reset</h2>

            <form onSubmit={handleSubmit(onSubForm)} className='col-11  mx-auto  '>

                <label className='mt-2' style={{ fontSize: "0.9em" }}>Password</label>
                <div className='d-flex align-items-center border'>
                    <FaLock className='fs-5 mx-2' />
                    <input {...passwordRef} type={passwordShown ? "text" : "password"} className='form-control border-0' />
                    <span onClick={togglePassword} style={{ border: "0", background: "white", cursor: "pointer" }}>{passwordShown ? <BsFillEyeFill className='fs-6 mx-2' /> : <BsFillEyeSlashFill className='fs-6 mx-2' />}</span>
                </div>
                {errors.password ? <small style={{ fontSize: "0.8em" }} className='text-danger d-block'>* Enter valid password, min 3 chars</small> : ""}

                <label className='mt-2' style={{ fontSize: "0.9em" }}>Confirm your password</label>
                <div className='d-flex align-items-center border'>
                    <FaLock className='fs-5 mx-2' />
                    <input {...passwordRefAgain} type={passwordShownAgin ? "text" : "password"} className='form-control border-0' />
                    <span onClick={togglePasswordAgin} style={{ border: "0", background: "white", cursor: "pointer" }}>{passwordShownAgin ? <BsFillEyeFill className='fs-6 mx-2' /> : <BsFillEyeSlashFill className='fs-6 mx-2' />}</span>
                </div>
                {errors.passwordAgain ? <small style={{ fontSize: "0.8em" }} className='text-danger d-block'>* Password need to be equal to the first</small> : ""}

                <button className='btn btn-primary  mt-3 d-flex mx-auto rounded-pill pt-2 px-4'>Submit</button>
            </form>
            {loading && <LoadingScreen />}
        </div>
    )
}

export default PasswordRest