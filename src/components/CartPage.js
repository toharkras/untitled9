
import { ref, onValue, off } from 'firebase/database';
import {database}  from './FirebaseDB';
import React, { useState, useEffect } from 'react';
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const cartRef = ref(database, 'cart');
        console.log('useEffect is running. Listening to cart changes...');

        // מאזין לשינויים בעגלה
        const handleCartChange = (snapshot) => {
            console.log('Firebase snapshot:', snapshot.val());
            const cartData = snapshot.val();
            if (cartData) {
                const items = Object.values(cartData);
                console.log('Cart items:', items);
                setCartItems(items);

                const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
                setTotalPrice(total.toFixed(2));
            } else {
                console.log('No cart data found');
                setCartItems([]);
                setTotalPrice(0);
            }
        };

        onValue(cartRef, handleCartChange);

        return () => {
            console.log('Cleaning up listener');
            off(cartRef, 'value', handleCartChange);  // וודא שאתה מבטל את המאזין
        };
    }, []);

    return (
        <div className="cart-page">
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="cart-item-details">
                                    <p>{item.name}</p>
                                    <p>Price: ₪{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="total-price">
                        <h2>Total Price: ₪{totalPrice}</h2>
                    </div>
                    <button disabled>Checkout</button> {}
                </div>
            )}
        </div>
    );
};

export default CartPage;