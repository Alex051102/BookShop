import { useEffect, useState } from "react"

export default function usePriceFilter() {
    const [selectedPrice, setSelectedPrice] = useState<string[]>(['',''])
   
    useEffect(() => {
        const getPrice = () => {
            const savedMin = localStorage.getItem('minPrice')
             const savedmax = localStorage.getItem('maxPrice')
            return savedMin && savedmax ? [savedMin,savedmax] : []
        }
       

        setSelectedPrice(getPrice())

        const handleStorageChange = () => {
            setSelectedPrice(getPrice())
           
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('localStorageChange', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('localStorageChange', handleStorageChange)
        }
    }, [])

    return selectedPrice
}