import React, {useEffect, useState} from 'react';
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import Skeleton from "../components/pizza-block/Skeleton";
import PizzaBlock from "../components/pizza-block/PizzaBlock";

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState(0)

    useEffect(() => {
        fetch('https://642f12262b883abc641ddda8.mockapi.io/pizza-items')
            .then(res => res.json())
            .then(arr => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={() => onClickCategory(i)}/>
                <Sort/>
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