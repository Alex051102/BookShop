import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useFavorites } from '@/app/contexts/FavoritesContext';

interface CartItems {
    productId: string,
    quantity: number
}

export default function CartItem({ productId, quantity }: CartItems) {
    const { deleteFromCart, updateQuantityCart } = useFavorites();
    const [localQuantity, setLocalQuantity] = useState(quantity);
    
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedUpdate = useCallback((newQuantity: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            console.log('Отправка на сервер:', newQuantity);
            updateQuantityCart(productId, newQuantity);
        }, 2000);
    }, [productId, updateQuantityCart]);

    function quantitySetter(type: string) {
        setLocalQuantity(current => {
            const newQuantity = type === 'plus' ? current + 1 : Math.max(0, current - 1); 
            
          
            debouncedUpdate(newQuantity);
            
            return newQuantity;
        });
    }

   
    useEffect(() => {
        setLocalQuantity(quantity);
    }, [quantity]);

 
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p>Product: {productId}</p>
            <p>Quantity: {localQuantity}</p>
            <button onClick={() => deleteFromCart(productId)}>delete</button>
            <button onClick={() => quantitySetter('plus')}>+</button>
            <button onClick={() => quantitySetter('minus')}>-</button>
        </div>
    )
}