'use client';

import { useState, useEffect, useCallback } from 'react';
import useCartStore from '../../../lib/store';
import { useRouter } from 'next/navigation';

// Initial menu items
const initialMenuItems = {
  pizza: [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella cheese, basil leaves",
      price: 250,
      image: "https://b.zmtcdn.com/data/pictures/chains/3/143/ce0341e58cf96f163101b4dff77ed938.jpg?fit=around|960:500&crop=960:500;*,*",
      category: "pizza",
      available: true,
      ingredients: ["Tomato sauce", "Mozzarella", "Fresh basil", "Olive oil"]
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Classic pepperoni with mozzarella cheese",
      price: 315,
      image: "https://static.toiimg.com/photo/51089680.cms",
      category: "pizza",
      available: true,
      ingredients: ["Tomato sauce", "Mozzarella", "Pepperoni"]
    },
    {
      id: 3,
      name: "Veggie Supreme",
      description: "Bell peppers, mushrooms, onions, olives",
      price: 199,
      image: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/26/d112a6d7-d173-4ca7-a5ee-40f845719d18_841144.JPG",
      category: "pizza",
      available: true,
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
      available: true,
      ingredients: ["Chicken patty", "Special sauce", "Lettuce", "Tomato", "Onion"]
    },
    {
      id: 5,
      name: "Chicken Deluxe",
      description: "Grilled chicken breast with avocado and bacon",
      price: 200,
      image: "https://s7d1.scene7.com/is/image/mcdonalds/DC_202012_0370_DeluxeCrispyChicken_PotatoBun_1564x1564-1:product-header-mobile?wid=1313&hei=1313&dpr=off",
      category: "burgers",
      available: true,
      ingredients: ["Chicken breast", "Avocado", "Bacon", "Lettuce", "Tomato"]
    },
    {
      id: 6,
      name: "Veggie Burger",
      description: "Plant-based patty with fresh vegetables",
      price: 149,
      image: "https://www.inspiredtaste.net/wp-content/uploads/2018/05/Homemade-Mushroom-Veggie-Burger-Recipe-1200.jpg",
      category: "burgers",
      available: true,
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
      available: true,
      ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter"]
    },
    {
      id: 8,
      name: "Cheesecake",
      description: "Creamy New York style cheesecake",
      price: 900,
      image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/baileysandchocolatec_72293_16x9.jpg",
      category: "desserts",
      available: true,
      ingredients: ["Cream cheese", "Graham crackers", "Sugar", "Vanilla"]
    },
    {
      id: 11,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with vanilla ice cream",
      price: 450,
      image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/easy_chocolate_cake_31070_16x9.jpg",
      category: "desserts",
      available: true,
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
      available: true,
      ingredients: ["Fresh oranges"]
    },
    {
      id: 10,
      name: "Iced Coffee",
      description: "Cold brew coffee with ice",
      price: 269,
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2025/05/how-to-make-iced-coffee-at-home.jpg",
      category: "drinks",
      available: true,
      ingredients: ["Coffee beans", "Ice", "Milk"]
    }
  ]
};

