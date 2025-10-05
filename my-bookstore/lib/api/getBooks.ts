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

      editionCount: item.volumeInfo.pageCount || 0,
      price: Math.ceil(item.saleInfo?.listPrice?.amount) || 0,
      rating:
        Math.floor(item.volumeInfo.averageRating) || Math.ceil(item.volumeInfo.pageCount / 10),
      reviewsCount: item.volumeInfo.ratingsCount || 0,

      publisher: item.volumeInfo.publisher || '-',
      isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || '-',

      pages: item.volumeInfo.pageCount || '-',
      date: item.volumeInfo.publishedDate || '-',
      genres: item.volumeInfo.categories || [],
      lang: item.volumeInfo.language || '-',
    }));
  }

  throw new Error('Failed to fetch books from Google Books API');
}
