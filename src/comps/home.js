import React from 'react';

import HomeStrip from './homeStrip';
import HomeCategoryList from './homeCategoryList';
import HomeAbut from './homeAbout';
import ProductsHome from './productsHome';

import "./css/home.css"

function Home(props){
    document.title="Music shop-Home";


  return(
    <React.Fragment>
      <HomeStrip />
      <HomeCategoryList />
      <HomeAbut />
      <ProductsHome />
    </React.Fragment> 
  )
}

export default Home