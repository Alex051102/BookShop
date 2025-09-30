'use client'

import type { BookInfo } from '@/types/booksTypes'
import React, { useState } from 'react'
import styles from './bookInfo.module.scss'
import Image from 'next/image'
import rate from '@/public/rate-icon.svg'
import comment from '@/public/comment-icon.svg'
import notLiked from '@/public/notLiked.svg'
import liked from '@/public/liked.svg'
import hand from '@/public/hand-icon.svg'
import man from '@/public/man-icon.svg'
import Button from '../button/Button'
import SelectionWrapper from '@/components/server/SelectionWrapper'
import SimiliarBooks from '../similiarBooks/SimiliarBooks'
interface BookInfoProps{
  data:BookInfo | null
}
export default function BookInfo({data}:BookInfoProps) {
  const [textt,setTextt]=useState<'descr' | 'charact' | 'rate'>('descr')
  return (
    <>
       
           <div className={styles.book__container}>
             <div className={styles.book__nav}>
              <p className={styles.book__navText}>Home - Catalog - <span className={styles.book__navTextOrange}>{data?.title}</span></p>
             </div>
             <div className={styles.book__upInfo}>
              <h1 className={styles.book__upInfoTitle}>{data?.title}</h1>
              <div className={styles.book__upInfoDetailsOuter}>
                <div className={styles.book__upInfoDetails}>
                  <div className={styles.book__upInfoDetail}>
                    <Image alt='rate' src={rate} className={styles.book__upInfoImg}></Image>
                    <p className={styles.book__upInfoText}>{data?.rating}</p>
                  </div>
                  <div className={styles.book__upInfoDetail}>
                    <Image alt='comments' src={comment} className={styles.book__upInfoImg}></Image>
                    <p className={styles.book__upInfoText}>{data?.editionCount}</p>
                  </div>
                  <div className={styles.book__upInfoDetail}>
                    <Image alt='comments' src={notLiked} className={styles.book__upInfoImg}></Image>
                    <p className={styles.book__upInfoText}>To favourites</p>
                  </div>
                </div>
                <div className={styles.book__upInfoCode}>
                   
                    <p className={styles.book__upInfoText}><span className={styles.book__upInfoTextGrey}>Product code: </span> {data?.id}</p>
                  
                  
                </div>
              </div>
                
             </div>
             <div className={styles.book__mainInfo}>
              <div className={styles.book__mainInfoImageContainer}>
                <Image width={300} height={350} className={styles.book__mainInfoImage} alt='imageBook' src={data?.image || ''}></Image>
              </div>
              <div className={styles.book__mainInfoStats}>
                
                <div className={styles.book__mainInfoStat}>
                  <p className={styles.book__mainInfoStatTextGrey}>Publisher</p><div className={styles.line}></div><p className={styles.book__mainInfoStatText}>{data?.publisher}</p>
                </div>
                <div className={styles.book__mainInfoStat}>
                  <p className={styles.book__mainInfoStatTextGrey}>ISBN</p><div className={styles.line}></div><p className={styles.book__mainInfoStatText}>{data?.isbn}</p>
                </div>
                <div className={styles.book__mainInfoStat}>
                  <p className={styles.book__mainInfoStatTextGrey}>Pages</p><div className={styles.line}></div><p className={styles.book__mainInfoStatText}>{data?.pages}</p>
                </div>
                <div className={styles.book__mainInfoStat}>
                  <p className={styles.book__mainInfoStatTextGrey}>Author</p><div className={styles.line}></div><p className={styles.book__mainInfoStatText}>{data?.author}</p>
                </div>
                <div className={styles.book__mainInfoStat}>
                  <p className={styles.book__mainInfoStatTextGrey}>Year of publication</p><div className={styles.line}></div><p className={styles.book__mainInfoStatText}>{data?.year}</p>
                </div>
              </div>
              <div className={styles.book__orderOuter}>
                <div className={styles.book__order}>
                <div className={styles.book__orderContainer}>
                  <div className={styles.book__orderUp}>
                    <div className={styles.book__orderUpContainer}>
                      <p className={styles.book__orderTitle}>Order Information:</p>
                       <div className={styles.book__orderUpType}>
                        <Image alt='hand' src={hand}></Image>
                        <div className={styles.book__orderUpTypeInfo}>
                          <p className={styles.book__orderUpTypeText}>Pickup points:</p>
                          <p className={styles.book__orderUpTypeTextGrey}><span className={styles.book__orderUpTypeTextOrange}>available,</span > tomorrow  <span className={styles.book__orderUpTypeTextLarge}>— free</span></p>
                        </div>
                       </div>
                       <div className={styles.book__orderUpType}>
                        <Image alt='man' src={man}></Image>
                        <div className={styles.book__orderUpTypeInfo}>
                          <p className={styles.book__orderUpTypeText}>Delivery:</p>
                          <p className={styles.book__orderUpTypeTextGrey}><span className={styles.book__orderUpTypeTextOrange}>April 15,</span >Saturday <span className={styles.book__orderUpTypeTextLarge}>— 200₽</span></p>
                        </div>
                       </div>
                    </div>
                  </div>
                  <div className={styles.book__orderDown}>
                    <div className={styles.book__orderDownPriceOuter}>
                        <p className={styles.book__orderTitle}>Total Price:</p>
                    <p className={styles.book__orderPrice}>{data?.price} ₽</p>
                    </div>
                  
                     <div className={styles.book__orderDownButton}>
                      <div className={styles.book__orderDownButtonContainer}>
<Button text='Put in cart' width={285} height={54}></Button>
                      </div>
                      
                     </div>
                  </div>
                </div>
               </div>
              </div>
               
             </div>
             <div className={styles.book__genres}>
               <div className={styles.book__genresContainer}>
                {data?.genres.map((g,i)=>(
                <div key={i} className={styles.book__genre}>
                  <p className={styles.book__genreText}>{g}</p>
                </div>
              ))}
               </div>
              
             </div>
             <div className={styles.book__addInfo}>
              <div className={styles.book__addInfoContainer}> 
                <div className={styles.book__addInfoNav}>
                <div onClick={()=>setTextt('descr')} className={textt=='descr'?`${styles.book__addInfoNavItem} ${styles.book__addInfoNavItemActive}`:styles.book__addInfoNavItem}>
                  <p className={textt=='descr'?`${styles.book__addInfoNavItemText} ${styles.book__addInfoNavItemTextActive}`:styles.book__addInfoNavItemText}>
                    Description
                  </p>
                </div>
                <div onClick={()=>setTextt('charact')} className={textt=='charact'?`${styles.book__addInfoNavItem} ${styles.book__addInfoNavItemActive}`:styles.book__addInfoNavItem}>
                  <p className={textt=='charact'?`${styles.book__addInfoNavItemText} ${styles.book__addInfoNavItemTextActive}`:styles.book__addInfoNavItemText}>
                    Characteristics
                  </p>
                </div>
                <div onClick={()=>setTextt('rate')} className={textt=='rate'?`${styles.book__addInfoNavItem} ${styles.book__addInfoNavItemActive}`:styles.book__addInfoNavItem}>
                  <p className={textt=='rate'?`${styles.book__addInfoNavItemText} ${styles.book__addInfoNavItemTextActive}`:styles.book__addInfoNavItemText}>
                    Reviews
                  </p>
                </div>
               </div>
               <div className={styles.book__addInfoMain}>
                {textt=='descr'?<p className={styles.book__addInfoMainText}>{data?.description}</p>:<p className={styles.book__addInfoMainText}>No text</p>}
               </div>
              </div>
              
               
             </div>
            <SimiliarBooks genres={data?.genres || []} />
             
           </div>
       
    </>
  )
}
