
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Lumix Professional Camera',
    price: 1299.99,
    image: 'https://picsum.photos/seed/camera/600/600',
    category: 'Electronics',
    description: 'Capture stunning visuals with advanced mirrorless technology.',
    rating: 4.8,
    stock: 15
  },
  {
    id: '2',
    name: 'Premium Leather Boots',
    price: 189.50,
    image: 'https://picsum.photos/seed/boots/600/600',
    category: 'Fashion',
    description: 'Durable and stylish boots handcrafted from top-grain leather.',
    rating: 4.5,
    stock: 24
  },
  {
    id: '3',
    name: 'Smart Noise-Cancelling Headphones',
    price: 349.00,
    image: 'https://picsum.photos/seed/headphones/600/600',
    category: 'Audio',
    description: 'Immersive sound quality with active noise cancellation technology.',
    rating: 4.9,
    stock: 42
  },
  {
    id: '4',
    name: 'Mechanical Gaming Keyboard',
    price: 120.00,
    image: 'https://picsum.photos/seed/keyboard/600/600',
    category: 'Electronics',
    description: 'RGB mechanical keyboard with tactile blue switches.',
    rating: 4.7,
    stock: 12
  },
  {
    id: '5',
    name: 'Minimalist Wall Clock',
    price: 45.99,
    image: 'https://picsum.photos/seed/clock/600/600',
    category: 'Home',
    description: 'Sleek design that fits perfectly in any modern living room.',
    rating: 4.2,
    stock: 55
  },
  {
    id: '6',
    name: 'Hydration Sports Bottle',
    price: 24.95,
    image: 'https://picsum.photos/seed/bottle/600/600',
    category: 'Sports',
    description: 'Insulated stainless steel bottle that keeps drinks cold for 24 hours.',
    rating: 4.6,
    stock: 100
  },
  {
    id: '7',
    name: 'Ergonomic Office Chair',
    price: 450.00,
    image: 'https://picsum.photos/seed/chair/600/600',
    category: 'Furniture',
    description: 'Premium support for long working hours with adjustable lumbar support.',
    rating: 4.8,
    stock: 8
  },
  {
    id: '8',
    name: 'Gourmet Coffee Beans',
    price: 18.00,
    image: 'https://picsum.photos/seed/coffee/600/600',
    category: 'Food',
    description: 'Ethically sourced medium roast with notes of chocolate and citrus.',
    rating: 4.9,
    stock: 200
  }
];

export const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Audio', 'Home', 'Sports', 'Furniture', 'Food'];
