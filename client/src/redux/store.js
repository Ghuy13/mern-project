import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slides/productSlice'
import userReducer from './slides/userSlice'
import orderReducer from './slides/orderSlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        order: orderReducer,
    },
})