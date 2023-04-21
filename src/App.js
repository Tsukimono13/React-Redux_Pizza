import '../src/scss/app.scss';
import Header from "./components/header/Header";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import React, {useState} from "react";

export const AppContext = React.createContext()

function App() {
    const [searchValue, setSearchValue] = useState('')
    return (
        <div className="wrapper">
            <AppContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                    </Routes>
                </div>
            </AppContext.Provider>
        </div>
    );
}

export default App;
