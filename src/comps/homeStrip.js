import React from 'react';

function HomeStrip(props){
  return(
    <div style={{backgroundImage:"url(/images/strip.jpg)"}} className='strip_home container-fluid d-flex pt-5'>
      <div className="container ">
        <h2 className='h1'>Welcome to music shop</h2>
        <h4> Shop that you can find everthing!</h4>
      </div>
    </div> 
  )
}

export default HomeStrip