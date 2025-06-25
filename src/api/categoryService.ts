import { Category, CategoryFormData } from '@/types/category';
import { siteConfig } from '@/config/site';

const API_URL = siteConfig.apiBaseUrl + '/categories';

export const categoryService = {
  // Obtener todas las categorías
  getAllCategories: async (): Promise<Category[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener categorías');
    return res.json();
  },

  // Buscar categorías por término
  searchCategories: async (term: string): Promise<Category[]> => {
    const res = await fetch(`${API_URL}?search=${encodeURIComponent(term)}`);
    if (!res.ok) throw new Error('Error al buscar categorías');
    return res.json();
  },

  // Filtrar categorías por estado
  filterByStatus: async (status: string): Promise<Category[]> => {
    const res = await fetch(`${API_URL}?status=${encodeURIComponent(status)}`);
    if (!res.ok) throw new Error('Error al filtrar categorías');
    return res.json();
  },

  // Crear una nueva categoría
  createCategory: async (data: CategoryFormData): Promise<Category> => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear categoría');
    return res.json();
  },

  // Actualizar una categoría
  updateCategory: async (id: number, data: Partial<Category>): Promise<Category> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al actualizar categoría');
    return res.json();
  },

  // Eliminar una categoría
  deleteCategory: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar categoría');
  },
}; 