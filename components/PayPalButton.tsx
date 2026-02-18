
import React, { useState } from 'react';

interface PayPalButtonProps {
  amount: number;
  onSuccess: () => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing time
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="w-full space-y-4">
      <button 
        onClick={handleSimulatePayment}
        disabled={isProcessing}
        className="w-full bg-[#ffc439] hover:bg-[#f4bb33] rounded-md py-3 px-4 flex items-center justify-center transition-all relative overflow-hidden disabled:opacity-75 shadow-md"
      >
        {isProcessing ? (
          <div className="flex items-center gap-3 text-[#003087] font-bold">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </div>
        ) : (
          <div className="flex items-center gap-2">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
             <span className="text-[#003087] font-bold text-lg italic">Pay with PayPal</span>
          </div>
        )}
      </button>
      
      <div className="text-center">
        <span className="text-xs text-gray-400">Transaction ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
      </div>
    </div>
  );
};

export default PayPalButton;
