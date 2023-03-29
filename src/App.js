import '../src/scss/app.scss';
import Header from "./components/header/Header";
import Categories from "./components/categories/Categories";
import Sort from "./components/sort/Sort";
import PizzaBlock from "./components/pizza-block/PizzaBlock";


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
                        <PizzaBlock title="Мексиканская" price={390}/>
                        <PizzaBlock title="Мясная" price={423}/>
                        <PizzaBlock title="Сырная" price={299}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
