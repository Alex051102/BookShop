'use client'
import SelectionBook from '@/types/booksTypes'
import React, { useEffect, useState } from 'react'
import styles from './catalogBooks.module.scss'
import filterByGenres from '@/lib/filters/filterByGenres'
import useGenresFilter from '@/lib/hooks/useGenresFilter'
import useLangFilter from '@/lib/hooks/useLangFilter'
import filterByLang from '@/lib/filters/filterByLang'
import filterByAuthor from '@/lib/filters/filterByAuthor'
import useAuthorFilter from '@/lib/hooks/useAuthorFilter'
import usePriceFilter from '@/lib/hooks/usePriceFilter'
import filterByPrice from '@/lib/filters/filterByPrice'
import Image from 'next/image'
import sortDownDis from '@/public/sort-arrow-down-disable.svg'
import sortDownAct from '@/public/sort-arrow-down-active.svg'

import sortUpAct from '@/public/sort-arrow-up-active.svg'
import CatalogBooksItem from '../catalogBooksItem/CatalogBooksItem'


import pagesDisNext from '@/public/pagesDisableNext.svg'
import pagesActNext from '@/public/pagesActiveNext.svg'

import pagesDisPrev from '@/public/pagesDisablePrev.svg'
import pagesActPrev from '@/public/pagesActivePrev.svg'
interface SelectionProps {
    books: SelectionBook[],
    actionFilters:(b:boolean)=>void
}

type SortType = 'price' | 'rating' | 'none'
type SortDirection = 'up' | 'down'

