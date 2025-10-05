'use client'
import React, { useState } from 'react'
import styles from './catalogFilters.module.scss'
import Image from 'next/image'
import search from '@/public/search-icon.svg'
import Button from '../button/Button'
interface FiltersProps {
  
    actionFilters:(b:boolean)=>void
}
export default function CatalogFilters({actionFilters}:FiltersProps) {
      const [selectedGenres, setSelectedGenres] = useState<string[]>([])
      const [selectedLang, setSelectedLang] = useState<string[]>([])
      const [minPrice,setMinPrice]=useState('0')
      const [maxPrice,setMaxPrice]=useState('9999')
      const [author,setAuthor]=useState('')


      function setFilters(){
    const stringSelectedGenres = selectedGenres.join(',')
    localStorage.setItem('genres', stringSelectedGenres)

    const stringSelectedLang = selectedLang.join(',')
    localStorage.setItem('lang', stringSelectedLang)

    localStorage.setItem('minPrice', minPrice)
    localStorage.setItem('maxPrice', maxPrice)
    localStorage.setItem('author', author)
    
 
    window.dispatchEvent(new Event('localStorageChange'))
}

function resetFilters(){
  setSelectedGenres([])
  setSelectedLang([])
  setMinPrice('0')
  setMaxPrice('9999')
  setAuthor('')
}

  const genres = [
    "Fiction", "Nonfiction", "Science Fiction", "Fantasy", "Romance",
    "Mystery", "Thriller", "Biography", "History", "Science",
    "Business", "Self-Help", "Travel", "Art", "Young Adult"
  ]
  const lang = 
    {en:'English',rus:'Russian'}
  

  const handleGenreChange = (genre: string) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre]
    
    setSelectedGenres(newSelectedGenres)
 /*    onFilterChange({ genres: newSelectedGenres }) */
  }
   const handleLangChange = (lang: string) => {
    const newSelectedLang = selectedLang.includes(lang)
      ? selectedLang.filter(g => g !== lang)
      : [...selectedLang, lang]
    
    setSelectedLang(newSelectedLang)
 /*    onFilterChange({ genres: newSelectedGenres }) */
  }

  const handleMinPriceChange = (value: string) => {

  const cleanValue = value.replace(/[+\-!@#$%^&*()_=]/g, '')
 
  const withoutLeadingZeros = cleanValue.replace(/^0+/, '')
  setMinPrice(withoutLeadingZeros)
}

const handleMaxPriceChange = (value: string) => {

  const cleanValue = value.replace(/[+\-!@#$%^&*()_=]/g, '')
 
  const withoutLeadingZeros = cleanValue.replace(/^0+/, '')
  setMaxPrice(withoutLeadingZeros)
}
  return (
    <>
        <div className={styles.catalogFilters}>
            <div className={styles.catalogFilters__container}>
              <button className={styles.catalogFilters__exit} onClick={()=>actionFilters(false)}>exit</button>
                <div className={styles.catalogFilters__list}>
                    
                    <div className={styles.catalogFilters__listItem}>
                            <h4 className={styles.catalogFilters__title}>Genres</h4>
                            <div className={styles.catalogFilters__choices}>
                                {genres.map(genre => (
          
            <div key={genre} className={styles.catalogFilters__choice}>
              <input 
                id={genre} 
                name='genre' 
                type="checkbox" 
               
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
              <label htmlFor={genre}>{genre}</label>
           
          </div>
                            ))}
                            </div>
                            
                            
                       
                    </div>
                    <div className={styles.catalogFilters__listItem}>
                         <h4 className={styles.catalogFilters__title}>Price</h4>
                          <div className={styles.catalogFilters__inputs}>
                            <input className={styles.catalogFilters__input} onChange={(e)=>handleMinPriceChange(e.target.value)} value={minPrice} type="text" />
                            <p>-</p>
                            <input className={styles.catalogFilters__input} onChange={(e)=>handleMaxPriceChange(e.target.value)} value={maxPrice} type="text" />
                          </div>
                    </div>
                    <div className={styles.catalogFilters__listItem}>
                        <h4>Author</h4>
                        <div className={styles.catalogFilters__search}>
                            <div className={styles.catalogFilters__searchContainer}>
                                 <input placeholder='searching by author name' className={styles.catalogFilters__searchInput} onChange={(e)=>setAuthor(e.target.value)} value={author} type="text" />
                            <Image src={search} alt='search'></Image>
                            </div>
                           
                        </div>
                        
                    </div>
                    <div className={styles.catalogFilters__listItem}>
                            <h4 className={styles.catalogFilters__title}>Languages</h4>
                            <div className={styles.catalogFilters__choices}>
                                {Object.entries(lang).map(([key, value]) => (
  <div key={key} className={styles.catalogFilters__choice}>
    <input 
      id={key} 
      name='lang' 
      type="checkbox" 
      
      checked={selectedLang.includes(key)}
      onChange={() => handleLangChange(key)}
    />
    <label htmlFor={key}>{value}</label> 
  </div>
))}
                            </div>
                           
                            
                       
                    </div>

                </div>
                 <div className={styles.catalogFilters__buttons}>
                    <div onClick={()=>{setFilters();actionFilters(false)}} className={styles.catalogFilters__buttonSave}>
                        <Button width={285} height={35} text='Применить'></Button>
                    </div>
                    
                    <button onClick={resetFilters} className={styles.catalogFilters__button}>Очистить</button>
                 </div>
            </div>
        </div>
    </>
  )
}