export default function AdminDashboard() {
  const { adminMode, toggleAdminMode } = useCartStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'pizza',
    ingredients: '',
    image: ''
  });

  // Filter orders based on status and search
  const filteredOrders = useCallback(() => {
    return orders.filter(order => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesSearch = 
        order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toString().includes(searchQuery) ||
        order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchQuery]);

  // Load data from localStorage
  useEffect(() => {
    const isAdmin = localStorage.getItem('zesty-bite-admin');
    if (!isAdmin) {
      router.push('/admin/login');
      return;
    }
    
    setIsAuthenticated(true);
    loadData();
    
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [router]);

  const loadData = () => {
    try {
      setLoading(true);
      
      // Load orders
      const savedOrders = JSON.parse(localStorage.getItem('zesty-bite-orders') || '[]');
      setOrders(savedOrders.reverse());
      
      // Load menu items
      const savedMenu = JSON.parse(localStorage.getItem('zesty-bite-menu') || '{}');
      if (Object.keys(savedMenu).length > 0) {
        setMenuItems(savedMenu);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('zesty-bite-admin');
    router.push('/admin/login');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('zesty-bite-orders') || '[]');
      const updatedOrders = savedOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      localStorage.setItem('zesty-bite-orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders.reverse());
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const toggleItemAvailability = (category, itemId) => {
    const updatedItems = {
      ...menuItems,
      [category]: menuItems[category].map(item => 
        item.id === itemId ? { ...item, available: !item.available } : item
      )
    };
    
    setMenuItems(updatedItems);
    localStorage.setItem('zesty-bite-menu', JSON.stringify(updatedItems));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      name: newItem.name,
      description: newItem.description,
      price: parseFloat(newItem.price),
      category: newItem.category,
      available: true,
      ingredients: newItem.ingredients.split(',').map(ing => ing.trim()),
      image: newItem.image || 'https://via.placeholder.com/300'
    };

    const updatedItems = {
      ...menuItems,
      [newItem.category]: [...menuItems[newItem.category], item]
    };
    
    setMenuItems(updatedItems);
    localStorage.setItem('zesty-bite-menu', JSON.stringify(updatedItems));
    
    setNewItem({
      name: '',
      description: '',
      price: '',
      category: 'pizza',
      ingredients: '',
      image: ''
    });
    setShowAddItemForm(false);
  };

  const confirmDeleteItem = (category, itemId) => {
    setItemToDelete({ category, itemId });
  };

  const deleteItem = () => {
    if (itemToDelete) {
      const { category, itemId } = itemToDelete;
      const updatedItems = {
        ...menuItems,
        [category]: menuItems[category].filter(item => item.id !== itemId)
      };
      
      setMenuItems(updatedItems);
      localStorage.setItem('zesty-bite-menu', JSON.stringify(updatedItems));
      setItemToDelete(null);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-black">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage orders and menu items</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              className={`px-4 py-2 rounded-md font-medium text-sm ${
                activeTab === 'orders'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
            <button
              className={`px-4 py-2 rounded-md font-medium text-sm ${
                activeTab === 'menu'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab('menu')}
            >
              Menu
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-red-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Admin Mode Indicator */}
        {adminMode && (
          <div className="mb-6 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-center">
            <div className="bg-orange-100 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-orange-800">
              Admin Mode enabled - Full access to all features
            </p>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Order Management</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredOrders().length} {filteredOrders().length === 1 ? 'order' : 'orders'} found
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="relative flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
            
            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-black">Loading orders...</p>
              </div>
            ) : filteredOrders().length === 0 ? (
              <div className="p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
                <p className="text-gray-500">Try changing your search or filter criteria</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders().map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(order.id).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{order.customerInfo.name}</div>
                          <div className="text-sm text-gray-500">{order.customerInfo.phone}</div>
                          <div className="text-sm text-gray-500">{order.customerInfo.address}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {order.items.slice(0, 2).map(item => (
                              <div key={item.id} className="flex items-center mb-1">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-2" />
                                <span>{item.name} × {item.quantity}</span>
                              </div>
                            ))}
                            {order.items.length > 2 && (
                              <div className="text-xs text-gray-500 mt-1">
                                +{order.items.length - 2} more items
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(order.totalPrice)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="text-sm border text-black border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <div>
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Menu Management</h2>
                <p className="text-sm text-gray-500">Manage your restaurant's menu items</p>
              </div>
              
              {adminMode ? (
                <button
                  onClick={() => setShowAddItemForm(true)}
                  className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add New Item
                </button>
              ) : (
                <div className="text-sm text-gray-500 bg-yellow-50 px-4 py-2 rounded-lg">
                  Enable Admin Mode to manage menu items
                </div>
              )}
            </div>

            {/* Add Item Form */}
            {showAddItemForm && adminMode && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Add New Menu Item</h3>
                  <button 
                    onClick={() => setShowAddItemForm(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
                    <input
                      type="text"
                      required
                      value={newItem.name}
                      onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Margherita Pizza"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newItem.price}
                      onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="250"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="pizza">Pizza</option>
                      <option value="burgers">Burgers</option>
                      <option value="desserts">Desserts</option>
                      <option value="drinks">Drinks</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="text"
                      value={newItem.image}
                      onChange={(e) => setNewItem(prev => ({ ...prev, image: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients *</label>
                    <input
                      type="text"
                      required
                      value={newItem.ingredients}
                      onChange={(e) => setNewItem(prev => ({ ...prev, ingredients: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Tomato sauce, Mozzarella, Fresh basil..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate ingredients with commas</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      required
                      value={newItem.description}
                      onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      rows={3}
                      placeholder="Fresh tomatoes, mozzarella cheese, basil leaves..."
                    />
                  </div>
                  
                  <div className="md:col-span-2 flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-orange-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-700 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Menu Item
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddItemForm(false)}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Menu Items */}
            <div className="space-y-8">
              {Object.entries(menuItems).map(([category, items]) => (
                <div key={category} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {category} ({items.length} items)
                    </h3>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      {items.filter(item => item.available).length} available
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-lg">
                          <div className="relative">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-48 object-cover"
                              onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
                            />
                            {!item.available && (
                              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">Out of Stock</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 text-lg">{item.name}</h4>
                              <span className="text-lg font-bold text-orange-600">{formatCurrency(item.price)}</span>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                            
                            <div className="mb-4">
                              <p className="text-xs text-gray-500 mb-1">Ingredients:</p>
                              <div className="flex flex-wrap gap-1">
                                {item.ingredients.slice(0, 3).map((ing, idx) => (
                                  <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                    {ing}
                                  </span>
                                ))}
                                {item.ingredients.length > 3 && (
                                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                    +{item.ingredients.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              {adminMode ? (
                                <>
                                  <button
                                    onClick={() => toggleItemAvailability(category, item.id)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      item.available
                                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                                    }`}
                                  >
                                    {item.available ? 'Available' : 'Out of Stock'}
                                  </button>
                                  
                                  <button
                                    onClick={() => confirmDeleteItem(category, item.id)}
                                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                  </button>
                                </>
                              ) : (
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  item.available
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {item.available ? 'Available' : 'Out of Stock'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this menu item? This action cannot be undone.</p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={deleteItem}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}