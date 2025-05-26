import React from 'react';
import { motion } from 'framer-motion';

interface BrandFiltersProps {
  brands: string[];
  selectedBrands: string[];
  onBrandSelect: (brand: string) => void;
}

const BrandFilters: React.FC<BrandFiltersProps> = ({ brands, selectedBrands, onBrandSelect }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Brands</h3>
      <div className="flex flex-wrap gap-2">
        {brands.map((brand) => (
          <motion.button
            key={brand}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBrandSelect(brand)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedBrands.includes(brand)
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {brand}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default BrandFilters;