export default function CatalogBooks({ books,actionFilters }: SelectionProps) {
    const [filteringBooks, setFilteringBooks] = useState<SelectionBook[]>([])
    const selectedGenres = useGenresFilter()
    const selectedLang = useLangFilter()
    const selectedAuthor = useAuthorFilter()
    const selectedPrice = usePriceFilter() 
    const [pages, setPages] = useState([1])
    const booksOnPage = 4
    const [startSlice, setStartSlice] = useState(0)
    const [endSlice, setEndSlice] = useState(4)

    const [sortType, setSortType] = useState<SortType>('none')
    const [sortDirection, setSortDirection] = useState<SortDirection>('down')

    const [openSortPrice, setOpenPrice] = useState(false)
    const [openSortRating, setOpenRating] = useState(false)

    function paginationNext() {
        if (endSlice < filteringBooks.length) {
            setStartSlice(c => c + booksOnPage)
            setEndSlice(c => c + booksOnPage)
        }
    }

    function paginationPrev() {
        if (startSlice > 0) {
            setStartSlice(c => c - booksOnPage)
            setEndSlice(c => c - booksOnPage)
        }
    }

    useEffect(() => {
        const filtered = books.filter(b => 
            filterByGenres(b.genres, selectedGenres) && 
            filterByLang(b.lang, selectedLang) && 
            filterByAuthor(b.author, selectedAuthor) && 
            filterByPrice(b.price, selectedPrice)
        )
        setFilteringBooks(filtered)
        const end = Math.ceil(filtered.length / booksOnPage)
        const pages = []
        for (let i = 1; i <= end; i++) {
            pages.push(i)
        }
        setPages(pages)
        setStartSlice(0)
        setEndSlice(4)
    }, [books, selectedGenres, selectedLang, selectedAuthor, selectedPrice]) 

    function getSortedBooks() {
        if (sortType === 'none') {
            return filteringBooks
        }

        const sortedBooks = [...filteringBooks] 
        
        return sortedBooks.sort((a: SelectionBook, b: SelectionBook) => {
            const sortA = sortType === 'rating' ? (a.rating || 0) : (a.price || 0)
            const sortB = sortType === 'rating' ? (b.rating || 0) : (b.price || 0)
            
            return sortDirection === 'up' ? sortA - sortB : sortB - sortA
        })
    }

    const handleSortPrice = (direction: SortDirection) => {
        setSortType('price')
        setSortDirection(direction)
          
    }

    const handleSortRating = (direction: SortDirection) => {
        setSortType('rating')
        setSortDirection(direction)
       
    }

    const handleNoSort = () => {
        setSortType('none')
       
    }

    const sortedBooks = getSortedBooks()

    return (
        <>
            <div className={styles.catalogBooks}>
                <div className={styles.catalogBooks__sort}>
                    <div className={styles.catalogBooks__sortContainer}>
                        <button className={styles.catalogBooks__filters} onClick={()=>{actionFilters(true);}}>filters</button>
                        <p className={styles.catalogBooks__sortText}>Sort by:</p>
                        
                        <div onClick={() => { setOpenPrice(c => !c); setOpenRating(false) }} className={styles.catalogBooks__sortType}>
                            <p className={sortType !== 'price' ? styles.catalogBooks__sortText : styles.catalogBooks__sortTextOrange}>
                                Price
                            </p>
                            <Image alt='arrow' src={
                                sortType !== 'price' ? sortDownDis : 
                                sortDirection === 'up' ? sortUpAct : sortDownAct
                            } />
                            {openSortPrice && (
                                <div className={styles.catalogBooks__sortTypeChoices}>
                                    <div onClick={() => handleSortPrice('up')} className={styles.catalogBooks__sortTypeChoice}>
                                        <p className={styles.catalogBooks__sortTypeChoiceText}>Up</p>
                                    </div>
                                    <div onClick={() => handleSortPrice('down')} className={styles.catalogBooks__sortTypeChoice}>
                                        <p className={styles.catalogBooks__sortTypeChoiceText}>Down</p>
                                    </div>
                                    <div onClick={handleNoSort} className={styles.catalogBooks__sortTypeChoice}>
                                        <p className={styles.catalogBooks__sortTypeChoiceText}>No sort</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div onClick={() => { setOpenPrice(false); setOpenRating(c => !c) }} className={styles.catalogBooks__sortType}>
                            <p className={sortType !== 'rating' ? styles.catalogBooks__sortText : styles.catalogBooks__sortTextOrange}>
                                Rating
                            </p>
                            <Image alt='arrow' src={
                                sortType !== 'rating' ? sortDownDis : 
                                sortDirection === 'up' ? sortUpAct : sortDownAct
                            } />
                            {openSortRating && (
                                <div className={styles.catalogBooks__sortTypeChoices}>
                                    <div onClick={() => handleSortRating('up')} className={styles.catalogBooks__sortTypeChoice}>
                                        <p className={styles.catalogBooks__sortTypeChoiceText}>Up</p>
                                    </div>
                                    <div onClick={() => handleSortRating('down')} className={styles.catalogBooks__sortTypeChoice}>
                                        <p className={styles.catalogBooks__sortTypeChoiceText}>Down</p>
                                    </div>
                                    <div onClick={handleNoSort} className={styles.catalogBooks__sortTypeChoice}>
                                        <p className={styles.catalogBooks__sortTypeChoiceText}>No sort</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.catalogBooks__content}> 
                    {sortedBooks.length === 0 ? (
                    <p>No books found for selected genres</p>
                ) : (
                    sortedBooks.slice(startSlice, endSlice).map(b => (
                        <CatalogBooksItem key={b.id} book={b}></CatalogBooksItem>
                       
                    ))
                )}
                </div>

                {sortedBooks.length === 0 ? 
               ''

                : <div className={styles.catalogBooks__pages}>
                    <div className={styles.catalogBooks__pagesContainer}>
                        <button className={styles.catalogBooks__pageButton} onClick={paginationPrev}><Image alt='' src={endSlice/booksOnPage==1?pagesDisPrev:pagesActPrev}></Image></button>
                    {pages.map(z => (
                        
                         <div onClick={() => { setStartSlice(z * booksOnPage - booksOnPage); setEndSlice(z * booksOnPage) }} key={z} className={endSlice/booksOnPage==z?styles.catalogBooks__pageActive:styles.catalogBooks__page}>
                            <p className={styles.catalogBooks__pageText} key={z}>
                    {z}
                </p>
                         </div>
                
            ))}
                 <button className={styles.catalogBooks__pageButton} onClick={paginationNext}><Image alt='' src={endSlice/booksOnPage==pages.length?pagesDisNext:pagesActNext}></Image></button>
           
                    </div>
                     
                </div>}
            </div>

            
        </>
    )
}