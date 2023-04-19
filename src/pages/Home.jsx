import React, {useEffect, useState} from 'react';
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import Skeleton from "../components/pizza-block/Skeleton";
import PizzaBlock from "../components/pizza-block/PizzaBlock";

const Home = ({searchValue}) => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({name: "популярности", sortProperty: "rating"})

    useEffect(() => {
        setIsLoading(true)
        const order = sortType.sortProperty.includes('-') ? 'acs' : 'desc'
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        fetch(
            `https://642f12262b883abc641ddda8.mockapi.io/pizza-items?${category}&sortBy=${sortBy}
                &order=${order}`)
            .then(res => res.json())
            .then(arr => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType])
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)}/>
                <Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? [...new Array(10)].map((index) => <Skeleton key={index}/>) : items.map((obj) => (
                    <PizzaBlock key={obj.id} {...obj}/>
                ))}
            </div>
        </div>
    );
};

export default Home;