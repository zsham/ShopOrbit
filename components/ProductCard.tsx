
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { getProductInsight } from '../services/geminiService';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onSelect: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onSelect }) => {
  const [insight, setInsight] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsight = async () => {
      const text = await getProductInsight(product.name);
      setInsight(text);
    };
    
    if (parseInt(product.id) <= 4 && !product.seller) {
      fetchInsight();
    }
  }, [product.name, product.id, product.seller]);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all group overflow-hidden border border-transparent hover:border-[#ee4d2d]/30 flex flex-col">
      <div 
        className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer"
        onClick={onSelect}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300">
            View Details
          </span>
        </div>
        
        {/* Stock Badge */}
        {product.stock < 10 && (
          <div className="absolute top-2 left-2">
            <span className="bg-[#ee4d2d] text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">
              LOW STOCK
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2 cursor-pointer" onClick={onSelect}>
          <span className="text-[10px] font-bold text-[#ee4d2d] uppercase tracking-wider">{product.category}</span>
          <h3 className="text-sm font-medium line-clamp-2 h-10 group-hover:text-[#ee4d2d] transition-colors">{product.name}</h3>
        </div>

        {insight && (
          <div className="mb-3 p-2 bg-orange-50 rounded-md border border-orange-100 italic text-[11px] text-orange-700">
            ✨ {insight}
          </div>
        )}

        {product.seller && (
          <div className="mb-2 flex items-center gap-1 text-[10px] text-gray-400 italic">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-indigo-500">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4.13-5.69Z" clipRule="evenodd" />
            </svg>
            Seller: {product.seller}
          </div>
        )}

        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-200'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-400 text-[10px]">({product.rating})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <span className="text-lg font-bold text-[#ee4d2d]">${product.price.toFixed(2)}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="bg-[#ee4d2d] text-white p-2 rounded-lg hover:bg-[#d73211] active:scale-95 transition-all shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
