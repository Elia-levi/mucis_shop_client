import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from "../../context/shopContext"
import CartItem from './cartItem';

import "../css/cart.css";


function Cart(props) {
  const { showCart, cart_ar } = useContext(AppContext);

  const [total, setTotal] = useState(0);


  useEffect(() => {
    let sumTotal = 0;
    cart_ar.forEach(item => {
      sumTotal += item.price;
    })
    setTotal(sumTotal)
  }, [cart_ar])

  return (
    <div className={showCart === "none" ? 'cart shadow' : 'cart active '} >
      <h4 className='text-center border-bottom fw-bolder fst-italic p-2 border-dark text-danger m-0 '>Products in carts</h4>
      {cart_ar.map(item => {
        return (
          <CartItem key={item._id} item={item} />
        )
      })}
      <div className='d-flex  border-top  border-dark pt-1 justify-content-between align-items-center'>
        <h4 className='ps-1'>Total: ${total}</h4>
        <Link to={"/checkout"} className='btn btn-info text-white btn-sm me-1 text-decoration-none'>to check out</Link >
      </div>
    </div>
  )
}

export default Cart