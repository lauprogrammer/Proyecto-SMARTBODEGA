export interface Exit {
  id: number;
  product: string;
  quantity: number;
  date: string;
  destination: string;
  category: string;
  price: number;
  status: 'Pendiente' | 'Completado' | 'Cancelado';
  notes: string;
}

export interface ExitFormData {
  product: string;
  quantity: string;
  date: string;
  destination: string;
  category: string;
  price: string;
  status: 'Pendiente' | 'Completado' | 'Cancelado';
  notes: string;
} 