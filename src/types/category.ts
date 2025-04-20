export interface Category {
  id: number;
  name: string;
  description: string;
  products: number;
  status: 'Activo' | 'Inactivo';
  details: {
    created: string;
    lastUpdate: string;
    manager: string;
  };
}

export interface CategoryFormData {
  name: string;
  description: string;
} 