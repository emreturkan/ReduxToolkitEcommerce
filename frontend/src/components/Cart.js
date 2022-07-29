import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeCart,removeItem,desc,inc, getTotal } from '../store/cartSlice'
const Cart = () => {
  const {cartItems,cartTotalAmount} = useSelector(state=>state.cartSlice)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getTotal())
  },[cartItems])

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your Cart is Empty</p>
          <div className="start-shopping">
            <Link to='/'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
        <div>
          <div className="titles">
            <h3 className='product-title'>Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cartItems?.map(item=>(
              <div key={item.id} className="cart-item">
                <div className="cart-product">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <button onClick={()=>dispatch(removeItem(item.id))}>Remove</button>
                  </div>
                </div>

                <div className="cart-product-price">
                  ${item.price}
                </div>

                <div className="cart-product-quantity">
                  <button onClick={()=>{dispatch(desc(item.id))}}>-</button>
                  <span className='count'>{item.cartQuantity}</span>
                  <button onClick={()=>dispatch(inc(item.id))}>+</button>
                </div>

                <div className="cart-product-total-price">
                    ${item.price * item.cartQuantity}
                </div>

              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button onClick={()=>dispatch(removeCart())} className='clear-cart'>Clear Cart</button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className='amount'>${cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button>Check out</button>
              <div className="continue-shopping">
            <Link to='/'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>
              <span className='start-shopping'>Start Shopping</span>
            </Link>
          </div>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  )
}

export default Cart