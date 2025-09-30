const GOOGLE_BOOKS_API_KEY = 'AIzaSyCitwgfLEUfKGeuteUaCKpbcxclsyTrV4Y';

export default async function getInfoBook(bookId: string) {
  try {
    // Ищем книгу в Google Books по ID
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${GOOGLE_BOOKS_API_KEY}`,
    );

    if (!res.ok) {
      throw new Error('Book not found in Google Books');
    }

    const data = await res.json();

    return {
      id: data.id,
      image:
        data.volumeInfo.imageLinks?.thumbnail ||
        data.volumeInfo.imageLinks?.smallThumbnail ||
        data.volumeInfo.imageLinks?.medium ||
        '',
      publisher: data.volumeInfo.publisher || '-',
      isbn: data.volumeInfo.industryIdentifiers?.[0]?.identifier || '-',
      author: data.volumeInfo.authors?.[0] || '-',
      pages: data.volumeInfo.pageCount || '-',
      year: data.volumeInfo.publishedDate || '-',
      description: getDescription(data.volumeInfo.description),
      title: data.volumeInfo.title || '-',
      editionCount: 1, // Google Books не дает edition_count
      price: data.saleInfo?.listPrice?.amount || Math.floor(Math.random() * 500) + 100,
      rating: data.volumeInfo.averageRating || 4.5,
      genres: data.volumeInfo.categories || [],
    };
  } catch (error) {
    console.error('Error fetching book details from Google Books:', error);
    return null;
  }
}

function getDescription(desc: any): string {
  if (!desc) return 'No Description';
  if (typeof desc === 'string') return desc;
  return 'No Description';
}
