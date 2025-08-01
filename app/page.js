"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartAnimation, setCartAnimation] = useState(false);
  const prevCartCount = useRef(0);
  
  const categories = [
    { name: "Pizza", emoji: "🍕", href: "/menu?category=pizza" },
    { name: "Burgers", emoji: "🍔", href: "/menu?category=burgers" },
    { name: "Desserts", emoji: "🍰", href: "/menu?category=desserts" },
    { name: "Drinks", emoji: "🥤", href: "/menu?category=drinks" },
  ];

  const popularDishes = [
    { 
      id: 1, 
      name: "Margherita Pizza", 
      price: "₹250", 
      description: "Classic pizza with fresh mozzarella and basil",
      image: "https://b.zmtcdn.com/data/pictures/chains/3/143/ce0341e58cf96f163101b4dff77ed938.jpg?fit=around|960:500&crop=960:500;*,*"
    },
    { 
      id: 2, 
      name: "Gourmet Burger", 
      price: "₹299", 
      description: "Grilled chicken with special sauce and crispy fries",
      image: "https://b.zmtcdn.com/data/pictures/chains/9/20929619/c3f54cba35a8c043a2086910bef57af4.jpeg?fit=around|960:500&crop=960:500;*,*"
    },
    { 
      id: 3, 
      name: "Chocolate Lava Cake", 
      price: "₹450", 
      description: "Warm chocolate cake with vanilla ice cream",
      image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/easy_chocolate_cake_31070_16x9.jpg"
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to add items to cart with animation
  const addToCart = () => {
    setCartCount(prevCount => prevCount + 1);
    setCartAnimation(true);
    
    // Reset animation after it completes
    setTimeout(() => setCartAnimation(false), 500);
  };

  // Animate cart count when it changes
  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setCartAnimation(true);
      setTimeout(() => setCartAnimation(false), 500);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Delicious Food
            <span className="block text-orange-600 mt-3 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Delivered Fast
            </span>
          </h1>
          
          <p className={`text-xl text-gray-600 mb-10 max-w-2xl mx-auto transition-all duration-700 delay-150 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Order your favorite meals from the comfort of your home. Fresh ingredients, amazing taste, lightning-fast delivery.
          </p>
          
          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="transition-transform hover:scale-105 active:scale-95">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl min-w-[180px]"
              >
                Order Now
                <span className="ml-2 animate-pulse">→</span>
              </Link>
            </div>
            
            <div className="transition-transform hover:scale-105 active:scale-95">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-50 transition-colors min-w-[180px]"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r from-orange-500 to-orange-600">
            Browse Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
              >
                <Link
                  href={category.href}
                  className="group bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-orange-100 flex flex-col items-center transform hover:-translate-y-1"
                >
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.emoji}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r from-orange-500 to-orange-600">
            Customer Favorites
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDishes.map((dish) => (
              <Link 
                key={dish.id}
                href={`/menu/${dish.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 block focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <div className="relative h-48 bg-gradient-to-r from-orange-200 to-orange-300">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{dish.name}</h3>
                    <span className="text-orange-600 font-bold text-lg">{dish.price}</span>
                  </div>
                  <p className="text-gray-600 mb-0">{dish.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border border-orange-50 transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-orange-100 to-orange-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast Delivery</h3>
              <p className="text-gray-600">Get your food delivered in 30 minutes or less</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border border-orange-50 transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-orange-100 to-orange-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🥗</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fresh Ingredients</h3>
              <p className="text-gray-600">We use only the freshest, highest quality ingredients</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border border-orange-50 transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-orange-100 to-orange-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Payment</h3>
              <p className="text-gray-600">Multiple payment options for your convenience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r from-orange-500 to-orange-600">
            What Our Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-md transform hover:scale-[1.02] transition-transform">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-200 to-orange-300 flex items-center justify-center text-xl">👤</div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">John D.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"The pizza was absolutely delicious! Arrived hot and fresh in just 25 minutes. Will definitely order again!"</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md transform hover:scale-[1.02] transition-transform">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-200 to-orange-300 flex items-center justify-center text-xl">👩</div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Sarah M.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"Best burgers in town! The gourmet burger is my favorite. The fries are always crispy too."</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md transform hover:scale-[1.02] transition-transform">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-200 to-orange-300 flex items-center justify-center text-xl">👨</div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Mike T.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"The chocolate lava cake is to die for! Perfect balance of sweetness and richness. A must-try!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

      
      
      {/* Floating Cart Button */}
        <Link href="/cart" className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          {cartCount > 0 && (
            <span className={`absolute top-0 right-0 bg-white text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md transform transition-all ${cartAnimation ? 'scale-125 animate-ping' : 'scale-100'}`}>
              {cartCount}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}