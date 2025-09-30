export default interface SelectionBook {
  id: number;
  title: string;
  coverUrl: string;
  rating?: number;

  editionCount: number;
  price: number;
}

export interface BookInfo {
  id: string;
  image: string;

  publisher: string;

  isbn: string;

  author: string;

  pages: number;

  year: number;

  description: string;

  title: string;

  editionCount: number;
  price: number;
  rating: number;
  genres: string[];
}
