import SelectionWrapper from '@/components/server/SelectionWrapper'
import BookInfo from '@/components/Ui/bookInfo/BookInfo'
import getInfoBook from '@/lib/api/getInfoBook'
import styles from './book.module.scss'
import getBooks from '@/lib/api/getBooks'

interface PageProps {
  params: {
    id: string
  }
}

export default async function BookDetail({ params }: PageProps) {
  const bookInfo = await getInfoBook(params.id)
  
  

  return (
    <div className={styles.book__outer}>
      <div className={styles.book}>
        <BookInfo data={bookInfo} />
        
      </div>
    </div>
  )
}