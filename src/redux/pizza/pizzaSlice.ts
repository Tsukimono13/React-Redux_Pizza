import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {ParamsType, PizzaType, Status} from "redux/pizza/types";


const fetchPizzas = createAsyncThunk<PizzaType[], ParamsType>('pizza/fetch', async (arg) => {
    const {order, sortBy, category, search, currentPage} = arg
    const {data} = await axios
        .get<PizzaType[]>(`https://642f12262b883abc641ddda8.mockapi.io/pizza-items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}
                &order=${order}${search}`)
    return data
})


type InitialStateType = {
    items: PizzaType[]
    status: Status
}

const initialState: InitialStateType = {
    items: [],
    status: Status.LOADING,
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
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = Status.SUCCESS
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR
                state.items = []
            })
    }
})

//export const {setPizzas} = pizzaSlice.actions
export const pizzaThunks = {fetchPizzas};
export default pizzaSlice.reducer