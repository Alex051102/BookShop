'use client'
import { useRef } from 'react'
import SelectionBook from '@/types/booksTypes'
import SelectionBookItem from '../../Ui/selectionBookItem/SelectionBookItem'
import SelectionBookItemSkeleton from '../../Ui/selectionBookItemSkeleton/SelectionBookItemSkeleton'
import styles from './selection.module.scss'
import right from '@/public/rightArrow.svg'
import left from '@/public/leftArrow.svg'
import Image from 'next/image'

interface SelectionProps {
    title: string,
    books: SelectionBook[]
    isLoading?: boolean
    skeletonCount?: number
}

export default function Selection({ 
    title, 
    books, 
    isLoading = false,
    skeletonCount = 6 
}: SelectionProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -400,
                behavior: 'smooth'
            })
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 400,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className={styles.selection}>
            <h1 className={styles.selection__title}>{title}</h1>
            
            <div className={styles.selection__wrapper}>
                {/* Стрелки показываем всегда, но для скелетонов можно сделать disabled */}
                <Image 
                    onClick={scrollLeft} 
                    className={`${styles.selection__leftArrow} ${isLoading ? styles.selection__arrowDisabled : ''}`} 
                    alt='left' 
                    src={left}
                />
                <Image 
                    onClick={scrollRight} 
                    className={`${styles.selection__rightArrow} ${isLoading ? styles.selection__arrowDisabled : ''}`} 
                    alt='right' 
                    src={right}
                />
           
                <div className={styles.selection__list}>
                    <div 
                        ref={scrollContainerRef}
                        className={styles.selection__listContainer}
                    >
                        {isLoading ? (
                            // Горизонтальные скелетоны
                            [...Array(skeletonCount)].map((_, index) => (
                                <SelectionBookItemSkeleton key={index} />
                            ))
                        ) : (
                            // Реальные карточки
                            books.map((b: SelectionBook) => (
                                <SelectionBookItem key={b.id} data={b} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}