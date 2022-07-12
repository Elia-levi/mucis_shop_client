import React from 'react';
import { Link, useParams } from 'react-router-dom';


function EmailSent(props) {
  document.title = "Music shop-Email sent";

  const { emailuser, reset } = useParams();

  return (
    <div className='container-fluid'>

      {/* email reset password */}
      {reset && emailuser && (
        <div className="text-center mt-5" style={{ height: "70vh" }}>
          <h1>Password reset</h1>
          <h5>An email with a password reset link has been sent to your email:<b>{emailuser}</b></h5>
          <h4>Check your email end come back to proceed!</h4>
        </div>
      )}

      {/* reset password success*/}
      {!reset && !emailuser && (
        <div className="text-center mt-5" style={{ height: "70vh" }}>
          <h1>Password reset</h1>
          <h5>Your password has been reset successfully</h5>
          <h4>You may now login!</h4>
          <button className='btn btn-primary mt-3 px-5 py-2 rounded-pill'><Link className='text-decoration-none text-white' to={`/login`}>Login</Link></button>
        </div>
      )}

      {/* email verfied */}
      {!reset && emailuser && (
        <div className="text-center mt-5" style={{ height: "70vh" }}>
          <h1>Account Confirmation</h1>
          <h5>An email with your account confirmation link has been sent to your email:<b>{emailuser}</b></h5>
          <h4>Check your email end come back to proceed!</h4>
          <button className='btn btn-primary mt-3 px-3 py-2 rounded-pill'><Link className='text-decoration-none text-white' to={`/login`}>Proceed</Link></button>
        </div>
      )}
    </div>
  )
}

export default EmailSent