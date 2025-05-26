import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, removeFromCart, cart } = useCart();
  
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    removeFromCart(product.id);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 group"
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.organic && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Organic
          </span>
        )}
        
        {product.sale && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Sale
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-gray-800">{product.name}</h3>
        {product.brand && (
          <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
        )}
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            {product.sale ? (
              <>
                <span className="text-lg font-bold text-gray-800">${product.salePrice?.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {quantity > 0 ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDecrement}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-1 rounded-full transition-colors duration-300"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-medium w-6 text-center">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="bg-green-600 hover:bg-green-700 text-white p-1 rounded-full transition-colors duration-300"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleIncrement}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors duration-300 flex items-center space-x-1"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;