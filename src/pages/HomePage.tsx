import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, ThumbsUp, Clock } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import CategoryCard from '../components/categories/CategoryCard';
import { getFeaturedProducts } from '../data/products';
import { categories } from '../data/products';

const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-green-800 to-green-600 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Fresh fruits and vegetables" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Fresh Groceries Delivered to Your Doorstep
            </h1>
            <p className="text-white text-xl mb-8">
              Experience the freshest produce, pantry essentials, and more - all delivered with care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-300 flex items-center justify-center"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
              </Link>
              <Link
                to="/contact"
                className="bg-white hover:bg-gray-100 text-green-800 px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-300 flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Truck className="h-10 w-10 text-green-500" />}
              title="Free Delivery"
              description="Free delivery on all orders over $50"
            />
            <FeatureCard 
              icon={<Clock className="h-10 w-10 text-green-500" />}
              title="Quick Pickup"
              description="In-store pickup available within 2 hours"
            />
            <FeatureCard 
              icon={<ThumbsUp className="h-10 w-10 text-green-500" />}
              title="Fresh Guarantee"
              description="100% satisfaction or your money back"
            />
            <FeatureCard 
              icon={<ShoppingBag className="h-10 w-10 text-green-500" />}
              title="Weekly Deals"
              description="New deals and discounts every week"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Shop by Category"
            subtitle="Browse our wide selection of fresh products"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Featured Products"
            subtitle="Handpicked seasonal favorites just for you"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-semibold transition-colors duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Newsletter</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to receive updates on new products, special offers, and seasonal recipes.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md font-semibold transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-lg text-center shadow-sm border border-gray-100"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{subtitle}</p>
      <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
    </div>
  );
};

export default HomePage;