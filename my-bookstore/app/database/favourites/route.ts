import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/database/auth';
import { supabase } from '@/lib/database/supabase';

// Получить избранное
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { data: favourites, error } = await supabase
      .from('favourites')
      .select('items')
      .eq('user_id', session.user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json(favourites?.items || []);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Добавить в избранное
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { productId } = await request.json();

    // Получаем текущее избранное
    const { data: currentFavs } = await supabase
      .from('favourites')
      .select('items')
      .eq('user_id', session.user.id)
      .single();

    const currentItems = currentFavs?.items || [];

    // Проверяем нет ли уже в избранном
    const exists = currentItems.find((item: any) => item.productId === productId);

    if (!exists) {
      const newItems = [...currentItems, { productId }];

      const { error } = await supabase.from('favourites').upsert(
        {
          user_id: session.user.id,
          items: newItems,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id',
        },
      );

      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Удалить из избранного
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    // Получаем текущее избранное
    const { data: currentFavs } = await supabase
      .from('favourites')
      .select('items')
      .eq('user_id', session.user.id)
      .single();

    if (!currentFavs) {
      return NextResponse.json({ error: 'Favourites not found' }, { status: 404 });
    }

    // Удаляем товар
    const newItems = currentFavs.items.filter((item: any) => item.productId !== productId);

    // Обновляем избранное
    const { error } = await supabase
      .from('favourites')
      .update({
        items: newItems,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', session.user.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
