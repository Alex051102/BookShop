import { getSession } from 'next-auth/react';
const getFavourite = async () => {
  const session = await getSession();
  if (!session) {
    return;
  }

  try {
    const response = await fetch('/database/cart', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error fetching favorites:', error);
    return [];
  }
};
export default getFavourite;
