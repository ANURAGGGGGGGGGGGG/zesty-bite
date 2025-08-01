import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

// GET - Fetch all orders
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('zestybite');
    const collection = db.collection('orders');

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const page = parseInt(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) {
      query.status = status;
    }

    const orders = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalOrders = await collection.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total: totalOrders,
        pages: Math.ceil(totalOrders / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST - Create a new order
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('zestybite');
    const collection = db.collection('orders');

    const body = await request.json();
    
    // Generate order ID
    const orderCount = await collection.countDocuments();
    const orderId = `ORD-${Date.now()}-${(orderCount + 1).toString().padStart(4, '0')}`;

    // Calculate totals
    const subtotal = body.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + deliveryFee + tax;

    const newOrder = {
      id: orderId,
      ...body,
      subtotal: parseFloat(subtotal.toFixed(2)),
      deliveryFee: parseFloat(deliveryFee.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      status: 'pending',
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newOrder);

    return NextResponse.json({
      success: true,
      data: newOrder
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// PUT - Update order status
export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db('zestybite');
    const collection = db.collection('orders');

    const body = await request.json();
    const { id, status, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedOrder = {
      ...updateData,
      updatedAt: new Date()
    };

    if (status) {
      updatedOrder.status = status;
      
      // Update estimated delivery based on status
      if (status === 'confirmed') {
        updatedOrder.estimatedDelivery = new Date(Date.now() + 40 * 60 * 1000); // 40 minutes
      } else if (status === 'preparing') {
        updatedOrder.estimatedDelivery = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
      } else if (status === 'ready') {
        updatedOrder.estimatedDelivery = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      } else if (status === 'out_for_delivery') {
        updatedOrder.estimatedDelivery = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      } else if (status === 'delivered') {
        updatedOrder.deliveredAt = new Date();
        updatedOrder.estimatedDelivery = null;
      }
    }

    const result = await collection.updateOne(
      { id: id },
      { $set: updatedOrder }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const updated = await collection.findOne({ id: id });

    return NextResponse.json({
      success: true,
      data: updated
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    );
  }
}