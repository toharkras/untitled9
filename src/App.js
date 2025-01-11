

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import {  } from "react-router-dom";

import ProductsPage from './components/ProductsPage';
import CartPage from './components/CartPage';
import Navbar from "./components/NavBar";

function App() {

    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </Router>
    );
}

export default App;