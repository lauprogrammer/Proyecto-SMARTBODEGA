import React, { useState, useEffect } from 'react';
import { 
  Package, Plus, Search, Filter, Calendar, 
  User, Tag, DollarSign, X, ChevronDown, ChevronUp,
  ArrowRight, AlertCircle
} from 'lucide-react';
import { exitService } from '@/services/exitService';
import { Exit, ExitFormData } from '@/types/exit';
import { toast } from 'react-hot-toast';

const SalidasManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [exits, setExits] = useState<Exit[]>([]);
  const [filteredExits, setFilteredExits] = useState<Exit[]>([]);
  const [formData, setFormData] = useState<ExitFormData>({
    product: '',
    quantity: '',
    date: '',
    destination: '',
    category: '',
    price: '',
    status: 'Pendiente',
    notes: ''
  });

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateRange: { start: '', end: '' },
    category: 'all'
  });

  useEffect(() => {
    loadExits();
  }, []);

  const loadExits = async () => {
    try {
      const data = await exitService.getAllExits();
      setExits(data);
      setFilteredExits(data);
    } catch (error) {
      toast.error('Error al cargar las salidas');
    }
  };

  const handleExitChange = (
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
      await exitService.createExit(formData);
      toast.success('Salida creada exitosamente');
      setShowModal(false);
      loadExits();
    } catch (error) {
      toast.error('Error al crear la salida');
    }
  };

  const handleFilterChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));

    try {
      let filteredData = await exitService.getAllExits();

      if (value && name === 'search') {
        filteredData = await exitService.searchExits(value);
      } else if (value && name === 'status' && value !== 'all') {
        filteredData = await exitService.filterByStatus(value);
      } else if (value && name === 'category' && value !== 'all') {
        filteredData = await exitService.filterByCategory(value);
      }

      setFilteredExits(filteredData);
    } catch (error) {
      toast.error('Error al filtrar las salidas');
    }
  };

  const handleDateRangeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newDateRange = {
      ...filters.dateRange,
      [name]: value
    };

    setFilters(prev => ({
      ...prev,
      dateRange: newDateRange
    }));

    if (newDateRange.start || newDateRange.end) {
      try {
        const filteredData = await exitService.filterByDateRange(
          newDateRange.start,
          newDateRange.end
        );
        setFilteredExits(filteredData);
      } catch (error) {
        toast.error('Error al filtrar por fechas');
      }
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtered = exits.filter(exit =>
      exit.product.toLowerCase().includes(value) ||
      exit.destination.toLowerCase().includes(value)
    );
    setFilteredExits(filtered);
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <ArrowRight className="w-8 h-8 text-[#5D0F1D]" />
              <h1 className="text-2xl font-bold text-[#5D0F1D]">Gestión de Salidas</h1>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 bg-[#5D0F1D] text-white px-4 py-2 rounded-lg hover:bg-[#7A1E2E] transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Salida</span>
            </button>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Buscar salidas..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
              />
            </div>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Completado">Completado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
            >
              <option value="all">Todas las categorías</option>
              <option value="Electrónicos">Electrónicos</option>
              <option value="Herramientas">Herramientas</option>
              <option value="Materiales">Materiales</option>
            </select>
            <div className="flex gap-2">
              <input
                type="date"
                name="start"
                value={filters.dateRange.start}
                onChange={handleDateRangeChange}
                className="border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
              />
              <input
                type="date"
                name="end"
                value={filters.dateRange.end}
                onChange={handleDateRangeChange}
                className="border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Lista de Salidas */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 gap-4 p-4 bg-gray-100 text-sm font-medium text-gray-600">
            <div>Producto</div>
            <div>Cantidad</div>
            <div>Fecha</div>
            <div>Destino</div>
            <div>Categoría</div>
            <div>Precio</div>
            <div>Estado</div>
          </div>
          {filteredExits.map((exit) => (
            <div key={exit.id} className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Package className="w-4 h-4 text-gray-500 mr-2" />
                <span>{exit.product}</span>
              </div>
              <div>{exit.quantity} unidades</div>
              <div>{exit.date}</div>
              <div>{exit.destination}</div>
              <div>{exit.category}</div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                <span>{exit.price.toFixed(2)}</span>
              </div>
              <div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  exit.status === 'Completado' ? 'bg-green-100 text-green-800' :
                  exit.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {exit.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Nueva Salida */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#5D0F1D]">Registrar Nueva Salida</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Package className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleExitChange}
                    placeholder="Nombre del Producto"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleExitChange}
                    placeholder="Cantidad"
                    className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleExitChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleExitChange}
                    placeholder="Destino"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  />
                </div>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 text-gray-400" />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleExitChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    <option value="Electrónicos">Electrónicos</option>
                    <option value="Herramientas">Herramientas</option>
                    <option value="Materiales">Materiales</option>
                  </select>
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleExitChange}
                    placeholder="Precio Unitario"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  />
                </div>
                <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleExitChange}
                    className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                <div className="relative md:col-span-2">
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleExitChange}
                    placeholder="Notas adicionales"
                    className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#5D0F1D] text-white rounded-xl hover:bg-[#7A1E2E] transition-colors duration-200"
                >
                  Registrar Salida
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalidasManagement; 