import React, {useEffect} from 'react';
import {Skeleton, PizzaBlock, Sort, Pagination, Categories} from "components";
import {useSelector} from "react-redux";
import {setCategoryId, setPageCount} from "redux/filter/filterSlice";
import {pizzaThunks} from "redux/pizza/pizzaSlice";
import {useAppDispatch} from "redux/store";
import {filterSelector} from "redux/filter/selectors";
import {pizzasSelector} from "redux/pizza/selectors";


const Home = () => {
    const {categoryId, sort, currentPage, searchValue} = useSelector(filterSelector)
    const {items, status} = useSelector(pizzasSelector)
    const dispatch = useAppDispatch()

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