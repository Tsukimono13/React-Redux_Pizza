import {ItemsType} from "redux/cart/types";

export const calcTotalPrice = (items: ItemsType[]) => {
    return items.reduce((sum: number, obj: any) => obj.price * obj.count + sum, 0);
};