export interface Entry {
  id: number;
  product: string;
  quantity: number;
  date: string;
  supplier: string;
  category: string;
  price: number;
  status: 'Pendiente' | 'Completado' | 'Cancelado';
  notes: string;
}

export interface EntryFormData {
  product: string;
  quantity: string;
  date: string;
  supplier: string;
  category: string;
  price: string;
  status: 'Pendiente' | 'Completado' | 'Cancelado';
  notes: string;
} 