import React from 'react';

function LoadingScreen(props){
  const loadingCss = {
    position:"fixed",
    width:"100%",
    height:"100%",
    background:"rgba(255,255,255)",
    top:0,
    left:0,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    zIndex:9999999
  }


  return(
    <div style={loadingCss}>
      <img style={{width:"300px"}} src="/images/loading.gif" alt="loading"/>
    </div> 
  )
}

export default LoadingScreen