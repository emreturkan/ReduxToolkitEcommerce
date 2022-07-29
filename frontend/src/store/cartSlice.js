import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState={
    cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): [],
    cartTotalQuantity:0,
    cartTotalAmount:0
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
             const itemIndex = state.cartItems.findIndex(item=> item.id === action.payload.id)
             
             if(itemIndex>=0){
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info('increased product quantity',{
                    position:'bottom-left'
                })
             }
             else{
                const tempProduct = {...action.payload,cartQuantity:1}
                state.cartItems.push(tempProduct)
                toast.success('added new product to cart',{
                    position:'bottom-left'
                })
             }

             localStorage.setItem('cartItems',JSON.stringify(state.cartItems))

        },
        removeCart:(state,action)=>{
            state.cartItems = []
            localStorage.removeItem('cartItems')
        },
        removeItem:(state,action)=>{
           state.cartItems = state.cartItems.filter(item=> item.id !== action.payload)
           localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        desc:(state,action)=>{
            const itemIndex = state.cartItems.findIndex(item=> item.id === action.payload)
            if(state.cartItems[itemIndex].cartQuantity >1){
                state.cartItems[itemIndex].cartQuantity -= 1
                localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
            }
            else if(state.cartItems[itemIndex].cartQuantity === 1){
                state.cartItems = state.cartItems.filter(item=> item.id !== action.payload)
                localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
            }
            
        },
        inc:(state,action)=>{
            const itemIndex = state.cartItems.findIndex(item=> item.id === action.payload)

            state.cartItems[itemIndex].cartQuantity += 1
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        getTotal:(state,action)=>{
            let {total,quantity} =  state.cartItems.reduce((cartTotal,cartItem)=>{
                const {price,cartQuantity} = cartItem
                const itemTotal = price * cartQuantity

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity
                
                return cartTotal
            },{
                total:0,
                quantity:0
            })

            state.cartTotalAmount = total
            state.cartTotalQuantity = quantity
        }
    }
})

export default cartSlice.reducer
export const {addToCart,removeCart,removeItem,desc,inc,getTotal} = cartSlice.actions