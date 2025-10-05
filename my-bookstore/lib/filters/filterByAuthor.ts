export default function filterByAuthor(author: string, choosengAuthor: string) {
  if (choosengAuthor == '') {
    return true;
  }

  return author.toLowerCase().startsWith(choosengAuthor.toLowerCase());
}
