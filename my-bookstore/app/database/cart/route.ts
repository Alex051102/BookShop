import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/database/auth';
import { supabase } from '@/lib/database/supabase';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🛒 Getting cart for user:', session.user.id);

    const { data: cart, error } = await supabase
      .from('carts')
      .select('items')
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      console.log('❌ Cart error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json([]);
      }
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    console.log('✅ Cart found:', cart?.items);
    return NextResponse.json(cart?.items || []);
  } catch (error) {
    console.log('❌ Server error in GET cart:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, quantity } = await request.json();

    if (!productId || quantity === undefined) {
      return NextResponse.json({ error: 'Product ID and quantity are required' }, { status: 400 });
    }

    if (quantity < 0) {
      return NextResponse.json({ error: 'Quantity cannot be negative' }, { status: 400 });
    }

    console.log('🛒 Updating cart item:', { userId: session.user.id, productId, quantity });

    const { data: currentCart, error: fetchError } = await supabase
      .from('carts')
      .select('items')
      .eq('user_id', session.user.id)
      .single();

    let currentItems = [];

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.log('❌ Fetch cart error:', fetchError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (currentCart) {
      currentItems = currentCart.items || [];
    }

    console.log('📦 Current items:', currentItems);

    let newItems;

    if (quantity === 0) {
      newItems = currentItems.filter((item: any) => item.productId !== productId);
      console.log('🗑️ Removing item with quantity 0');
    } else {
      const existingItemIndex = currentItems.findIndex((item: any) => item.productId === productId);

      if (existingItemIndex >= 0) {
        newItems = [...currentItems];
        newItems[existingItemIndex].quantity = quantity;
        console.log('✏️ Updated quantity:', newItems[existingItemIndex]);
      } else {
        newItems = [...currentItems, { productId, quantity }];
        console.log('🆕 Added new item:', { productId, quantity });
      }
    }

    if (newItems.length === 0) {
      const { error: deleteError } = await supabase
        .from('carts')
        .delete()
        .eq('user_id', session.user.id);

      if (deleteError) {
        console.log('❌ Delete cart error:', deleteError);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }
    } else {
      const { error: upsertError } = await supabase.from('carts').upsert(
        {
          user_id: session.user.id,
          items: newItems,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id',
        },
      );

      if (upsertError) {
        console.log('❌ Upsert error:', upsertError);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }
    }

    console.log('✅ Cart updated successfully');
    return NextResponse.json({ success: true, items: newItems });
  } catch (error) {
    console.log('❌ Server error in PUT cart:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, quantity = 1 } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    console.log('🛒 Adding to cart:', { userId: session.user.id, productId, quantity });

    const { data: currentCart, error: fetchError } = await supabase
      .from('carts')
      .select('items')
      .eq('user_id', session.user.id)
      .single();

    let currentItems = [];

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.log('❌ Fetch cart error:', fetchError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (currentCart) {
      currentItems = currentCart.items || [];
    }

    console.log('📦 Current items:', currentItems);

    const existingItemIndex = currentItems.findIndex((item: any) => item.productId === productId);

    let newItems;
    if (existingItemIndex >= 0) {
      newItems = [...currentItems];
      newItems[existingItemIndex].quantity += 1;
      console.log('➕ Increased quantity:', newItems[existingItemIndex]);
    } else {
      newItems = [...currentItems, { productId, quantity }];
      console.log('🆕 Added new item:', { productId, quantity });
    }

    const { error: upsertError } = await supabase.from('carts').upsert(
      {
        user_id: session.user.id,
        items: newItems,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id',
      },
    );

    if (upsertError) {
      console.log('❌ Upsert error:', upsertError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    console.log('✅ Cart updated successfully');
    return NextResponse.json({ success: true, items: newItems });
  } catch (error) {
    console.log('❌ Server error in POST cart:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    console.log('🗑️ Removing from cart:', { userId: session.user.id, productId });

    const { data: currentCart, error: fetchError } = await supabase
      .from('carts')
      .select('items')
      .eq('user_id', session.user.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.log('❌ Fetch cart error:', fetchError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!currentCart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const currentItems = currentCart.items || [];
    console.log('📦 Current items before removal:', currentItems);

    const newItems = currentItems.filter((item: any) => item.productId !== productId);
    console.log('📦 New items after removal:', newItems);

    if (newItems.length === 0) {
      const { error: deleteError } = await supabase
        .from('carts')
        .delete()
        .eq('user_id', session.user.id);

      if (deleteError) {
        console.log('❌ Delete cart error:', deleteError);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }
    } else {
      const { error: updateError } = await supabase
        .from('carts')
        .update({
          items: newItems,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', session.user.id);

      if (updateError) {
        console.log('❌ Update cart error:', updateError);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }
    }

    console.log('✅ Item removed from cart successfully');
    return NextResponse.json({ success: true, items: newItems });
  } catch (error) {
    console.log('❌ Server error in DELETE cart:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
