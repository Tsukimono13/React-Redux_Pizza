export type ParamsType = {
    order: string
    sortBy: string
    category: string
    search: string
    currentPage: string
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}
export type PizzaType = {
    id: string
    title: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
}