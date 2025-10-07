'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
interface cartItems{
  productId:string;
  quantity:number
}
interface FavoritesContextType {
  favorites: string[];
  cart:cartItems[],
  toggleFavorite: (productId: string) => Promise<void>;
  isLoading: boolean;
  deleteFromCart: (productId: string) => Promise<void>;
  addToCart:(productId: string,quantity:number) => Promise<void>;
  updateQuantityCart:(productId: string,quantity:number) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<cartItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const loadFavorites = async () => {
      if (!session) {
        setFavorites([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch('/database/favourites');
        if (response.ok) {
          const favs = await response.json();
         
          const favoriteIds = favs.map((item: any) => item.productId);
          setFavorites(favoriteIds);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [session]);

useEffect(() => {
    const loadCart = async () => {
      if (!session) {
        setCart([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch('/database/cart');
        if (response.ok) {
          const favs = await response.json();
        
          const cartItems = favs.map((item: cartItems) => item);
          setCart(cartItems);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [session]);
  

  
  const toggleFavorite = async (productId: string) => {
    if (!session) return;

    const isCurrentlyFavorite = favorites.includes(productId);
    
    try {
      if (isCurrentlyFavorite) {
      
        await fetch(`/database/favourites?productId=${productId}`, {
          method: 'DELETE',
        });
        setFavorites(prev => prev.filter(id => id !== productId));
      } else {
       
        await fetch('/database/favourites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        setFavorites(prev => [...prev, productId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
const deleteFromCart = async (productId: string) => {
  
  if (!session) {
    return 
  }

  try {
    await fetch(`/database/cart?productId=${productId}`, {
      method: 'DELETE',
    });
    setCart(prev => prev.filter(item => item.productId !== productId));
  } catch {}
};
const addToCart = async (productId: string,quantity:number=1) => {
 
  if (!session) {
    return 
  }

  try {
   
    await fetch('/database/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: productId, quantity: quantity }),
    });
    setCart(prev => [...prev, {productId,quantity}]);
  } catch {
    return 
  }
};
const updateQuantityCart = async (productId: string, quantity: number) => {
  if (!session) {
    return;
  }

  try {
    
    await fetch('/database/cart', { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    });
    
   
    setCart(prev => prev.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ));
  } catch (error) {
    console.error('Error updating cart quantity:', error);
  }
};
  return (
    <FavoritesContext.Provider value={{ favorites,cart, toggleFavorite, isLoading,deleteFromCart ,addToCart,updateQuantityCart}}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};