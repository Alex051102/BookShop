export default interface SelectionBook {
  id: string;
  title: string;
  coverUrl: string;
  rating?: number;

  editionCount: number;
  price: number;

  publisher: string;
  isbn: string;

  pages: number | string;
  date: string;
  author: string;
  genres: string[];
  lang: string;
}

export interface BookInfo {
  id: string;
  image: string;

  publisher: string;

  isbn: string;

  author: string;

  pages: number | string;

  date: string;

  description: string;

  title: string;

  editionCount: number;
  price: number;
  rating: number;
  genres: string[];
}
