
import React, { useState } from 'react';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password || (isRegister && !formData.email)) {
      setError('Please fill in all fields.');
      return;
    }

    // Simulate authentication
    const user: User = {
      username: formData.username,
      email: formData.email || `${formData.username}@example.com`
    };
    
    onLogin(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-up">
        <div className="bg-slate-950 p-6 text-white text-center">
          <h2 className="text-2xl font-bold">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-white/60 text-sm mt-1">Please enter your details to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded border border-red-100">{error}</p>}
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Username</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-slate-200 transition-all"
              placeholder="e.g. pablo_fan"
              value={formData.username}
              onChange={e => setFormData({...formData, username: e.target.value})}
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-slate-200 transition-all"
                placeholder="pablo@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-slate-200 transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-950 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>

          <div className="text-center mt-6">
            <button 
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
          </div>
        </form>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
