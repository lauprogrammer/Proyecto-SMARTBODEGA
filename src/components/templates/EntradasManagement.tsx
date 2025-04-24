import React, { useState, useEffect } from 'react';
import { ClipboardList, Plus, Search, Filter, ChevronDown, ChevronUp, Edit, Trash2, X } from 'lucide-react';
import { entryService } from '@/api/entryService';
import { Entry, EntryFormData } from '@/types/entry';
import { toast } from 'react-hot-toast';

const EntradasManagement: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null);
  const [formData, setFormData] = useState<EntryFormData>({
    product: '',
    quantity: '',
    date: '',
    supplier: '',
    category: '',
    price: '',
    status: 'Pendiente',
    notes: ''
  });
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  // Agregamos las categorías predefinidas
  const categories = [
    { id: 1, name: 'Electrónicos', description: 'Productos electrónicos y dispositivos' },
    { id: 2, name: 'Herramientas', description: 'Herramientas manuales y eléctricas' },
    { id: 3, name: 'Materiales', description: 'Materiales de construcción y suministros' },
    { id: 4, name: 'Papelería', description: 'Artículos de oficina y papelería' },
    { id: 5, name: 'Limpieza', description: 'Productos de limpieza y aseo' },
    { id: 6, name: 'Seguridad', description: 'Equipos de protección y seguridad' }
  ];

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const data = await entryService.getAllEntries();
      setEntries(data);
    } catch (error) {
      toast.error('Error al cargar las entradas');
    }
  };

  const handleEntryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedEntry) {
        await entryService.updateEntry(selectedEntry.id, {
          ...formData,
          quantity: Number(formData.quantity),
          price: Number(formData.price)
        });
        toast.success('Entrada actualizada exitosamente');
      } else {
        await entryService.createEntry(formData);
        toast.success('Entrada creada exitosamente');
      }
      setShowCreateModal(false);
      setSelectedEntry(null);
      setFormData({
        product: '',
        quantity: '',
        date: '',
        supplier: '',
        category: '',
        price: '',
        status: 'Pendiente',
        notes: ''
      });
      loadEntries();
    } catch (error) {
      toast.error('Error al procesar la entrada');
    }
  };

  const handleFilterChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'status') {
      setFilterStatus(value);
      try {
        const filtered = await entryService.filterByStatus(value);
        setEntries(filtered);
      } catch (error) {
        toast.error('Error al filtrar por estado');
      }
    } else if (name === 'category') {
      try {
        const filtered = await entryService.filterByCategory(value);
        setEntries(filtered);
      } catch (error) {
        toast.error('Error al filtrar por categoría');
      }
    }
  };

  const handleDateRangeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));

    if (dateRange.startDate && dateRange.endDate) {
      try {
        const filtered = await entryService.filterByDateRange(
          dateRange.startDate,
          dateRange.endDate
        );
        setEntries(filtered);
      } catch (error) {
        toast.error('Error al filtrar por fecha');
      }
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      loadEntries();
    } else {
      const filtered = entries.filter(entry =>
        entry.product.toLowerCase().includes(e.target.value.toLowerCase()) ||
        entry.supplier.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setEntries(filtered);
    }
  };

  const handleEditEntry = (entry: Entry) => {
    setSelectedEntry(entry);
    setFormData({
      product: entry.product,
      quantity: entry.quantity.toString(),
      date: entry.date,
      supplier: entry.supplier,
      category: entry.category,
      price: entry.price.toString(),
      status: entry.status,
      notes: entry.notes
    });
    setShowCreateModal(true);
  };

  const handleDeleteEntry = async (entryId: number) => {
    if (window.confirm('¿Está seguro de eliminar esta entrada?')) {
      try {
        await entryService.deleteEntry(entryId);
        toast.success('Entrada eliminada exitosamente');
        loadEntries();
      } catch (error) {
        toast.error('Error al eliminar la entrada');
      }
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <ClipboardList className="w-8 h-8 text-[#5D0F1D]" />
            <h1 className="text-2xl font-bold text-[#5D0F1D]">Gestión de Entradas</h1>
          </div>
          <button 
            className="flex items-center space-x-2 bg-[#5D0F1D] text-white px-4 py-2 rounded-lg hover:bg-[#7A1E2E] transition-colors duration-200"
            onClick={() => {
              setSelectedEntry(null);
              setFormData({
                product: '',
                quantity: '',
                date: '',
                supplier: '',
                category: '',
                price: '',
                status: 'Pendiente',
                notes: ''
              });
              setShowCreateModal(true);
            }}
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Entrada</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar entradas..."
              value={searchTerm}
              onChange={handleFilter}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select 
              name="status"
              value={filterStatus}
              onChange={handleFilterChange}
              className="bg-white border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Completado">Completado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
            <select 
              name="category"
              onChange={handleFilterChange}
              className="bg-white border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                type="date"
                name="startDate"
                value={dateRange.startDate}
                onChange={handleDateRangeChange}
                className="bg-white border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
              />
              <input
                type="date"
                name="endDate"
                value={dateRange.endDate}
                onChange={handleDateRangeChange}
                className="bg-white border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Entries List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.product}</div>
                    <div className="text-sm text-gray-500">{entry.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.supplier}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      entry.status === 'Completado' ? 'bg-green-100 text-green-800' :
                      entry.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditEntry(entry)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#5D0F1D]">
                {selectedEntry ? 'Editar Entrada' : 'Nueva Entrada'}
              </h2>
              <button 
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedEntry(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Producto</label>
                  <input
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleEntryChange}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5D0F1D] focus:border-[#5D0F1D]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleEntryChange}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5D0F1D] focus:border-[#5D0F1D]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleEntryChange}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5D0F1D] focus:border-[#5D0F1D]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Proveedor</label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleEntryChange}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5D0F1D] focus:border-[#5D0F1D]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoría</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleEntryChange}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5D0F1D] focus:border-[#5D0F1D]"
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {formData.category && (
                    <p className="mt-1 text-sm text-gray-500">
                      {categories.find(c => c.name === formData.category)?.description}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleEntryChange}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5D0F1D] focus:border-[#5D0F1D]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleEntryChange}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5D0F1D] focus:border-[#5D0F1D]"
                    required
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notas</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleEntryChange}
                  rows={3}
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5D0F1D] focus:border-[#5D0F1D]"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedEntry(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5D0F1D]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5D0F1D] hover:bg-[#7A1E2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5D0F1D]"
                >
                  {selectedEntry ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntradasManagement; 