import '../src/scss/app.scss';
import {Header} from "components";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import React, {Suspense} from "react";


const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'))


function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <NotFound/>
                        </Suspense>
                    }/>
                    <Route path="/cart" element={
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <Cart/>
                        </Suspense>
                    }/>
                    <Route path="/pizza/:id" element={
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <FullPizza/>
                        </Suspense>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
