// components/SelectionWrapper.tsx
import getBooks from '@/lib/api/getBooks'

import SelectionBook from '@/types/booksTypes'
import Selection from '../Ui/selection/Selection'

interface SelectionWrapperProps {
    title: string,
    type: string
}

export default async function SelectionWrapper({ title, type }: SelectionWrapperProps) {
    const books: SelectionBook[] = await getBooks(`subject:${type}`)

    
    return <Selection title={title}  books={books} />
}