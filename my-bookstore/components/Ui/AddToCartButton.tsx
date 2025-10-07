'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import AuthModal from './authModal/AuthModal';
interface props{
  productId:string
}
export default function AddToCartButton({ productId }:props) {
  const { data: session } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleClick = async () => {
    if (!session) {
      setShowAuthModal(true);
      return;
    }

   
    await fetch('/database/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity: 1 })
    });
  };

  return (
    <>
      <button onClick={handleClick}>В корзину</button>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}