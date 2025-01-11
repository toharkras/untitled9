import React, { useState, useEffect } from 'react';
import {ref, set, onValue, push} from 'firebase/database';
import  {database}  from './FirebaseDB';
import axios from 'axios';
import './ProductsPage.css';
import PriceFilter from './Filter';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [maxPrice, setMaxPrice] = useState(100);
    const [cartCount, setCartCount] = useState(0); // מספר פריטים בעגלה

    useEffect(() => {
        // שליפת המוצרים מה-API
        axios.get('https://api.tvmaze.com/shows')
            .then(response => {
                const fetchedProducts = response.data.map(show => ({
                    id: show.id,
                    name: show.name,
                    image: show.image ? show.image.medium : '', // תמונה אם קיימת
                    price: (Math.random() * 100).toFixed(2), // מחיר אקראי בין 0 ל-100
                }));
                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });

        // עדכון מספר המוצרים בעגלה
        const cartRef = ref(database, 'cart'); // נתיב נכון
        onValue(cartRef, snapshot => {
            const cartData = snapshot.val();
            if (cartData) {
                const itemsCount = Object.keys(cartData).length;
                setCartCount(itemsCount);
            }
        });
    }, []);

    const handlePriceFilter = (price) => {
        setMaxPrice(price);
        const filtered = products.filter(product => parseFloat(product.price) <= price);
        setFilteredProducts(filtered);
    };

    const addToCart = (product) => {
        const cartRef = ref(database, 'cart'); // נתיב לעגלה ב-Firebase
        push(cartRef, product)  // הוספת המוצר לעגלה
            .then(() => {
                console.log("Product added to cart successfully!");
            })
            .catch((error) => {
                console.error("Error adding product to cart:", error);
            });

        alert("Product added to cart!");  // הודעת אישור
    };


    return (
        <div className="products-page">
            <PriceFilter maxPrice={maxPrice} setMaxPrice={handlePriceFilter} />
            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>Price: ₪{product.price}</p>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
