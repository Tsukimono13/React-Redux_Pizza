import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "redux/store";

export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

export type SortType = {
    name: string;
    sortProperty: SortPropertyEnum;
};
export type InitialStateType = {
    searchValue: string,
    categoryId: number,
    currentPage: number,
    sort: SortType
}

const initialState: InitialStateType = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: "популярности",
        sortProperty: SortPropertyEnum.RATING_DESC
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<SortType>){
            state.sort = action.payload
        },
        setPageCount(state, action: PayloadAction<number>){
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<InitialStateType>){
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
            state.categoryId = Number(action.payload.categoryId)
        }
    },
})
export const filterSelector = (state: RootState) => state.filterSlice

export const {setCategoryId, setSort, setPageCount, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer