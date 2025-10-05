
import getBooks from '@/lib/api/getBooks'
import CatalogSearch from '@/components/Ui/catalogSearch/CatalogSearch'
interface PageProps {
  params: {
    query: string
  }
}

export default async function CatalogQuery({ params }: PageProps) {
  const books = await getBooks(params.query)
  
  

  return (
    <CatalogSearch query={params.query} books={books}></CatalogSearch>
  )
}