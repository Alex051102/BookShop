import { getSession } from 'next-auth/react';

const favoriteClick = async (id: string) => {
  const session = await getSession();

  if (!session) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    await fetch(`/database/cart?productId=${id}`, {
      method: 'DELETE',
    });
  } catch {}
};
export default favoriteClick;
