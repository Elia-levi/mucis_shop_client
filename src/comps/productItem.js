import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsStar, BsStarFill } from "react-icons/bs"

import { AppContext } from "../context/shopContext"


function ProducItem(props) {
  let { favs_ar, addRemoveFav } = useContext(AppContext)

  let item = props.item;
  let short_name;
  item.name.length > 52 ? short_name = item.name.slice(0, 48) + "..." : short_name = item.name;


  return (
    <div className='product-item col-md-6 col-lg-3  p-2 mb-1 '>
      <div className=" product-item-border ">
        <Link to={"/productInfo/" + item._id} >
          <div style={{ backgroundImage: `url(${item.img_url})` }} className='product-img'>
            {item.qty === 0 ?
              <div className='sold-out'>Sold out!</div> : ""
            }
          </div>
        </Link>

        <div className='align-items-end product-item-in row px-2 mt-1'>
          <h5 className='col-12'>{short_name}</h5>
          <div className='col-8 mb-2'>Price: ${item.price}</div>

          <div className='text-end  col-4 mb-2 '>
            {favs_ar.includes(item.short_id) ?
              <button onClick={() => {
                addRemoveFav(item.short_id)
              }} className='  btn-warning btn btn-sm text-white'>
                <BsStarFill className='' />
              </button> :
              <button onClick={() => {
                addRemoveFav(item.short_id)
              }} className='btn btn-outline-warning btn-sm'>
                <BsStar />
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProducItem