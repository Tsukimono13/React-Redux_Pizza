
export const calcTotalPrice = (items: any) => {
    return items.reduce((sum: number, obj: any) => obj.price * obj.count + sum, 0);
};