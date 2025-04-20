import { Exit, ExitFormData } from '@/types/exit';

// Simulación de una base de datos en memoria
let exits: Exit[] = [
  {
    id: 1,
    product: 'Laptop HP',
    quantity: 5,
    date: '2024-03-20',
    destination: 'Oficina Principal',
    category: 'Electrónicos',
    price: 899.99,
    status: 'Completado',
    notes: 'Entrega realizada en tiempo'
  },
  {
    id: 2,
    product: 'Impresora Epson',
    quantity: 2,
    date: '2024-03-21',
    destination: 'Sucursal Norte',
    category: 'Electrónicos',
    price: 299.99,
    status: 'Pendiente',
    notes: 'Esperando confirmación de recepción'
  }
];

export const exitService = {
  // Obtener todas las salidas
  getAllExits: (): Promise<Exit[]> => {
    return Promise.resolve(exits);
  },

  // Buscar salidas por término
  searchExits: (term: string): Promise<Exit[]> => {
    const filtered = exits.filter(exit =>
      exit.product.toLowerCase().includes(term.toLowerCase()) ||
      exit.destination.toLowerCase().includes(term.toLowerCase())
    );
    return Promise.resolve(filtered);
  },

  // Filtrar salidas por estado
  filterByStatus: (status: string): Promise<Exit[]> => {
    if (status === 'all') return Promise.resolve(exits);
    const filtered = exits.filter(exit => exit.status === status);
    return Promise.resolve(filtered);
  },

  // Filtrar salidas por categoría
  filterByCategory: (category: string): Promise<Exit[]> => {
    if (category === 'all') return Promise.resolve(exits);
    const filtered = exits.filter(exit => exit.category === category);
    return Promise.resolve(filtered);
  },

  // Filtrar salidas por rango de fechas
  filterByDateRange: (startDate: string, endDate: string): Promise<Exit[]> => {
    const filtered = exits.filter(exit => {
      if (!startDate && !endDate) return true;
      if (!startDate) return exit.date <= endDate;
      if (!endDate) return exit.date >= startDate;
      return exit.date >= startDate && exit.date <= endDate;
    });
    return Promise.resolve(filtered);
  },

  // Crear una nueva salida
  createExit: (data: ExitFormData): Promise<Exit> => {
    const newExit: Exit = {
      id: exits.length + 1,
      ...data,
      quantity: Number(data.quantity),
      price: Number(data.price)
    };
    exits.push(newExit);
    return Promise.resolve(newExit);
  },

  // Actualizar una salida
  updateExit: (id: number, data: Partial<Exit>): Promise<Exit> => {
    const index = exits.findIndex(e => e.id === id);
    if (index === -1) return Promise.reject('Salida no encontrada');
    
    exits[index] = {
      ...exits[index],
      ...data
    };
    
    return Promise.resolve(exits[index]);
  },

  // Eliminar una salida
  deleteExit: (id: number): Promise<void> => {
    const index = exits.findIndex(e => e.id === id);
    if (index === -1) return Promise.reject('Salida no encontrada');
    
    exits.splice(index, 1);
    return Promise.resolve();
  }
}; 