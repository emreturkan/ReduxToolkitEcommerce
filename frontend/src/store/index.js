import {configureStore} from '@reduxjs/toolkit'
import productSlice,{productsFetch} from './productSlice'
import cartSlice from './cartSlice'
import { getTotal } from './cartSlice'
const store = configureStore({
    reducer:{
        productSlice,
        cartSlice
    }
})

store.dispatch(productsFetch())
store.dispatch(getTotal())

export default store