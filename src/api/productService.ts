import { siteConfig } from '@/config/site';
// Ajusta los tipos según tu definición en src/types/product.ts
import { Product, ProductFormData } from '@/types/product';

const API_URL = siteConfig.apiBaseUrl + '/products';

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener productos');
    return res.json();
  },
  searchProducts: async (term: string): Promise<Product[]> => {
    const res = await fetch(`${API_URL}?search=${encodeURIComponent(term)}`);
    if (!res.ok) throw new Error('Error al buscar productos');
    return res.json();
  },
  filterByCategory: async (category: string): Promise<Product[]> => {
    const res = await fetch(`${API_URL}?category=${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error('Error al filtrar productos');
    return res.json();
  },
  createProduct: async (data: ProductFormData): Promise<Product> => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear producto');
    return res.json();
  },
  updateProduct: async (id: number, data: Partial<Product>): Promise<Product> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al actualizar producto');
    return res.json();
  },
  deleteProduct: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar producto');
  },
}; 