export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand?: string;
  sale?: boolean;
  salePrice?: number;
  inStock: boolean;
  featured?: boolean;
  organic?: boolean;
  quantity?: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  productCount: number;
  description?: string;
}