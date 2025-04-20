import { Category, CategoryFormData } from '@/types/category';

// Simulación de una base de datos en memoria
let categories: Category[] = [
  {
    id: 1,
    name: 'Electrónicos',
    description: 'Productos electrónicos y dispositivos',
    products: 150,
    status: 'Activo',
    details: {
      created: '2024-01-15',
      lastUpdate: '2024-04-18',
      manager: 'Juan Pérez'
    }
  },
  {
    id: 2,
    name: 'Herramientas',
    description: 'Herramientas manuales y eléctricas',
    products: 200,
    status: 'Activo',
    details: {
      created: '2024-02-20',
      lastUpdate: '2024-04-17',
      manager: 'María González'
    }
  },
  {
    id: 3,
    name: 'Materiales',
    description: 'Materiales de construcción y suministros',
    products: 300,
    status: 'Inactivo',
    details: {
      created: '2024-03-10',
      lastUpdate: '2024-04-16',
      manager: 'Carlos Rodríguez'
    }
  }
];

export const categoryService = {
  // Obtener todas las categorías
  getAllCategories: (): Promise<Category[]> => {
    return Promise.resolve(categories);
  },

  // Buscar categorías por término
  searchCategories: (term: string): Promise<Category[]> => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(term.toLowerCase()) ||
      category.description.toLowerCase().includes(term.toLowerCase())
    );
    return Promise.resolve(filtered);
  },

  // Filtrar categorías por estado
  filterByStatus: (status: string): Promise<Category[]> => {
    if (status === 'all') return Promise.resolve(categories);
    const filtered = categories.filter(category => category.status === status);
    return Promise.resolve(filtered);
  },

  // Crear una nueva categoría
  createCategory: (data: CategoryFormData): Promise<Category> => {
    const newCategory: Category = {
      id: categories.length + 1,
      ...data,
      products: 0,
      status: 'Activo',
      details: {
        created: new Date().toISOString().split('T')[0],
        lastUpdate: new Date().toISOString().split('T')[0],
        manager: 'Administrador' // Esto debería venir del usuario actual
      }
    };
    categories.push(newCategory);
    return Promise.resolve(newCategory);
  },

  // Actualizar una categoría
  updateCategory: (id: number, data: Partial<Category>): Promise<Category> => {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return Promise.reject('Categoría no encontrada');
    
    categories[index] = {
      ...categories[index],
      ...data,
      details: {
        ...categories[index].details,
        lastUpdate: new Date().toISOString().split('T')[0]
      }
    };
    
    return Promise.resolve(categories[index]);
  },

  // Eliminar una categoría
  deleteCategory: (id: number): Promise<void> => {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return Promise.reject('Categoría no encontrada');
    
    categories.splice(index, 1);
    return Promise.resolve();
  }
}; 