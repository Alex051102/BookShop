const GOOGLE_BOOKS_API_KEY = 'AIzaSyCitwgfLEUfKGeuteUaCKpbcxclsyTrV4Y';

export default async function getBooks(type: string) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${type}&maxResults=40&key=${GOOGLE_BOOKS_API_KEY}`,
  );

  if (res.ok) {
    const data = await res.json();
    console.log(data);

    return data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title || 'No title',
      author: item.volumeInfo.authors?.[0] || 'Unknown Author',
      coverUrl:
        item.volumeInfo.imageLinks?.thumbnail ||
        item.volumeInfo.imageLinks?.smallThumbnail ||
        '/default-book-cover.jpg',

      // Реальные данные из Google Books
      editionCount: item.volumeInfo.pageCount || 0,
      price: item.saleInfo?.listPrice?.amount,
      rating: item.volumeInfo.averageRating,
      reviewsCount: item.volumeInfo.ratingsCount || 0,
    }));
  }

  throw new Error('Failed to fetch books from Google Books API');
}
