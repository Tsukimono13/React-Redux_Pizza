import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

const fetchPizzas = createAsyncThunk('pizza/fetch', async (arg) => {
    const {order, sortBy, category, search, currentPage} = arg
    const {data} = await axios
        .get(`https://642f12262b883abc641ddda8.mockapi.io/pizza-items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}
                &order=${order}${search}`)
    return data
})

const initialState = {
    items: [],
    status:'loading',
}

const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        /*setPizzas(state, action) {
            state.items = action.payload
        }*/
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state, action) => {
                state.status = 'loading'
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = 'success'
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = 'error'
                state.items = []
            })
    }
})
export const pizzasSelector = (state) => state.pizzaSlice

export const {setPizzas} = pizzaSlice.actions
export const pizzaThunks = {fetchPizzas};
export default pizzaSlice.reducer