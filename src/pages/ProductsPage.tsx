import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { products, categories } from '../data/products';
import { Product } from '../types/product';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);
  const [showOrganic, setShowOrganic] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    filterProducts();
  }, [activeCategory, searchTerm, priceRange, showOrganic]);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const filterProducts = () => {
    let filtered = [...products];
    
    // Filter by category
    if (activeCategory) {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(product => {
      const price = product.sale ? (product.salePrice || 0) : product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Filter organic only
    if (showOrganic) {
      filtered = filtered.filter(product => product.organic);
    }
    
    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([priceRange[0], value]);
  };

  const toggleOrganicFilter = () => {
    setShowOrganic(!showOrganic);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Products</h1>
      
      {/* Search and Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        
        <button 
          className="md:hidden flex items-center px-4 py-2 bg-gray-100 rounded-md"
          onClick={toggleFilters}
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className={`md:block ${showFilters ? 'block' : 'hidden'} md:w-1/4 bg-white p-6 rounded-lg shadow-sm`}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <ul className="space-y-2">
              <li>
                <button
                  className={`text-left w-full ${activeCategory === null ? 'text-green-600 font-medium' : 'text-gray-600'}`}
                  onClick={() => handleCategoryClick(null)}
                >
                  All Products
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    className={`text-left w-full ${activeCategory === category.name ? 'text-green-600 font-medium' : 'text-gray-600'}`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Price Range</h3>
            <div className="flex items-center justify-between mb-2">
              <span>${priceRange[0].toFixed(2)}</span>
              <span>${priceRange[1].toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Product Type</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showOrganic}
                onChange={toggleOrganicFilter}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">Organic Only</span>
            </label>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl text-gray-600">No products found matching your criteria.</h2>
              <p className="mt-2 text-gray-500">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;