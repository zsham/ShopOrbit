
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, searchQuery, setSearchQuery }) => {
  return (
    <nav className="bg-slate-950 text-white sticky top-0 z-40 shadow-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-white text-slate-950 rounded-lg flex items-center justify-center font-black text-xl shadow-inner">P</div>
          <span className="text-2xl font-bold tracking-tight text-white">PabloShop</span>
        </div>

        {/* Search Bar */}
        <div className="flex-grow w-full md:max-w-2xl relative">
          <input 
            type="text" 
            placeholder="Search for items, brands, and categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 rounded-md text-gray-100 bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-slate-500 placeholder-white/40 transition-all"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-800 px-6 py-2 rounded shadow hover:bg-slate-700 transition-colors border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <button onClick={onOpenCart} className="relative group p-2 hover:bg-white/5 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0 -right-0 bg-slate-100 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-slate-950">
                {cartCount}
              </span>
            )}
          </button>
          
          <div className="hidden lg:flex items-center gap-2 group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-slate-700 rounded-full border border-white/20 overflow-hidden">
              <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" />
            </div>
            <span className="font-medium text-sm">Account</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
