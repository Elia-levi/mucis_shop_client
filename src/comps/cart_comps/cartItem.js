import React, { useContext } from 'react';
import {AppContext} from "../../context/shopContext"

function CartItem(props){
  const {cart_ar, updateCart} = useContext(AppContext);

  let item = props.item;

  // remove from cart
  const onRemoveItemClick = () => {
    // filter the item of the product in the comp from the cart_ar
    let temp_ar = cart_ar.filter(prod => prod._id !== item._id);
    updateCart(temp_ar);
  }

  return(
    <div className='border py-1 px-1 overflow-hidden ' >
      <p className='fw-semibold ps-1'>{item.name}. </p>
      <button onClick={onRemoveItemClick} className='float-end btn btn-sm text-danger m-0 pe-2 p-0'>X</button>
      <p className='fw-bold m-0 p-0 ps-1'>${item.price}</p>
  
    </div> 
  )
}

export default CartItem