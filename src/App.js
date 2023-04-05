import '../src/scss/app.scss';
import Header from "./components/header/Header";
import Categories from "./components/categories/Categories";
import Sort from "./components/sort/Sort";
import PizzaBlock from "./components/pizza-block/PizzaBlock";
import pizzas from './assets/pizzas.json'


function App() {


    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {pizzas.map((obj) => (
                            <PizzaBlock key={obj.id} {...obj}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
