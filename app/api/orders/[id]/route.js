import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

// GET - Fetch a specific order by ID
export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('zestybite');
    const collection = db.collection('orders');

    const { id } = params;

    const order = await collection.findOne({ id: id });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// PUT - Update a specific order
export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('zestybite');
    const collection = db.collection('orders');

    const { id } = params;
    const body = await request.json();

    const { status, ...updateData } = body;

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

// DELETE - Cancel/Delete an order
export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('zestybite');
    const collection = db.collection('orders');

    const { id } = params;

    // Check if order exists and can be cancelled
    const order = await collection.findOne({ id: id });
    
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Only allow cancellation if order is not delivered or out for delivery
    if (['delivered', 'out_for_delivery'].includes(order.status)) {
      return NextResponse.json(
        { success: false, error: 'Cannot cancel order that is delivered or out for delivery' },
        { status: 400 }
      );
    }

    // Update order status to cancelled instead of deleting
    const result = await collection.updateOne(
      { id: id },
      { 
        $set: { 
          status: 'cancelled',
          cancelledAt: new Date(),
          updatedAt: new Date()
        }
      }
    );

    const updated = await collection.findOne({ id: id });

    return NextResponse.json({
      success: true,
      data: updated,
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to cancel order' },
      { status: 500 }
    );
  }
}