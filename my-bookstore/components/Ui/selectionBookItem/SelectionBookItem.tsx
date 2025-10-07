'use client'
import SelectionBook from '@/types/booksTypes'
import React, { useEffect, useState } from 'react'
import styles from './selectionBookItem.module.scss'
import Image from 'next/image';
import Button from '../button/Button';
import rate from '@/public/rate-icon.svg'
import comment from '@/public/comment-icon.svg'
import notLiked from '@/public/notLiked.svg'
import liked from '@/public/liked.svg'
import Link from 'next/link';
import AddToCartButton from '../AddToCartButton';

import { useFavorites } from '@/app/contexts/FavoritesContext';
import { useSession } from 'next-auth/react';
import AuthModal from '../authModal/AuthModal';
interface SelectionBookItemProps {
    data: SelectionBook;  
}
export default function SelectionBookItem({data}:SelectionBookItemProps) {
  const { favorites, toggleFavorite, isLoading } = useFavorites();
  const isLiked = favorites.includes(data.id);
const { data: session } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleClick = async () => {
    if (!session) {
      setShowAuthModal(true);
      return;
    }

   
    await fetch('/database/cart', {
      method: 'POST',
      body: JSON.stringify({ productId:data.id, quantity: 1 })
    });
  };

  const handleFavoriteClick = () => {
    toggleFavorite(data.id);
  };
  return (
    <>
       
       <Link href={`/catalog/${data.id}`} className={styles.selectionItem}>
        <Image onClick={ handleFavoriteClick} alt='like' className={styles.selectionItem__like} src={isLiked?liked:notLiked}></Image>
         <div className={styles.selectionItem__container}>

          <div className={styles.selectionItem__image}>
            <Image width={160} height={253} alt='bookImage' src={data.coverUrl}></Image>
          </div>
          <p className={styles.selectionItem__title}>{data.title}</p>
           <div className={styles.selectionItem__stats}>
            <div className={styles.selectionItem__statsItem}>
              <Image alt='rate' src={rate} className={styles.selectionItem__statsItemImg}></Image>
              <p className={styles.selectionItem__statsItemText}>{data.rating}</p>
            </div>
            <div className={styles.selectionItem__statsItem}>
              <Image alt='comment' src={comment} className={styles.selectionItem__statsItemImg}></Image>
              <p className={styles.selectionItem__statsItemText}>{data.editionCount}</p>
            </div>
           </div>
           <div className={styles.selectionItem__price}>
            <p className={styles.selectionItem__priceText}>
              {Math.floor(data.price)}₽
            </p>
           </div>
           <div className={styles.selectionItem__button}>
             <div onClick={handleClick} className={styles.selectionItem__buttonContainer}>
              <Button text='В корзину' height={36} width={257}></Button>
              <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />{/* <AddToCartButton productId={data.id}></AddToCartButton> */}
             </div>
            
           </div>
           
         </div>
       </Link>
    </>
  )
}
