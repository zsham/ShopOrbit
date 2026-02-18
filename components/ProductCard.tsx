
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { getProductInsight } from '../services/geminiService';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    // Generate an AI insight for featured products on mount
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const text = await getProductInsight(product.name);
      setInsight(text);
      setLoadingInsight(false);
    };
    
    // Only fetch insight for certain products to save tokens
    if (parseInt(product.id) <= 4) {
      fetchInsight();
    }
  }, [product.name, product.id]);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all group overflow-hidden border border-transparent hover:border-[#ee4d2d]/30">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.stock < 10 && (
          <span className="absolute top-2 left-2 bg-[#ee4d2d] text-white text-[10px] font-bold px-2 py-1 rounded">
            ONLY {product.stock} LEFT
          </span>
        )}
      </div>
      
      <div className="p-4 flex flex-col h-full">
        <div className="mb-2">
          <span className="text-[10px] font-bold text-[#ee4d2d] uppercase tracking-wider">{product.category}</span>
          <h3 className="text-sm font-medium line-clamp-2 h-10 group-hover:text-[#ee4d2d] transition-colors">{product.name}</h3>
        </div>

        {insight && (
          <div className="mb-3 p-2 bg-orange-50 rounded-md border border-orange-100 italic text-[11px] text-orange-700">
            ✨ {insight}
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
          <span className="text-gray-400 text-[10px]">(120+ sold)</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <span className="text-lg font-bold text-[#ee4d2d]">${product.price.toFixed(2)}</span>
          <button 
            onClick={onAddToCart}
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
