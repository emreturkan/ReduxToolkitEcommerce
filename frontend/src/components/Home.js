import React from 'react'
import { addToCart } from '../store/cartSlice'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const {items} = useSelector(state=>state.productSlice)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddToCart = (product)=>{
    dispatch(addToCart(product))
    navigate('/cart')
  }

  return (
    <div className='home-container'>
      <h2>new arrivels</h2>
      <div className="products">
        {items?.map(product=>(
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} />
            <div className="details">
              <span>{product.desc}</span>
              <span className='price'>{product.price}</span>
            </div>
            <button onClick={()=>handleAddToCart(product)}>Add To Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home