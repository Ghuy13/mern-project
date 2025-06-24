import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSlice'
import userReducer from './slides/userSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer
    },
})