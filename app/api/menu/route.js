import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

// Sample menu data for initial seeding
const sampleMenuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella cheese, basil leaves",
    price: 12.99,
    category: "pizza",
    ingredients: ["Tomato sauce", "Mozzarella", "Fresh basil", "Olive oil"],
    nutritionInfo: {
      calories: 280,
      protein: "12g",
      carbs: "35g",
      fat: "10g"
    },
    allergens: ["Gluten", "Dairy"],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Classic pepperoni with mozzarella cheese",
    price: 15.99,
    category: "pizza",
    ingredients: ["Tomato sauce", "Mozzarella", "Pepperoni"],
    nutritionInfo: {
      calories: 320,
      protein: "15g",
      carbs: "35g",
      fat: "14g"
    },
    allergens: ["Gluten", "Dairy"],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: "Veggie Supreme",
    description: "Bell peppers, mushrooms, onions, olives",
    price: 14.99,
    category: "pizza",
    ingredients: ["Tomato sauce", "Mozzarella", "Bell peppers", "Mushrooms", "Onions", "Olives"],
    nutritionInfo: {
      calories: 260,
      protein: "11g",
      carbs: "38g",
      fat: "8g"
    },
    allergens: ["Gluten", "Dairy"],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    name: "Classic Beef Burger",
    description: "Juicy beef patty with lettuce, tomato, onion",
    price: 9.99,
    category: "burgers",
    ingredients: ["Beef patty", "Lettuce", "Tomato", "Onion", "Pickles", "Burger sauce"],
    nutritionInfo: {
      calories: 450,
      protein: "25g",
      carbs: "35g",
      fat: "22g"
    },
    allergens: ["Gluten"],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    name: "Chicken Deluxe",
    description: "Grilled chicken breast with avocado and bacon",
    price: 11.99,
    category: "burgers",
    ingredients: ["Chicken breast", "Avocado", "Bacon", "Lettuce", "Tomato"],
    nutritionInfo: {
      calories: 520,
      protein: "30g",
      carbs: "32g",
      fat: "28g"
    },
    allergens: ["Gluten"],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    name: "Veggie Burger",
    description: "Plant-based patty with fresh vegetables",
    price: 8.99,
    category: "burgers",
    ingredients: ["Plant-based patty", "Lettuce", "Tomato", "Onion", "Avocado"],
    nutritionInfo: {
      calories: 380,
      protein: "18g",
      carbs: "42g",
      fat: "16g"
    },
    allergens: ["Gluten", "Soy"],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with chocolate frosting",
    price: 6.99,
    category: "desserts",
    ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter"],
    nutritionInfo: {
      calories: 420,
      protein: "6g",
      carbs: "58g",
      fat: "18g"
    },
    allergens: ["Gluten", "Dairy", "Eggs"],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    name: "Cheesecake",
    description: "Creamy New York style cheesecake",
    price: 7.99,
    category: "desserts",
    ingredients: ["Cream cheese", "Graham crackers", "Sugar", "Vanilla"],
    nutritionInfo: {
      calories: 380,
      protein: "8g",
      carbs: "35g",
      fat: "24g"
    },
    allergens: ["Gluten", "Dairy", "Eggs"],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    price: 3.99,
    category: "drinks",
    ingredients: ["Fresh oranges"],
    nutritionInfo: {
      calories: 110,
      protein: "2g",
      carbs: "26g",
      fat: "0g"
    },
    allergens: [],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 10,
    name: "Iced Coffee",
    description: "Cold brew coffee with ice",
    price: 4.99,
    category: "drinks",
    ingredients: ["Coffee beans", "Ice", "Milk"],
    nutritionInfo: {
      calories: 80,
      protein: "4g",
      carbs: "8g",
      fat: "3g"
    },
    allergens: ["Dairy"],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// GET - Fetch all menu items
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('zestybite');
    const collection = db.collection('menuItems');

    // Check if collection is empty and seed with sample data
    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertMany(sampleMenuItems);
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const available = searchParams.get('available');

    let query = {};
    if (category) {
      query.category = category;
    }
    if (available !== null) {
      query.available = available === 'true';
    }

    const menuItems = await collection.find(query).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

// POST - Create a new menu item
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('zestybite');
    const collection = db.collection('menuItems');

    const body = await request.json();
    
    // Generate new ID
    const lastItem = await collection.findOne({}, { sort: { id: -1 } });
    const newId = lastItem ? lastItem.id + 1 : 1;

    const newMenuItem = {
      id: newId,
      ...body,
      available: body.available !== undefined ? body.available : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newMenuItem);

    return NextResponse.json({
      success: true,
      data: newMenuItem
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
}

// PUT - Update a menu item
export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db('zestybite');
    const collection = db.collection('menuItems');

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Menu item ID is required' },
        { status: 400 }
      );
    }

    const updatedMenuItem = {
      ...updateData,
      updatedAt: new Date()
    };

    const result = await collection.updateOne(
      { id: parseInt(id) },
      { $set: updatedMenuItem }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Menu item not found' },
        { status: 404 }
      );
    }

    const updated = await collection.findOne({ id: parseInt(id) });

    return NextResponse.json({
      success: true,
      data: updated
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update menu item' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a menu item
export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db('zestybite');
    const collection = db.collection('menuItems');

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Menu item ID is required' },
        { status: 400 }
      );
    }

    const result = await collection.deleteOne({ id: parseInt(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Menu item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
}