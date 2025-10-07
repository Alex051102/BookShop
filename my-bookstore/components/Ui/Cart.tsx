'use client'
import { useFavorites } from '@/app/contexts/FavoritesContext';
import React from 'react'
import CartItem from './CartItem';

export default function Cart() {
    const { cart } = useFavorites();
    console.log('Cart items:', cart);
    
    return (
        <div>
            <h2>Cart ({cart.length} items)</h2>
            {cart.map((item, i) => (
                <CartItem 
                    key={`${item.productId}-${i}`} // Важно добавить key!
                    productId={item.productId} 
                    quantity={item.quantity} 
                />
            ))}
        </div>
    )
}