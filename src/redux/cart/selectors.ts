import {RootState} from "redux/store";

export const cartSelector = (state: RootState) => state.cartSlice
export const cartItemByIdSelector = (id: string) => (state: RootState) => state.cartSlice.items.find(obj => obj.id === id)