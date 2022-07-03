import React, { useContext, useEffect, useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2"
import { toast } from 'react-toastify';

import { API_URL, doApiMethod } from '../../services/apiService';
import LoadingScreen from '../../misc_comps/loadingScreen';
import AuthClientComp from '../users_comps/authClientComp';

import { AppContext } from "../../context/shopContext"


function Checkout(props) {
  document.title = "Music shop-Check out";

  const { cart_ar, setShowCart, updateCart } = useContext(AppContext);

  const [cartEmpty, setCartEmpty] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setShowCart("none")
    // Check if there products in the cart
    if (cart_ar.length > 0) {
      setCartEmpty(false)
      //post the products in the db order
      doApiAddToCheckout()
    }
    else {
      setCartEmpty(true)
      setTotal(0)
    }
  }, [cart_ar]) // eslint-disable-line react-hooks/exhaustive-deps

  const doApiAddToCheckout = async () => {
    setLoading(true);
    // add to checkout
    let url = API_URL + '/orders';
    let total_price = 0
    let products_ar = cart_ar.map(item => {
      total_price += item.price;
      return {
        s_id: item.short_id,
        amount: 1,
        price: item.price
      }
    })
    setTotal(total_price)
    await doApiMethod(url, "POST", { total_price, products_ar })
    setLoading(false)
  }

  const onXclick = (_delProdId) => {
    // delete from the cart in context the product and update it in local
    setLoading(true)
    let temp_ar = cart_ar.filter(prod => prod._id !== _delProdId);
    updateCart(temp_ar);
    setLoading(false)
  }

  const onCommit = async (_data) => {
    setLoading(true);
    if (cart_ar.length > 0) {
      let url = API_URL + "/orders/orderPaid/"
      let paypalObject = {
        tokenId: _data.facilitatorAccessToken,
        orderId: _data.orderID,
        realPay: "sandbox" //if yes is real
      }
      let resp = await doApiMethod(url, "PATCH", paypalObject);
      if (resp.data.modifiedCount === 1) {
        toast.success("Your order completed");
        updateCart([]);
      }
    }
    setLoading(false)
  }


  return (
    <div className='container mt-3' style={{ minHeight: "85vh" }}>
      <AuthClientComp />

      {cartEmpty ? <h2>Cart is empty</h2> : <h3>Products in cart:</h3>}
      <div className="row">
        <div className="col-md-8">

          <h4>Total price: {total} nis</h4>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                <th>amount</th>
                <th>price</th>
                <th>del</th>
              </tr>
            </thead>
            <tbody>
              {cart_ar.map((item, i) => {
                return (
                  <tr key={item._id} title={item.info}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>1</td>
                    <td>{item.price}</td>
                    <td>
                      <button onClick={() => { onXclick(item._id) }} className="badge bg-danger">X</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className='col-md-4' style={{ zIndex: "9" }}>
          <h3>Choose paid method:</h3>
          <PayPalButton
            currency="ILS"
            amount={total}
            options={{
              clientId: "AfTPtCDaFOpp32hqC4lVMHZuaBIK-bp4tLPCI1YHTQ4PY5RgbnMRLnFxEROYpzXl2ahx68vN5mCPS0mk"
            }}
            onSuccess={(details, data) => {
              // data - have info of pay token to check in nodejs
              console.log("data", data);
              // details have info about the buyer
              console.log("details", details);
              // if payment success ,
              if (data.orderID) {
                onCommit(data);

              }
            }}
            onCancel={(err) => {
              toast.error("The process end before the payment, try again")
            }}
          />
        </div>
      </div>
      {loading && <LoadingScreen />}

    </div>
  )
}

export default Checkout