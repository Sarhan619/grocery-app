import { Product, Category } from '../types/product';

export const products: Product[] = [{
  id: 1,
  name: "Apple",
  category: "Fruits & Vegetables",
  price: 1.2,
  image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  featured: true,
  description: "Fresh and juicy apples, perfect for snacking or baking.",
  inStock: true
},
{
  id: 2,
  name: "Milk",
  category: "Dairy",
  price: 0.99,
  image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  featured: false,
  description: "Rich and creamy milk, sourced from local farms.",
  inStock: true
},
{
  id: 3,
  name: "Chicken Breast",
  category: "Meat & Seafood",
  price: 5.5,
  image: "https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  featured: true,
  description: "Tender and lean chicken breast, perfect for grilling.",
  inStock: true
},
{
  id: 4,
  name: "Whole Wheat Bread",
  category: "Bakery",
  price: 2.5,
  image: "https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  featured: false,
  description: "Healthy whole wheat bread, baked fresh daily.",
  inStock: true
},
{
  id: 5,
  name: "Frozen Pizza",
  category: "Frozen Foods",
  price: 4.99,
  image: "https://images.pexels.com/photos/3296434/pexels-photo-3296434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  featured: true,
  description: "Delicious frozen pizza with a crispy crust and rich toppings.",
  inStock: true
},
{
  id: 6,
  name: "Canned Beans",
  category: "Canned & Packaged Goods",
  price: 1.5,
  image: "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  featured: false,
  description: "Convenient canned beans, ready to use in your favorite recipes.",
  inStock: true
},
{
  id: 7,
  name: "Orange Juice",
  category: "Beverages",
  price: 3.0,
  image: "https://images.pexels.com/photos/2479046/pexels-photo-2479046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  featured: true,
  description: "Refreshing orange juice, made from freshly squeezed oranges.",
  inStock: true
},
{
  id: 8,
  name: "Potato Chips",
  category: "Snacks",
  price: 2.99,
  image: "https://images.pexels.com/photos/1618767/pexels-photo-1618767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  featured: false,
  description: "Crispy and flavorful potato chips, perfect for snacking.",
  inStock: true
},
{
  id: 9,
  name: "Salt",
  category: "Condiments & Spices",
  price: 0.5,
  image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  featured: false,
  description: "High-quality salt, ideal for seasoning your dishes.",
  inStock: true
},
{
  id: 10,
  name: "Spaghetti",
  category: "Grains & Pasta",
  price: 1.99,
  image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  featured: true,
  description: "Classic spaghetti pasta, perfect for Italian dishes.",
  inStock: true
}];

export const categories: Category[] = [
  {
    id: 1,
    name: "Fruits & Vegetables",
    image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 2,
    name: "Dairy",
    image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 3,
    name: "Meat & Seafood",
    image: "https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 4,
    name: "Bakery",
    image: "https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 5,
    name: "Frozen Foods",
    image: "https://images.pexels.com/photos/3296434/pexels-photo-3296434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 6,
    name: "Canned & Packaged Goods",
    image: "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 7,
    name: "Beverages",
    image: "https://images.pexels.com/photos/2479046/pexels-photo-2479046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 8,
    name: "Snacks",
    image: "https://images.pexels.com/photos/1618767/pexels-photo-1618767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 9,
    name: "Condiments & Spices",
    image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 10,
    name: "Grains & Pasta",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 11,
    name: "Breakfast & Cereals",
    image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 12,
    name: "Baby Products",
    image: "https://images.pexels.com/photos/3933271/pexels-photo-3933271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 13,
    name: "Personal Care",
    image: "https://images.pexels.com/photos/3987152/pexels-photo-3987152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 14,
    name: "Cleaning Supplies",
    image: "https://images.pexels.com/photos/4239016/pexels-photo-4239016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  },
  {
    id: 15,
    name: "Pet Supplies",
    image: "https://images.pexels.com/photos/4587996/pexels-photo-4587996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 0
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};