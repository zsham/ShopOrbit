
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Assistant from './components/Assistant';
import { Product, CartItem } from './types';
import { PRODUCTS, CATEGORIES } from './constants';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
    setShowOrderSuccess(true);
    setTimeout(() => setShowOrderSuccess(false), 5000);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all shadow-sm ${
                selectedCategory === cat 
                ? 'bg-[#ee4d2d] text-white shadow-md scale-105' 
                : 'bg-white/80 backdrop-blur-md text-gray-600 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Banner Simulation */}
        <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-12 relative group shadow-2xl">
          <img 
            src="https://picsum.photos/seed/shopping/1200/400" 
            alt="Promotion" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-8 md:p-12">
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-2">Summer Megasale</h2>
            <p className="text-white/90 text-lg md:text-xl">Up to 70% off selected items</p>
            <button className="mt-4 bg-[#ee4d2d] text-white px-8 py-3 rounded-lg font-bold w-fit hover:bg-[#d73211] transition-colors shadow-lg">
              Shop Now
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={() => addToCart(product)} 
            />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center text-white drop-shadow-md">
              <p className="text-2xl font-semibold">No products found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={cartTotal}
        onCheckout={clearCart}
      />

      {/* AI Assistant */}
      <Assistant />

      {/* Success Notification */}
      {showOrderSuccess && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-4 rounded-xl shadow-2xl z-50 animate-bounce">
          Order placed successfully! Thank you for shopping.
        </div>
      )}

      <footer className="bg-white/90 backdrop-blur-md border-t py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4 text-[#ee4d2d]">PabloShop</h3>
            <p className="text-gray-500 text-sm">Experience the future of e-commerce with AI-integrated shopping assistants and seamless payments.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Customer Care</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>Help Centre</li>
              <li>Shopee Cares</li>
              <li>How To Buy</li>
              <li>Shipping & Delivery</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Payment Methods</h4>
            <div className="flex gap-2 flex-wrap">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:text-[#ee4d2d] cursor-pointer shadow-sm">FB</div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:text-[#ee4d2d] cursor-pointer shadow-sm">IG</div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:text-[#ee4d2d] cursor-pointer shadow-sm">TW</div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-xs text-gray-400">
          © 2026 PabloShop. All Rights Reserved. For Testing Only
        </div>
      </footer>
    </div>
  );
};

export default App;
