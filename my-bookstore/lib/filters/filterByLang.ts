export default function filterByLang(lang: string, choosengLang: string[]) {
  if (choosengLang.length == 0) {
    return true;
  }

  return choosengLang.some((g) => g.includes(lang));
}
