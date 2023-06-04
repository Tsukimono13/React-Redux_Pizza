import {configureStore} from '@reduxjs/toolkit'
import filterSlice from "redux/filter/filterSlice";
import cartSlice from "redux/cart/cartSlice";
import pizzaSlice from "redux/pizza/pizzaSlice";
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        filterSlice,
        cartSlice,
        pizzaSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()