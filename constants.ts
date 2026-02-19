
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'ict-1',
    name: 'Custom High-End Workstation PC',
    price: 3200.00,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=800',
    category: 'Computing',
    description: 'Ryzen 9 7950X, RTX 4090, 64GB DDR5. Perfect for AI development and 8K video editing.',
    rating: 4.9,
    stock: 2
  },
  {
    id: 'ict-2',
    name: 'Enterprise Mesh WiFi 6E Router',
    price: 499.00,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    category: 'Networking',
    description: 'Tri-band gigabit router with ultra-low latency and support for up to 200 concurrent devices.',
    rating: 4.7,
    stock: 12
  },
  {
    id: 'ict-3',
    name: 'Mechanical Programmer Keyboard',
    price: 159.00,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800',
    category: 'Peripherals',
    description: 'Hot-swappable switches with a minimalist 75% layout. Optimized for long coding sessions.',
    rating: 4.8,
    stock: 25
  },
  {
    id: 'ict-4',
    name: 'Pro Cloud Hosting Annual License',
    price: 240.00,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    category: 'Software',
    description: '12-month enterprise cloud license including automated backups and 24/7 technical support.',
    rating: 4.6,
    stock: 100
  },
  {
    id: 'ict-5',
    name: 'Ultra-Wide 49" Developer Monitor',
    price: 1100.00,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    category: 'Computing',
    description: 'Double QHD resolution with 144Hz refresh rate. The ultimate productivity screen for multi-tasking.',
    rating: 4.9,
    stock: 5
  },
  {
    id: 'ict-6',
    name: 'Smart Server Monitoring Hub',
    price: 350.00,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
    category: 'Networking',
    description: 'Real-time hardware telemetry dashboard for data centers and home labs.',
    rating: 4.5,
    stock: 8
  }
];

export const CATEGORIES = ['All', 'Computing', 'Networking', 'Software', 'Peripherals', 'Smartphones', 'Hardware'];
