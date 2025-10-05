export default function setEmptyFilters() {
  localStorage.setItem('genres', '');
  localStorage.setItem('lang', '');
  localStorage.setItem('minPrice', '0');
  localStorage.setItem('maxPrice', '9999');
  localStorage.setItem('author', '');

  window.dispatchEvent(new Event('localStorageChange'));
}
