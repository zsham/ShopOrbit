
import React, { useState, useRef } from 'react';
import { Product, User } from '../types';
import { CATEGORIES } from '../constants';

interface SellProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  user: User | null;
}

const SellProductModal: React.FC<SellProductModalProps> = ({ isOpen, onClose, onAddProduct, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Computing',
    description: 'testing',
    image: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      image: formData.image || `https://picsum.photos/seed/${formData.name}/600/600`,
      rating: 5.0,
      stock: 1,
      seller: user.username
    };

    onAddProduct(newProduct);
    setFormData({ name: '', price: '', category: 'Computing', description: 'testing', image: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scale-up relative">
        <div className="bg-slate-900 p-6 text-white border-b-4 border-[#ee4d2d]">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#ee4d2d]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
            List ICT Asset
          </h2>
          <p className="text-white/60 text-sm mt-1 uppercase tracking-tighter font-bold">Authorized ICT Marketplace Entry</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">ICT Product Name</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-[#ee4d2d]/20 transition-all font-medium"
              placeholder="e.g. Cisco Catalyst 9200, MacBook Pro M3..."
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Unit Price ($)</label>
              <input 
                required
                type="number" 
                step="0.01"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-[#ee4d2d]/20 transition-all font-bold"
                placeholder="0.00"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">ICT Category</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-[#ee4d2d]/20 transition-all font-bold text-slate-700"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Technical Specs / Description</label>
            <textarea 
              required
              rows={3}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-[#ee4d2d]/20 transition-all text-sm"
              placeholder="Provide technical specifications..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Hardware/Software Proof Photo</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-[#ee4d2d]/40 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden group"
            >
              {formData.image ? (
                <div className="relative w-full h-full">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Replace Asset Image</span>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-300 mx-auto mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                  </svg>
                  <p className="text-sm font-bold text-slate-500">Upload Component Image</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase">Click to browse filesystem</p>
                </div>
              )}
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Abort
            </button>
            <button 
              type="submit"
              className="flex-[2] bg-slate-950 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-xl active:scale-95 border-b-2 border-[#ee4d2d]"
            >
              Execute Listing
            </button>
          </div>
        </form>

        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SellProductModal;
