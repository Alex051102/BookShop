import SelectionBook from '@/types/booksTypes'
import React from 'react'
import styles from './catalogBooksItem.module.scss'
import Image from 'next/image'
import rate from '@/public/rate-icon.svg'
import comment from '@/public/comment-icon.svg'
import notLiked from '@/public/notLiked.svg'
import liked from '@/public/liked.svg'
import Button from '../button/Button'
import Link from 'next/link'
import { useFavorites } from '@/app/contexts/FavoritesContext'
interface SelectionProps {
    book: SelectionBook
}
export default function CatalogBooksItem({ book }: SelectionProps) {
    const { favorites, toggleFavorite, isLoading } = useFavorites();
      const isLiked = favorites.includes(book.id);
    
      const handleFavoriteClick = () => {
        toggleFavorite(book.id);
      };
    return (
        <>
            <Link href={`/catalog/${book.id}`} className={styles.catalogBooksItem}>
                <div className={styles.catalogBooksItem__container}>
                    <h2 className={styles.catalogBooksItem__title}>{book.title}</h2>
                    <div className={styles.catalogBooksItem__info}>
                        <div className={styles.catalogBooksItem__infoMain}>
                            <div className={styles.catalogBooksItem__image}>
                                <Image width={142} height={217} alt='bookImage' src={book.coverUrl}></Image>
                            </div>
                            <div className={styles.catalogBooksItem__descr}>
                                <div className={styles.catalogBooksItem__stats}>
                                    <div className={styles.catalogBooksItem__stat}>
                                        <Image src={rate} alt='rating'></Image>
                                        <p className={styles.catalogBooksItem__text}>{book.rating}</p>
                                    </div>
                                    <div className={styles.catalogBooksItem__stat}>
                                        <Image src={comment} alt='comments'></Image>
                                        <p className={styles.catalogBooksItem__text}>{book.editionCount}</p>
                                    </div>
                                    <div className={styles.catalogBooksItem__stat}>
                                        <Image onClick={handleFavoriteClick} src={isLiked?liked:notLiked} alt='favourite'></Image>

                                    </div>
                                </div>
                                <div className={styles.catalogBooksItem__details}>
                                    <p className={styles.catalogBooksItem__text}>Publisher : <span className={styles.catalogBooksItem__textBlack}>{book.publisher}</span></p>
                                    <p className={styles.catalogBooksItem__text}>ISBN : <span className={styles.catalogBooksItem__textBlack}>{book.isbn}</span></p>
                                    <p className={styles.catalogBooksItem__text}>Author : <span className={styles.catalogBooksItem__textBlack}>{book.author}</span></p>
                                    <p className={styles.catalogBooksItem__text}>Pages : <span className={styles.catalogBooksItem__textBlack}>{book.pages}</span></p>
                                    <p className={styles.catalogBooksItem__text}>Date : <span className={styles.catalogBooksItem__textBlack}>{book.date}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.catalogBooksItem__price}>
                            <p className={styles.catalogBooksItem__priceText}>{book.price} ₽</p>
                             <div className={styles.catalogBooksItem__priceButton}>
                                <Button width={200} height={35} text='Put in cart'></Button>
                             </div>
                        </div>

                    </div>
                </div>
            </Link>
        </>
    )
}
