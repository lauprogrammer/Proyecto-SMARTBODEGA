import { Entry, EntryFormData } from '@/types/entry';

// Simulación de una base de datos en memoria
let entries: Entry[] = [
  {
    id: 1,
    product: 'Laptop HP',
    quantity: 10,
    date: '2024-03-20',
    supplier: 'HP Inc.',
    category: 'Electrónicos',
    price: 899.99,
    status: 'Completado',
    notes: 'Entrega realizada en tiempo'
  },
  {
    id: 2,
    product: 'Impresora Epson',
    quantity: 5,
    date: '2024-03-21',
    supplier: 'Epson',
    category: 'Electrónicos',
    price: 299.99,
    status: 'Pendiente',
    notes: 'Esperando confirmación de envío'
  }
];

export const entryService = {
  // Obtener todas las entradas
  getAllEntries: (): Promise<Entry[]> => {
    return Promise.resolve(entries);
  },

  // Buscar entradas por término
  searchEntries: (term: string): Promise<Entry[]> => {
    const filtered = entries.filter(entry =>
      entry.product.toLowerCase().includes(term.toLowerCase()) ||
      entry.supplier.toLowerCase().includes(term.toLowerCase())
    );
    return Promise.resolve(filtered);
  },

  // Filtrar entradas por estado
  filterByStatus: (status: string): Promise<Entry[]> => {
    if (status === 'all') return Promise.resolve(entries);
    const filtered = entries.filter(entry => entry.status === status);
    return Promise.resolve(filtered);
  },

  // Filtrar entradas por categoría
  filterByCategory: (category: string): Promise<Entry[]> => {
    if (category === 'all') return Promise.resolve(entries);
    const filtered = entries.filter(entry => entry.category === category);
    return Promise.resolve(filtered);
  },

  // Filtrar entradas por rango de fechas
  filterByDateRange: (startDate: string, endDate: string): Promise<Entry[]> => {
    const filtered = entries.filter(entry => {
      if (!startDate && !endDate) return true;
      if (!startDate) return entry.date <= endDate;
      if (!endDate) return entry.date >= startDate;
      return entry.date >= startDate && entry.date <= endDate;
    });
    return Promise.resolve(filtered);
  },

  // Crear una nueva entrada
  createEntry: (data: EntryFormData): Promise<Entry> => {
    const newEntry: Entry = {
      id: entries.length + 1,
      ...data,
      quantity: Number(data.quantity),
      price: Number(data.price)
    };
    entries.push(newEntry);
    return Promise.resolve(newEntry);
  },

  // Actualizar una entrada
  updateEntry: (id: number, data: Partial<Entry>): Promise<Entry> => {
    const index = entries.findIndex(e => e.id === id);
    if (index === -1) return Promise.reject('Entrada no encontrada');
    
    entries[index] = {
      ...entries[index],
      ...data
    };
    
    return Promise.resolve(entries[index]);
  },

  // Eliminar una entrada
  deleteEntry: (id: number): Promise<void> => {
    const index = entries.findIndex(e => e.id === id);
    if (index === -1) return Promise.reject('Entrada no encontrada');
    
    entries.splice(index, 1);
    return Promise.resolve();
  }
}; 