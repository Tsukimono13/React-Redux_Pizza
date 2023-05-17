import React, {useEffect, useRef} from 'react';
import Categories from "../components/categories/Categories";
import Sort, {list} from "../components/sort/Sort";
import Skeleton from "../components/pizza-block/Skeleton";
import PizzaBlock from "../components/pizza-block/PizzaBlock";
import Pagination from "../components/pagination/Pagination";
import {useSelector} from "react-redux";
import {
    filterSelector,
    InitialStateType,
    setCategoryId,
    setFilters,
    setPageCount,
    SortType
} from "redux/slices/filterSlice";
import {Link, useNavigate} from 'react-router-dom'

import { pizzasSelector, pizzaThunks} from "redux/slices/pizzaSlice";
import {useAppDispatch} from "redux/store";


const Home = () => {
    const {categoryId, sort, currentPage, searchValue} = useSelector(filterSelector)
    console.log(sort)
    const {items, status} = useSelector(pizzasSelector)
    const isMounted = useRef(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])

    const onChangePageCount = (num: number) => {
        dispatch(setPageCount(num))
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
            currentPage: String(currentPage)
        }))
    }

// Если изменили параметры и был первый рендер
/*    useEffect(() => {
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
            const params = (qs.parse(window.location.search.substring(1)) as unknown) as ParamsType
            const sort = list.find(obj => obj.sortProperty === params.sortBy)
            dispatch(setFilters({
                searchValue: params.search,
                categoryId: Number(params.category),
                currentPage: Number(params.currentPage),
                sort: sort || list[0]
            }))
        }
    }, [])*/

    // Если был акпвый запрос, то запрашиваем пиццы
    useEffect(() => {
        getPizzas()
        window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzas = items
        /*.filter((obj) => {
        return !!obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })*/.map((obj: any) => (
                <PizzaBlock key={obj.id} {...obj}/>
            ))
    const skeletons = [...new Array(10)].map((index) => <Skeleton key={index}/>)
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort value={sort}/>
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