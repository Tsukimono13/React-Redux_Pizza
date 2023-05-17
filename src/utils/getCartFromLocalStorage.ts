import {calcTotalPrice} from "utils/calcTotalPrice";
import {ItemsType} from "redux/cart/types";

export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

    return {
        items: items as ItemsType[],
        totalPrice,
    };
};