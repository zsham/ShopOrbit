
import React, { useState } from 'react';
import { CartItem } from '../types';
import PayPalButton from './PayPalButton';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  total: number;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity, 
  total,
  onCheckout 
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity" 
        onClick={onClose}
      />
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl flex flex-col animate-slide-in">
        <div className="p-6 border-b flex items-center justify-between bg-[#ee4d2d] text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            Your Troli ({items.length})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <p className="text-lg">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="text-[#ee4d2d] font-bold border-2 border-[#ee4d2d] px-6 py-2 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Go Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 border">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-semibold text-gray-800 leading-tight">{item.name}</h3>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[#ee4d2d] font-bold text-sm mb-2">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 bg-gray-50 hover:bg-gray-100 border-r"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 bg-gray-50 hover:bg-gray-100 border-l"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-2xl font-bold text-[#ee4d2d]">${total.toFixed(2)}</span>
            </div>
            
            {isCheckingOut ? (
              <div className="space-y-4">
                <PayPalButton amount={total} onSuccess={onCheckout} />
                <button 
                  onClick={() => setIsCheckingOut(false)}
                  className="w-full py-2 text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Back to trolley
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-[#ee4d2d] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#d73211] transition-all shadow-lg active:scale-95"
              >
                Checkout Now
              </button>
            )}
            
            <p className="mt-4 text-[10px] text-gray-400 text-center">
              Secure payment processed by PayPal. Terms & conditions apply.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default CartDrawer;
