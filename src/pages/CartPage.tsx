import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 mt-8">
        <div className="max-w-3xl mx-auto text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:grid md:grid-cols-5 bg-gray-50 p-4 text-gray-600 text-sm font-medium">
              <div className="col-span-2">Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>
            
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 p-4 md:grid md:grid-cols-5 md:items-center"
                >
                  <div className="md:col-span-2 flex items-center mb-4 md:mb-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                      {item.organic && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Organic
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-2 md:mb-0">
                    <span className="md:hidden text-gray-600 mr-2">Price:</span>
                    <span className="font-medium">
                      ${(item.sale ? (item.salePrice || 0) : item.price).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-2 md:mb-0">
                    <span className="md:hidden text-gray-600 mr-2">Quantity:</span>
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 py-1 border-x">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-start">
                    <div>
                      <span className="md:hidden text-gray-600 mr-2">Total:</span>
                      <span className="font-medium">
                        ${((item.sale ? (item.salePrice || 0) : item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div className="p-4 border-t border-gray-200 flex justify-between">
              <Link
                to="/products"
                className="text-green-600 hover:text-green-700 flex items-center"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Shopping
              </Link>
              
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 flex items-center"
              >
                <Trash2 className="mr-2 h-5 w-5" />
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-200">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(totalPrice * 0.07).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between py-4 border-t border-b border-gray-200 mb-6">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-bold">${(totalPrice + (totalPrice * 0.07)).toFixed(2)}</span>
            </div>
            
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium transition-colors duration-300">
              Proceed to Checkout
            </button>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Free shipping on all orders over $50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;