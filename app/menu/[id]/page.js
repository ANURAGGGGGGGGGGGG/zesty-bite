'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FiShoppingBag, FiPlus, FiMinus, FiChevronLeft, FiStar, FiHeart, FiShare2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import useCartStore from '../../../lib/store';

// Sample menu data (same as in menu page)
const menuItems = {
  pizza: [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella cheese, basil leaves",
      price: 250,
      image: "https://b.zmtcdn.com/data/pictures/chains/3/143/ce0341e58cf96f163101b4dff77ed938.jpg?fit=around|960:500&crop=960:500;*,*",
      category: "pizza",
      ingredients: ["Tomato sauce", "Mozzarella", "Fresh basil", "Olive oil"],
      nutritionInfo: {
        calories: 280,
        protein: "12g",
        carbs: "35g",
        fat: "10g"
      },
      allergens: ["Gluten", "Dairy"],
      rating: 4.7,
      reviews: 142
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Classic pepperoni with mozzarella cheese",
      price: 315,
      image: "https://static.toiimg.com/photo/51089680.cms",
      category: "pizza",
      ingredients: ["Tomato sauce", "Mozzarella", "Pepperoni"],
      nutritionInfo: {
        calories: 320,
        protein: "15g",
        carbs: "35g",
        fat: "14g"
      },
      allergens: ["Gluten", "Dairy"],
      rating: 4.5,
      reviews: 98
    },
    {
      id: 3,
      name: "Veggie Supreme",
      description: "Bell peppers, mushrooms, onions, olives",
      price: 199,
      image: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/26/d112a6d7-d173-4ca7-a5ee-40f845719d18_841144.JPG",
      category: "pizza",
      ingredients: ["Tomato sauce", "Mozzarella", "Bell peppers", "Mushrooms", "Onions", "Olives"],
      nutritionInfo: {
        calories: 260,
        protein: "11g",
        carbs: "38g",
        fat: "8g"
      },
      allergens: ["Gluten", "Dairy"],
      rating: 4.3,
      reviews: 87
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
      ingredients: ["Chicken patty", "Special sauce", "Lettuce", "Tomato", "Onion"],
      nutritionInfo: {
        calories: 450,
        protein: "25g",
        carbs: "35g",
        fat: "22g"
      },
      allergens: ["Gluten"],
      rating: 4.6,
      reviews: 121
    },
    {
      id: 5,
      name: "Chicken Deluxe",
      description: "Grilled chicken breast with avocado and bacon",
      price: 200,
      image: "https://s7d1.scene7.com/is/image/mcdonalds/DC_202012_0370_DeluxeCrispyChicken_PotatoBun_1564x1564-1:product-header-mobile?wid=1313&hei=1313&dpr=off",
      category: "burgers",
      ingredients: ["Chicken breast", "Avocado", "Bacon", "Lettuce", "Tomato"],
      nutritionInfo: {
        calories: 520,
        protein: "30g",
        carbs: "32g",
        fat: "28g"
      },
      allergens: ["Gluten"],
      rating: 4.4,
      reviews: 89
    },
    {
      id: 6,
      name: "Veggie Burger",
      description: "Plant-based patty with fresh vegetables",
      price: 149,
      image: "https://www.inspiredtaste.net/wp-content/uploads/2018/05/Homemade-Mushroom-Veggie-Burger-Recipe-1200.jpg",
      category: "burgers",
      ingredients: ["Plant-based patty", "Lettuce", "Tomato", "Onion", "Avocado"],
      nutritionInfo: {
        calories: 380,
        protein: "18g",
        carbs: "42g",
        fat: "16g"
      },
      allergens: ["Gluten", "Soy"],
      rating: 4.2,
      reviews: 64
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
      ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter"],
      nutritionInfo: {
        calories: 420,
        protein: "6g",
        carbs: "58g",
        fat: "18g"
      },
      allergens: ["Gluten", "Dairy", "Eggs"],
      rating: 4.8,
      reviews: 156
    },
    {
      id: 8,
      name: "Cheesecake",
      description: "Creamy New York style cheesecake",
      price: 900,
      image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/baileysandchocolatec_72293_16x9.jpg",
      category: "desserts",
      ingredients: ["Cream cheese", "Graham crackers", "Sugar", "Vanilla"],
      nutritionInfo: {
        calories: 380,
        protein: "8g",
        carbs: "35g",
        fat: "24g"
      },
      allergens: ["Gluten", "Dairy", "Eggs"],
      rating: 4.9,
      reviews: 203
    },
    {
      id: 11,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with vanilla ice cream",
      price: 450,
      image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/easy_chocolate_cake_31070_16x9.jpg",
      category: "desserts",
      ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter", "Vanilla ice cream"],
      nutritionInfo: {
        calories: 420,
        protein: "6g",
        carbs: "58g",
        fat: "18g"
      },
      allergens: ["Gluten", "Dairy", "Eggs"],
      rating: 4.7,
      reviews: 132
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
      ingredients: ["Fresh oranges"],
      nutritionInfo: {
        calories: 110,
        protein: "2g",
        carbs: "26g",
        fat: "0g"
      },
      allergens: [],
      rating: 4.6,
      reviews: 78
    },
    {
      id: 10,
      name: "Iced Coffee",
      description: "Cold brew coffee with ice",
      price: 269,
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2025/05/how-to-make-iced-coffee-at-home.jpg",
      category: "drinks",
      ingredients: ["Coffee beans", "Ice", "Milk"],
      nutritionInfo: {
        calories: 80,
        protein: "4g",
        carbs: "8g",
        fat: "3g"
      },
      allergens: ["Dairy"],
      rating: 4.3,
      reviews: 65
    }
  ]
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id);
  const { addItem, totalItems } = useCartStore();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Find the product in all categories
    const findProduct = () => {
      for (const category of Object.values(menuItems)) {
        const foundProduct = category.find(item => item.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
          break;
        }
      }
      setLoading(false);
    };

    findProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    const customizations = {
      size: selectedSize,
      addOns: selectedAddOns
    };

    // Calculate unit price with add-ons and size
    let unitPrice = product.price;
    if (selectedSize === 'large') unitPrice += 100;
    if (selectedSize === 'small') unitPrice -= 50;
    unitPrice += selectedAddOns.length * 50;

    const productWithCustomizations = {
      ...product,
      price: unitPrice
    };

    addItem(productWithCustomizations, quantity, customizations);
    
    // Show success notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleAddOn = (addOn) => {
    setSelectedAddOns(prev => 
      prev.includes(addOn) 
        ? prev.filter(item => item !== addOn)
        : [...prev, addOn]
    );
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;
    
    let unitPrice = product.price;
    if (selectedSize === 'large') unitPrice += 100;
    if (selectedSize === 'small') unitPrice -= 50;
    unitPrice += selectedAddOns.length * 50;
    
    return unitPrice * quantity;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-16 h-16 rounded-full bg-orange-500 animate-ping opacity-75"></div>
            <div className="w-16 h-16 rounded-full bg-orange-600 absolute top-0 flex items-center justify-center">
              <FiShoppingBag className="text-white text-2xl" />
            </div>
          </div>
          <p className="text-xl text-gray-600">Loading delicious details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag className="text-orange-600 text-4xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The delicious item you're looking for doesn't exist.</p>
            <Link
              href="/menu"
              className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-all"
            >
              Browse Our Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const availableAddOns = {
    pizza: ['Extra Cheese', 'Mushrooms', 'Pepperoni', 'Bell Peppers', 'Olives'],
    burgers: ['Extra Cheese', 'Bacon', 'Avocado', 'Pickles', 'Onion Rings'],
    desserts: ['Whipped Cream', 'Ice Cream', 'Chocolate Sauce', 'Berries'],
    drinks: ['Extra Shot', 'Whipped Cream', 'Vanilla Syrup', 'Caramel Syrup']
  };

  const currentAddOns = availableAddOns[product.category] || [];

  const unitPrice = product.price + 
    (selectedSize === 'large' ? 100 : selectedSize === 'small' ? -50 : 0) + 
    (selectedAddOns.length * 50);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center"
        >
          <FiShoppingBag className="mr-2" />
          <span>Added {quantity} {product.name} to cart!</span>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-orange-600 flex items-center">
                <FiChevronLeft className="mr-1" /> Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/menu" className="hover:text-orange-600">Menu</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 capitalize">{product.category}</li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-xl border border-orange-100">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                  isFavorite 
                    ? 'bg-red-100 text-red-500' 
                    : 'bg-white text-gray-600'
                }`}
              >
                <FiHeart className={isFavorite ? 'fill-current' : ''} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white text-gray-600 flex items-center justify-center shadow-md">
                <FiShare2 />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-gray-900 mb-2"
                >
                  {product.name}
                </motion.h1>
                <p className="text-xl text-gray-600 mb-6">{product.description}</p>
              </div>
              
              <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
                <FiStar className="text-orange-500 mr-1" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-gray-600 ml-1">({product.reviews})</span>
              </div>
            </div>

            <div className="text-4xl font-bold text-orange-600 mb-8">
              ₹{unitPrice.toFixed(0)}
              <span className="text-lg text-gray-500 ml-2 line-through">
                {unitPrice > product.price ? `₹${product.price.toFixed(0)}` : ''}
              </span>
            </div>

            {/* Customization Section */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-md border border-orange-50">
              {/* Size Selection */}
              {(product.category === 'pizza' || product.category === 'drinks') && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Size</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {['small', 'medium', 'large'].map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-3 rounded-xl border font-medium capitalize transition-all ${
                          selectedSize === size
                            ? 'border-orange-600 bg-orange-50 text-orange-600 shadow-inner'
                            : 'border-gray-300 text-gray-700 hover:border-orange-300'
                        }`}
                      >
                        {size}
                        <div className="text-sm mt-1 font-normal">
                          {size === 'small' && '(-₹50)'}
                          {size === 'large' && '(+₹100)'}
                          {size === 'medium' && ''}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {currentAddOns.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Add-ons (+₹50 each)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {currentAddOns.map((addOn) => (
                      <motion.div
                        key={addOn}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => toggleAddOn(addOn)}
                        className={`cursor-pointer p-3 rounded-lg border transition-all ${
                          selectedAddOns.includes(addOn)
                            ? 'border-orange-600 bg-orange-50 text-orange-600'
                            : 'border-gray-300 text-gray-700 hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded border mr-2 flex items-center justify-center ${
                            selectedAddOns.includes(addOn) 
                              ? 'bg-orange-600 border-orange-600' 
                              : 'bg-white border-gray-400'
                          }`}>
                            {selectedAddOns.includes(addOn) && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <span className="text-sm">{addOn}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quantity</h3>
                <div className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-700 font-medium"
                  >
                    <FiMinus />
                  </motion.button>
                  <span className="text-black font-medium w-12 text-center text-xl">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-700 font-medium"
                  >
                    <FiPlus />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Total Price Display */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-6 mb-8 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Total Price</h3>
                  <p className="text-2xl font-bold">₹{calculateTotalPrice().toFixed(0)}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center"
                >
                  <FiShoppingBag className="mr-2" /> Add to Cart
                </motion.button>
              </div>
            </div>

            {/* Product Info Tabs */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'description'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'ingredients'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600'
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'nutrition'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600'
                  }`}
                >
                  Nutrition
                </button>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'description' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-700"
                  >
                    <p className="mb-4">Indulge in our delicious {product.name}, crafted with premium ingredients and prepared fresh daily. Perfect for any occasion, this dish is sure to satisfy your cravings.</p>
                    <p>Our chefs follow traditional recipes with a modern twist, ensuring each bite is packed with flavor and quality. Enjoy the perfect balance of taste and texture in every serving.</p>
                  </motion.div>
                )}

                {activeTab === 'ingredients' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    {product.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                        <span className="text-gray-700">{ingredient}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'nutrition' && product.nutritionInfo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">Calories:</span>
                        <span className="font-medium text-gray-900">{product.nutritionInfo.calories}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">Protein:</span>
                        <span className="font-medium text-gray-900">{product.nutritionInfo.protein}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">Carbs:</span>
                        <span className="font-medium text-gray-900">{product.nutritionInfo.carbs}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">Fat:</span>
                        <span className="font-medium text-gray-900">{product.nutritionInfo.fat}</span>
                      </div>
                    </div>
                    
                    {product.allergens && product.allergens.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Allergens</h3>
                        <div className="flex flex-wrap gap-2">
                          {product.allergens.map((allergen, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full"
                            >
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(menuItems)
              .flat()
              .filter(item => item.category === product.category && item.id !== product.id)
              .slice(0, 3)
              .map((item) => (
                <Link key={item.id} href={`/menu/${item.id}`}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-orange-600">₹{item.price.toFixed(0)}</span>
                        <button className="text-orange-600 hover:text-orange-700">
                          <FiPlus className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}