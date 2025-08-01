'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import useCartStore from '../../lib/store';
import QuantityToggle from '../components/QuantityToggle';

// Sample menu data
const menuItems = {
  pizza: [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella cheese, basil leaves",
      price: 250,
      image: "https://b.zmtcdn.com/data/pictures/chains/3/143/ce0341e58cf96f163101b4dff77ed938.jpg?fit=around|960:500&crop=960:500;*,*",
      category: "pizza",
      ingredients: ["Tomato sauce", "Mozzarella", "Fresh basil", "Olive oil"]
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Classic pepperoni with mozzarella cheese",
      price: 315,
      image: "https://static.toiimg.com/photo/51089680.cms",
      category: "pizza",
      ingredients: ["Tomato sauce", "Mozzarella", "Pepperoni"]
    },
    {
      id: 3,
      name: "Veggie Supreme",
      description: "Bell peppers, mushrooms, onions, olives",
      price: 199,
      image: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/26/d112a6d7-d173-4ca7-a5ee-40f845719d18_841144.JPG",
      category: "pizza",
      ingredients: ["Tomato sauce", "Mozzarella", "Bell peppers", "Mushrooms", "Onions", "Olives"]
    }
  ],
  burgers: [
    {
      id: 4,
      name: "Gourmet Burger",
      description: "Grilled chicken with special sauce and crispy fries",
      price: 299,
      image: "https://b.zmtcdn.com/data/pictures/chains/9/20929619/c3f54cba35a8c043a2086910bef57af4.jpeg?fit=around|960:500&crop=960:500;*,*",
      category: "burgers",
      ingredients: ["Chicken patty", "Special sauce", "Lettuce", "Tomato", "Onion"]
    },
    {
      id: 5,
      name: "Chicken Deluxe",
      description: "Grilled chicken breast with avocado and bacon",
      price: 200,
      image: "https://s7d1.scene7.com/is/image/mcdonalds/DC_202012_0370_DeluxeCrispyChicken_PotatoBun_1564x1564-1:product-header-mobile?wid=1313&hei=1313&dpr=off",
      category: "burgers",
      ingredients: ["Chicken breast", "Avocado", "Bacon", "Lettuce", "Tomato"]
    },
    {
      id: 6,
      name: "Veggie Burger",
      description: "Plant-based patty with fresh vegetables",
      price: 149,
      image: "https://www.inspiredtaste.net/wp-content/uploads/2018/05/Homemade-Mushroom-Veggie-Burger-Recipe-1200.jpg",
      category: "burgers",
      ingredients: ["Plant-based patty", "Lettuce", "Tomato", "Onion", "Avocado"]
    }
  ],
  desserts: [
    {
      id: 7,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with chocolate frosting",
      price: 450,
      image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/easy_chocolate_cake_31070_16x9.jpg",
      category: "desserts",
      ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter"]
    },
    {
      id: 8,
      name: "Cheesecake",
      description: "Creamy New York style cheesecake",
      price: 900,
      image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/baileysandchocolatec_72293_16x9.jpg",
      category: "desserts",
      ingredients: ["Cream cheese", "Graham crackers", "Sugar", "Vanilla"]
    },
    {
      id: 11,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with vanilla ice cream",
      price: 450,
      image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/easy_chocolate_cake_31070_16x9.jpg",
      category: "desserts",
      ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter", "Vanilla ice cream"]
    }
  ],
  drinks: [
    {
      id: 9,
      name: "Fresh Orange Juice",
      description: "Freshly squeezed orange juice",
      price: 350,
      image: "https://images-prod.healthline.com/hlcmsresource/images/AN_images/orange-juice-1296x728-feature.jpg",
      category: "drinks",
      ingredients: ["Fresh oranges"]
    },
    {
      id: 10,
      name: "Iced Coffee",
      description: "Cold brew coffee with ice",
      price: 269,
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2025/05/how-to-make-iced-coffee-at-home.jpg",
      category: "drinks",
      ingredients: ["Coffee beans", "Ice", "Milk"]
    }
  ]
};

const categories = [
  { id: 'all', name: 'All Items', emoji: '🍽️' },
  { id: 'pizza', name: 'Pizza', emoji: '🍕' },
  { id: 'burgers', name: 'Burgers', emoji: '🍔' },
  { id: 'desserts', name: 'Desserts', emoji: '🍰' },
  { id: 'drinks', name: 'Drinks', emoji: '🥤' }
];

function MenuContent() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && ['pizza', 'burgers', 'desserts', 'drinks'].includes(category)) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const getAllItems = () => {
    return Object.values(menuItems).flat();
  };

  const getFilteredItems = () => {
    if (selectedCategory === 'all') {
      return getAllItems();
    }
    return menuItems[selectedCategory] || [];
  };

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
            }`}
          >
            <span>{category.emoji}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredItems().map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/menu/${item.id}`}>
              <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100 cursor-pointer">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={item.category === 'pizza'}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-500 text-sm mt-1 h-10 overflow-hidden">{item.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-orange-600">₹{item.price}</span>
                <QuantityToggle item={item} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">Our Menu</h1>
          <p className="text-xl text-black">Discover our delicious selection of food and drinks</p>
        </div>

        <Suspense fallback={<div className="text-center text-xl">Loading menu...</div>}>
          <MenuContent />
        </Suspense>

      </div>
    </div>
  );
}