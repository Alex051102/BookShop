import { useEffect, useState } from "react"

export default function useGenresFilter() {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
   
    useEffect(() => {
        const getGenres = () => {
            const saved = localStorage.getItem('genres')
            return saved ? saved.split(',') : []
        }
       

        setSelectedGenres(getGenres())

        const handleStorageChange = () => {
            setSelectedGenres(getGenres())
           
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('localStorageChange', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('localStorageChange', handleStorageChange)
        }
    }, [])

    return selectedGenres
}