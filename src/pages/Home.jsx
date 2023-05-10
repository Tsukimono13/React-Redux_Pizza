import React, {useContext, useEffect, useRef, useState} from 'react';
import Categories from "../components/categories/Categories";
import Sort, {list} from "../components/sort/Sort";
import Skeleton from "../components/pizza-block/Skeleton";
import PizzaBlock from "../components/pizza-block/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {AppContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setFilters, setPageCount} from "../redux/slices/filterSlice";
import {useNavigate} from 'react-router-dom'
import qs from "qs";
import {pizzaThunks} from "../redux/slices/pizzaSlice";


const Home = () => {
    const {categoryId, sort, currentPage} = useSelector((state) => state.filterSlice)
    const {items, status} = useSelector((state) => state.pizzaSlice)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isMounted = useRef(false)

    const {searchValue} = useContext(AppContext)


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePageCount = (number) => {
        dispatch(setPageCount(number))
    }

    const getPizzas = () => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

            dispatch(pizzaThunks.fetchPizzas({
                order,
                sortBy,
                category,
                search,
                currentPage
            }))
    }

// Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty, categoryId, currentPage
            })
            navigate(`?${queryString}`);
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage])

    // Если был первый рендер, то провряем URL-параметры и сохраняем в редакс
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = list.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(setFilters({
                ...params, sort
            }))
        }
    }, [])

    // Если был акпвый запрос, то запрашиваем пиццы
    useEffect(() => {
            getPizzas()
        window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

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
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePageCount}/>
        </div>
    );
};

export default Home;