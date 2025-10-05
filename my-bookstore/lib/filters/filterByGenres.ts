export default function filterByGenres(genres: string[], choosengGenres: string[]) {
  if (choosengGenres.length == 0) {
    return true;
  }

  return choosengGenres.some((g) => genres.includes(g));
}
