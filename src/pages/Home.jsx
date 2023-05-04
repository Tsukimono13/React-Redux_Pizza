import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import Skeleton from "../components/pizza-block/Skeleton";
import PizzaBlock from "../components/pizza-block/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {AppContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setPageCount} from "../redux/slices/filterSlice";
import axios from "axios";
import {useNavigate} from 'react-router-dom'


const Home = () => {
    const {categoryId, sort, currentPage} = useSelector((state) => state.filterSlice)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {searchValue} = useContext(AppContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePageCount = (number) => {
        dispatch(setPageCount(number))
    }

    useEffect(() => {
        setIsLoading(true)
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `search=${searchValue}` : ''

        axios
            .get(`https://642f12262b883abc641ddda8.mockapi.io/pizza-items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}
                &order=${order}${search}`)
            .then((res) => {
                setItems(res.data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty, categoryId, currentPage
        })
        navigate(`?${queryString}`);
    }, [categoryId, sort.sortProperty, currentPage])

    const pizzas = items
        /*.filter((obj) => {
        return !!obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })*/.map((obj) => (<PizzaBlock key={obj.id} {...obj}/>))
    const skeletons = [...new Array(10)].map((index) => <Skeleton key={index}/>)
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePageCount}/>
        </div>
    );
};

export default Home;