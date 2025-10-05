'use client'
import SelectionBook from '@/types/booksTypes'
import React from 'react'
import styles from './selectionBookItem.module.scss'
import Image from 'next/image';
import Button from '../button/Button';
import rate from '@/public/rate-icon.svg'
import comment from '@/public/comment-icon.svg'
import notLiked from '@/public/notLiked.svg'
import liked from '@/public/liked.svg'
import Link from 'next/link';
interface SelectionBookItemProps {
    data: SelectionBook;  
}
export default function SelectionBookItem({data}:SelectionBookItemProps) {
  return (
    <>
       
       <Link href={`/catalog/${data.id}`} className={styles.selectionItem}>
        <Image alt='like' className={styles.selectionItem__like} src={notLiked}></Image>
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
             <div className={styles.selectionItem__buttonContainer}>
              <Button text='В корзину' height={36} width={257}></Button>
             </div>
            
           </div>
           
         </div>
       </Link>
    </>
  )
}
