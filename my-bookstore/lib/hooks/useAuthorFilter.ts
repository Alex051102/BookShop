import { useEffect, useState } from "react"

export default function useAuthorFilter() {
    const [selectedAuthor, setSelectedAuthor] = useState<string>('')
   
    useEffect(() => {
        const getAuthor = () => {
            const saved = localStorage.getItem('author')
            return saved ? saved : ''
        }
       

        setSelectedAuthor(getAuthor())

        const handleStorageChange = () => {
            setSelectedAuthor(getAuthor())
           
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('localStorageChange', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('localStorageChange', handleStorageChange)
        }
    }, [])

    return selectedAuthor
}