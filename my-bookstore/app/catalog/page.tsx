
import getBooks from '@/lib/api/getBooks'

import SelectionBook from '@/types/booksTypes'
import Selection from '../../components/Ui/selection/Selection'



export default async function Catalog() {
    const books: SelectionBook[] = await getBooks(`love`)

    
    return <Selection title='love'  books={books} />
}