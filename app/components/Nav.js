'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import useCartStore from '../../lib/store';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, adminMode, toggleAdminMode } = useCartStore((state) => ({ totalItems: state.totalItems, adminMode: state.adminMode, toggleAdminMode: state.toggleAdminMode }));
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const [cartAnimation, setCartAnimation] = useState(false);
  const [prevItems, setPrevItems] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (totalItems > prevItems) {
      setCartAnimation(true);
      const timer = setTimeout(() => setCartAnimation(false), 300);
      return () => clearTimeout(timer);
    }
    setPrevItems(totalItems);
  }, [totalItems, prevItems]);

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-orange-600 flex items-center">
              <span className="mr-2">🍽️</span> ZestyBite
            </h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors after:content-[''] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-orange-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
                Home
              </Link>
              <Link href="/menu" className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors after:content-[''] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-orange-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
                Menu
              </Link>
              <Link href="/cart" className="relative flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors after:content-[''] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-orange-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
                Cart
                {isClient && (
                  <span className={`ml-1 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold transition-all duration-300 ${cartAnimation ? 'animate-ping scale-125' : ''}`}>
                    {totalItems}
                  </span>
                )}
              </Link>
              {isAdminPage ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Admin Mode</span>
                    <button
                      onClick={toggleAdminMode}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${adminMode ? 'bg-orange-600' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${adminMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    View Site
                  </Link>
                </div>
              ) : (
                <Link href="/admin/login" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg">
                  Admin
                </Link>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/menu" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                href="/cart" 
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
                {isClient && (
                  <span className={`ml-2 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold transition-all duration-300 ${cartAnimation ? 'animate-ping scale-125' : ''}`}>
                    {totalItems}
                  </span>
                )}
              </Link>
              {adminMode ? (
                <Link 
                  href="/admin/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <Link 
                  href="/admin/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}