
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Assistant from './components/Assistant';
import ProductDetailModal from './components/ProductDetailModal';
import LoginModal from './components/LoginModal';
import SellProductModal from './components/SellProductModal';
import { Product, CartItem, User } from './types';
import { PRODUCTS, CATEGORIES } from './constants';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  
  // Auth state
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('shop_orbit_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('shop_orbit_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('shop_orbit_user');
    }
  }, [user]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  const addToCart = (product: Product) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

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

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
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

  const scrollToProducts = () => {
    const element = document.getElementById('product-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        onLogout={() => setUser(null)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenSell={() => setIsSellModalOpen(true)}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all shadow-sm font-bold uppercase tracking-tighter text-xs ${
                selectedCategory === cat 
                ? 'bg-[#ee4d2d] text-white shadow-md scale-105' 
                : 'bg-white/80 backdrop-blur-md text-gray-600 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Banner Simulation - Tech Focused */}
        <div className="w-full h-48 md:h-72 rounded-2xl overflow-hidden mb-12 relative group shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1400" 
            alt="Promotion" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-all group-hover:backdrop-blur-none"></div>
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
            <div className="bg-[#ee4d2d] text-white text-[10px] font-black px-2 py-1 w-fit mb-4 uppercase tracking-[0.2em]">Enterprise Grade</div>
            <h2 className="text-white text-3xl md:text-6xl font-black mb-2 leading-none uppercase tracking-tighter drop-shadow-lg">
              Next-Gen <br/><span className="text-[#ee4d2d]">ICT Infrastructure</span>
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-medium max-w-lg drop-shadow-md">Professional hardware and software solutions for the global digital economy.</p>
            <button 
              onClick={scrollToProducts}
              className="mt-6 bg-white text-slate-950 px-8 py-3 rounded-lg font-black uppercase text-sm tracking-widest w-fit hover:bg-[#ee4d2d] hover:text-white transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              Provision Now
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div id="product-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-mt-24">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={() => addToCart(product)} 
              onSelect={() => setSelectedProduct(product)}
            />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center text-white drop-shadow-md">
              <p className="text-2xl font-black uppercase tracking-tighter">System Offline: No assets found matching your query.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={() => selectedProduct && addToCart(selectedProduct)} 
      />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={(u) => setUser(u)}
      />

      <SellProductModal 
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onAddProduct={addProduct}
        user={user}
      />

      {/* Drawer */}
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
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#ee4d2d] text-white px-8 py-4 rounded-xl shadow-2xl z-50 animate-bounce font-black uppercase text-sm tracking-widest border-4 border-white">
          Deployment Successful! Assets Provisioned.
        </div>
      )}

      <footer className="bg-slate-950 text-white py-16 border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white text-slate-950 rounded flex items-center justify-center font-black">S</div>
              <h3 className="font-black text-2xl tracking-tighter uppercase">ShopOrbit</h3>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">The premier decentralized marketplace for enterprise ICT assets, networking infrastructure, and cloud licensing.</p>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-6 text-[#ee4d2d]">Marketplace</h4>
            <ul className="text-sm text-slate-400 space-y-3 font-bold uppercase tracking-tight">
              <li className="cursor-pointer hover:text-white transition-colors">Asset Liquidation</li>
              <li className="cursor-pointer hover:text-white transition-colors">Enterprise Center</li>
              <li className="cursor-pointer hover:text-white transition-colors">ICT Standards</li>
              <li className="cursor-pointer hover:text-white transition-colors">Privacy Protocols</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-6 text-[#ee4d2d]">Payment Protocol</h4>
            <div className="flex gap-4 flex-wrap items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
              <div className="text-[10px] font-black border border-slate-700 px-2 py-1 rounded">SSL SECURE</div>
              <div className="text-[10px] font-black border border-slate-700 px-2 py-1 rounded">256-BIT AES</div>
            </div>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-6 text-[#ee4d2d]">Data Stream</h4>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all group">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase">Latency</span>
                <span className="text-xs font-bold text-green-500">12ms (OPTIMAL)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">
            © 2026 GLOBAL ICT MARKET PROTOCOL // SHOPORBIT v4.2 // ALL PACKETS ENCRYPTED
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
