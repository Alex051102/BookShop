import React, { useEffect, useState } from 'react'
import Selection from '../selection/Selection'
import getBooks from '@/lib/api/getBooks'
import SelectionBook from '@/types/booksTypes'

interface SimilarProps {
  genres: string[]
}

export default function SimilarBooks({ genres }: SimilarProps) {
  const [similarBooks, setSimilarBooks] = useState<SelectionBook[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function findSimilarBooks() {
      setIsLoading(true)
      
      try {
        
        if (!genres || genres.length === 0) {
          const bestsellers = await getBooks('bestsellers')
          setSimilarBooks(bestsellers)
          return
        }

        
        for (const genre of genres) {
          try {
            const books = await getBooks(genre.toLowerCase())
            if (books && books.length > 0) {
              setSimilarBooks(books)
              return
            }
          } catch (error) {
            console.warn(`Failed to fetch books for genre: ${genre}`, error)
            continue
          }
        }

        
        const bestsellers = await getBooks('bestsellers')
        setSimilarBooks(bestsellers)
      } catch (error) {
        console.error('Failed to load similar books:', error)
        setSimilarBooks([])
      } finally {
        setIsLoading(false)
      }
    }
        
    findSimilarBooks()
  }, [genres])

  return (
    <Selection 
      title='Похожие книги'
      books={similarBooks}
      isLoading={isLoading}
      skeletonCount={6} 
    />
  )
}