import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductsPage from './components/ProductsPage';
import CartPage from './components/CartPage';

function App() {
    return (
        <Router>
            <div className="navbar">
                <h1 style={{ color: '#bb4ecc' }}>TOHAR & GAL SERIOUS SHOP</h1> {/* כותרת אחת בלבד */}
                <Link to="/cart">Go to Cart</Link>
            </div>

            <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </Router>
    );
}

export default App;
