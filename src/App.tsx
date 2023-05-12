import '../src/scss/app.scss';
import Header from "./components/header/Header";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import React from "react";
import FullPizza from "./pages/FullPizza";


function App() {
    return (
        <div className="wrapper">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/pizza/:id" element={<FullPizza/>}/>
                    </Routes>
                </div>
        </div>
    );
}

export default App;