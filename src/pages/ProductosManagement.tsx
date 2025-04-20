import React, { useState } from 'react';
import { 
  Package, Search, Plus, Edit, Trash2, X, 
  Filter, ChevronDown, ChevronUp, Users, 
  Building2, Clock, Check, AlertCircle,
  BarChart2, Settings, Calendar, User,
  Globe, Mail, Phone, Map, Boxes, DollarSign
} from 'lucide-react';

const ProductosManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedProducto, setExpandedProducto] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Datos de ejemplo
  const productos = [
    {
      id: 1,
      nombre: 'Laptop HP',
      categoria: 'Electrónicos',
      stock: 15,
      precio: 899.99,
      estado: 'Activo',
      proveedor: 'HP Inc.',
      detalles: {
        descripcion: 'Laptop HP con procesador Intel Core i7',
        fechaIngreso: '2024-03-15',
        ultimaActualizacion: '2024-04-10',
        ubicacion: 'Estante A-1'
      }
    },
    {
      id: 2,
      nombre: 'Impresora Epson',
      categoria: 'Electrónicos',
      stock: 8,
      precio: 299.99,
      estado: 'Activo',
      proveedor: 'Epson',
      detalles: {
        descripcion: 'Impresora multifunción Epson EcoTank',
        fechaIngreso: '2024-03-20',
        ultimaActualizacion: '2024-04-05',
        ubicacion: 'Estante B-2'
      }
    },
    {
      id: 3,
      nombre: 'Silla Ergonómica',
      categoria: 'Mobiliario',
      stock: 25,
      precio: 199.99,
      estado: 'Activo',
      proveedor: 'OfficeMax',
      detalles: {
        descripcion: 'Silla ergonómica con soporte lumbar',
        fechaIngreso: '2024-03-10',
        ultimaActualizacion: '2024-04-15',
        ubicacion: 'Estante C-3'
      }
    }
  ];

  const handleProductoClick = (productoId: number) => {
    setExpandedProducto(expandedProducto === productoId ? null : productoId);
  };

  const handleEditProducto = (producto: any) => {
    setSelectedProducto(producto);
    setShowModal(true);
  };

  const handleDeleteProducto = (producto: any) => {
    setSelectedProducto(producto);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-[#5D0F1D] bg-opacity-10 p-3 rounded-xl">
                <Package className="w-8 h-8 text-[#5D0F1D]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#5D0F1D]">Gestión de Productos</h1>
                <p className="text-gray-500">Administra y monitorea los productos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {viewMode === 'grid' ? 'Vista Lista' : 'Vista Cuadrícula'}
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 bg-[#5D0F1D] text-white px-6 py-3 rounded-xl hover:bg-[#7A1E2E] transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Nuevo Producto</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#5D0F1D] bg-opacity-10 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Productos</p>
                  <p className="text-2xl font-bold text-[#5D0F1D]">{productos.length}</p>
                </div>
                <Package className="w-8 h-8 text-[#5D0F1D]" />
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Productos Activos</p>
                  <p className="text-2xl font-bold text-green-600">{productos.filter(p => p.estado === 'Activo').length}</p>
                </div>
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Stock Total</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {productos.reduce((acc, p) => acc + p.stock, 0)}
                  </p>
                </div>
                <Boxes className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Valor Total</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ${productos.reduce((acc, p) => acc + (p.stock * p.precio), 0).toFixed(2)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center space-x-2 bg-white border px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
                <span>Filtrar</span>
              </button>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-white border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
              >
                <option value="all">Todos los Productos</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Productos Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {productos.map((producto) => (
            <div 
              key={producto.id} 
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                viewMode === 'grid' ? 'h-[500px]' : ''
              }`}
            >
              {/* Header */}
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-[#5D0F1D]">{producto.nombre}</h3>
                    <div className="flex items-center space-x-2 text-gray-500 mt-1">
                      <Package className="w-4 h-4" />
                      <span>{producto.categoria}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditProducto(producto)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProducto(producto)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Stock</p>
                    <p className="font-medium">{producto.stock} unidades</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Precio</p>
                    <p className="font-medium">${producto.precio}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Proveedor</p>
                    <p className="font-medium">{producto.proveedor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ubicación</p>
                    <p className="font-medium">{producto.detalles.ubicacion}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Estado</h4>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      producto.estado === 'Activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {producto.estado}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-700">Última Actualización</h4>
                    <span className="text-sm text-gray-500">{producto.detalles.ultimaActualizacion}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductosManagement; 