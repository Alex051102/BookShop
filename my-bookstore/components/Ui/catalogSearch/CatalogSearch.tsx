'use client'
import SelectionBook from '@/types/booksTypes'
import React, { useEffect, useState } from 'react'
import styles from './catalogSearch.module.scss'
import CatalogFilters from '../catalogFilters/CatalogFilters'
import CatalogBooks from '../catalogBooks/CatalogBooks'
interface SelectionProps {
    books: SelectionBook[],
    query:string,

   
}
export default function CatalogSearch({books,query}:SelectionProps) {
  let nav=''
  if(query.includes('%')){
    const index=query.indexOf('%')
    nav=query.slice(index+3,query.length)
  }
  else{
    nav=query
  }
  const [openFilters,setOpenFilters]=useState(true)

 
 
  function actionFilters(b:boolean){
    if(b==true){
      setOpenFilters(true)
    }
    else{
      setOpenFilters(false)
    }
  }

 useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 1000) {
      setOpenFilters(false);
    }
    else{
      setOpenFilters(true)
    }
  };


  window.addEventListener('resize', handleResize);
  

  handleResize();

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); 
  return (
    <>
  <div className={!openFilters?styles.catalog__scroll:styles.catalog__noScroll}>
     <div className={openFilters?styles.catalog__outer:styles.catalog__outerNone}></div>
       <div className={styles.catalog}>
       <div className={styles.catalog__container}>
        <p className={styles.catalog__navText}>Home - Catalog - <span className={styles.catalog__navTextOrange}>{nav}</span></p>
        <div className={styles.catalog__main}>
          {openFilters?<CatalogFilters actionFilters={actionFilters}></CatalogFilters>:''}
          
        <CatalogBooks actionFilters={actionFilters} books={books}></CatalogBooks>
        </div>
        
       </div>
    </div>
    
   </div>
    </>
  )
}
