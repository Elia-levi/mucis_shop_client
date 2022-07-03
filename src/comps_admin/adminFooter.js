import React from 'react';

function AdminFooter(props){
  let year =(new Date()).getFullYear();
  return(
    <footer className='footer-admin container-fluid bg-dark text-white mt-4'>
      <div className="container text-center">
        All rights reserved to team of music shop  {year}

      </div>
      </footer> 
  )
}

export default AdminFooter