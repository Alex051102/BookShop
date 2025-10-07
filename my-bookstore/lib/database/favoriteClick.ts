import { getSession } from 'next-auth/react';

export const favoriteClick = async (id: string) => {
  const session = await getSession();

  if (!session) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
   
    await fetch('/database/carts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id, quantity: 1 }),
    });
  } catch {
    return { success: false };
  }
};
