import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  Package, 
  Tags, 
  ShoppingBag, 
  Users, 
  Settings,
  Plus,
  Pencil,
  Trash2,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData, brandsData] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('categories').select('*'),
        supabase.from('brands').select('*')
      ]);

      if (productsData.error) throw productsData.error;
      if (categoriesData.error) throw categoriesData.error;
      if (brandsData.error) throw brandsData.error;

      setProducts(productsData.data);
      setCategories(categoriesData.data);
      setBrands(brandsData.data);
    } catch (error) {
      toast.error('Error fetching data');
      console.error('Error:', error);
    }
  };

  const handleDelete = async (table: string, id: string) => {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success(`${table} deleted successfully`);
      fetchData();
    } catch (error) {
      toast.error('Error deleting item');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 bg-white rounded-lg shadow-sm p-6">
            <nav className="space-y-2">
              <SidebarLink
                icon={<Package />}
                label="Products"
                active={activeTab === 'products'}
                onClick={() => setActiveTab('products')}
              />
              <SidebarLink
                icon={<Tags />}
                label="Categories"
                active={activeTab === 'categories'}
                onClick={() => setActiveTab('categories')}
              />
              <SidebarLink
                icon={<ShoppingBag />}
                label="Brands"
                active={activeTab === 'brands'}
                onClick={() => setActiveTab('brands')}
              />
              <SidebarLink
                icon={<Users />}
                label="Customers"
                active={activeTab === 'customers'}
                onClick={() => setActiveTab('customers')}
              />
              <SidebarLink
                icon={<Settings />}
                label="Settings"
                active={activeTab === 'settings'}
                onClick={() => setActiveTab('settings')}
              />
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'products' && (
              <ProductsPanel 
                products={products} 
                categories={categories}
                brands={brands}
                onDelete={(id) => handleDelete('products', id)}
                onRefresh={fetchData}
                onAddProduct={() => setShowAddProduct(true)}
              />
            )}
            {activeTab === 'categories' && (
              <CategoriesPanel 
                categories={categories}
                onDelete={(id) => handleDelete('categories', id)}
                onRefresh={fetchData}
              />
            )}
            {activeTab === 'brands' && (
              <BrandsPanel 
                brands={brands}
                categories={categories}
                onDelete={(id) => handleDelete('brands', id)}
                onRefresh={fetchData}
              />
            )}
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <AddProductModal
          categories={categories}
          brands={brands}
          onClose={() => setShowAddProduct(false)}
          onSuccess={() => {
            setShowAddProduct(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 w-full px-4 py-2 rounded-md transition-colors duration-200 ${
      active ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

interface PanelProps {
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

interface ProductsPanelProps extends PanelProps {
  products: any[];
  categories: any[];
  brands: any[];
  onAddProduct: () => void;
}

const ProductsPanel: React.FC<ProductsPanelProps> = ({ products, categories, brands, onDelete, onAddProduct }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Products</h2>
      <button 
        onClick={onAddProduct}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
      >
        <Plus className="h-5 w-5" />
        <span>Add Product</span>
      </button>
    </div>

    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img className="h-10 w-10 rounded-full object-cover" src={product.image_url} alt={product.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {categories.find(c => c.id === product.category_id)?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {brands.find(b => b.id === product.brand_id)?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${product.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.stock_count}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-green-600 hover:text-green-900 mr-3">
                  <Pencil className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => onDelete(product.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

interface AddProductModalProps {
  categories: any[];
  brands: any[];
  onClose: () => void;
  onSuccess: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ categories, brands, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sale_price: '',
    image_url: '',
    category_id: '',
    brand_id: '',
    stock_count: '',
    is_organic: false,
    is_featured: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          ...formData,
          price: parseFloat(formData.price),
          sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
          stock_count: parseInt(formData.stock_count)
        }]);

      if (error) throw error;

      toast.success('Product added successfully');
      onSuccess();
    } catch (error) {
      toast.error('Error adding product');
      console.error('Error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <select
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select a brand</option>
                  {brands
                    .filter(brand => !formData.category_id || brand.category_id === formData.category_id)
                    .map(brand => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sale Price
                </label>
                <input
                  type="number"
                  name="sale_price"
                  value={formData.sale_price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Count
                </label>
                <input
                  type="number"
                  name="stock_count"
                  value={formData.stock_count}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_organic"
                    checked={formData.is_organic}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Organic</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

interface CategoriesPanelProps extends PanelProps {
  categories: any[];
}

const CategoriesPanel: React.FC<CategoriesPanelProps> = ({ categories, onDelete }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
      <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
        <Plus className="h-5 w-5" />
        <span>Add Category</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <img 
            src={category.image_url} 
            alt={category.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{category.description}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="text-green-600 hover:text-green-900">
                <Pencil className="h-5 w-5" />
              </button>
              <button 
                onClick={() => onDelete(category.id)}
                className="text-red-600 hover:text-red-900"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface BrandsPanelProps extends PanelProps {
  brands: any[];
  categories: any[];
}

const BrandsPanel: React.FC<BrandsPanelProps> = ({ brands, categories, onDelete }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Brands</h2>
      <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
        <Plus className="h-5 w-5" />
        <span>Add Brand</span>
      </button>
    </div>

    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {brand.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {categories.find(c => c.id === brand.category_id)?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-green-600 hover:text-green-900 mr-3">
                  <Pencil className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => onDelete(brand.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminDashboard;