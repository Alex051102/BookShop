import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/database/auth';
import { supabase } from '@/lib/database/supabase';

// Получить заказы
export async function GET() {
  const session = await getServerSession(authOptions);
  
  // Двойная проверка
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', session.user.id) // ← теперь TypeScript знает что user.id существует
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(orders || []);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Создать заказ
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  // Двойная проверка
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { items, total } = await request.json();

    // Создаем заказ
    const { data: order, error } = await supabase
      .from('orders')
      .insert([
        {
          user_id: session.user.id, // ← теперь безопасно
          items: items,
          total: total,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Очищаем корзину после заказа
    await supabase.from('carts').update({ items: [] }).eq('user_id', session.user.id);

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}