import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {RootState} from "redux/store";

export type ItemsType = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
    count: number
}
type InitalStateType = {
    totalPrice: number
    items: ItemsType[]
}

const initialState: InitalStateType = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ItemsType>) {
            const findItem = state.items.find(i => i.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload);

            if (findItem) {
                findItem.count--;
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    }
})
export const cartSelector = (state: RootState) => state.cartSlice
export const cartItemByIdSelector = (id: string) => (state: RootState) => state.cartSlice.items.find(obj => obj.id === id)
export const {addItem, removeItem, clearItems, minusItem} = cartSlice.actions

export default cartSlice.reducer