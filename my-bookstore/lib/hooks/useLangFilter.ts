import { useEffect, useState } from "react"

export default function useLangFilter() {
    const [selectedLang, setSelectedLang] = useState<string[]>([])
   
    useEffect(() => {
        const getLang = () => {
            const saved = localStorage.getItem('lang')
            return saved ? saved.split(',') : []
        }
       

        setSelectedLang(getLang())

        const handleStorageChange = () => {
            setSelectedLang(getLang())
           
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('localStorageChange', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('localStorageChange', handleStorageChange)
        }
    }, [])

    return selectedLang
}