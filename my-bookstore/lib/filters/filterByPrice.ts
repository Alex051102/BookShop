export default function filterByPrice(price: number, choosengPrice: string[]) {
  const min = Number(choosengPrice[0]);
  const max = Number(choosengPrice[1]);

  if (price >= min && price <= max) {
    return true;
  }
  return false;
}
