import React, { useState } from 'react';
import { 
  Package, Search, Plus, Edit, Trash2, X, 
  Filter, ChevronDown, ChevronUp, Users, 
  Building2, Clock, Check, AlertCircle,
  BarChart2, Settings, Calendar, User,
  Globe, Mail, Phone, Map, Boxes, DollarSign
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProductosManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedProducto, setExpandedProducto] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productoToDelete, setProductoToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    stock: '',
    precio: '',
    estado: 'Activo',
    proveedor: '',
    detalles: {
      descripcion: '',
      fechaIngreso: '',
      ubicacion: ''
    }
  });

  // Datos de ejemplo
  const [productos, setProductos] = useState([
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
  ]);

  const handleProductoClick = (productoId: number) => {
    setExpandedProducto(expandedProducto === productoId ? null : productoId);
  };

  const handleEditProducto = (producto: any) => {
    setSelectedProducto(producto);
    setFormData({
      nombre: producto.nombre,
      categoria: producto.categoria,
      stock: producto.stock.toString(),
      precio: producto.precio.toString(),
      estado: producto.estado,
      proveedor: producto.proveedor,
      detalles: {
        descripcion: producto.detalles.descripcion,
        fechaIngreso: producto.detalles.fechaIngreso,
        ubicacion: producto.detalles.ubicacion
      }
    });
    setShowModal(true);
  };

  const handleDeleteProducto = (producto: any) => {
    setProductoToDelete(producto);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteProducto = async () => {
    if (!productoToDelete) return;
    
    setIsDeleting(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Eliminar el producto de la lista local
      setProductos(prevProductos => prevProductos.filter(producto => producto.id !== productoToDelete.id));
      
      toast.success(`Producto "${productoToDelete.nombre}" eliminado exitosamente`);
      setShowDeleteConfirm(false);
      setProductoToDelete(null);
    } catch (error) {
      toast.error('Error al eliminar el producto');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('detalles.')) {
      const detailName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        detalles: {
          ...prev.detalles,
          [detailName]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedProducto) {
      // Actualizar producto existente
      setProductos(prevProductos => 
        prevProductos.map(producto => 
          producto.id === selectedProducto.id 
            ? {
                ...producto,
                nombre: formData.nombre,
                categoria: formData.categoria,
                stock: parseInt(formData.stock),
                precio: parseFloat(formData.precio),
                estado: formData.estado,
                proveedor: formData.proveedor,
                detalles: {
                  ...producto.detalles,
                  descripcion: formData.detalles.descripcion,
                  fechaIngreso: formData.detalles.fechaIngreso,
                  ubicacion: formData.detalles.ubicacion,
                  ultimaActualizacion: new Date().toISOString().split('T')[0]
                }
              }
            : producto
        )
      );
      toast.success(`Producto "${formData.nombre}" actualizado exitosamente`);
    } else {
      // Crear nuevo producto
      const newProducto = {
        id: Math.max(...productos.map(p => p.id)) + 1,
        nombre: formData.nombre,
        categoria: formData.categoria,
        stock: parseInt(formData.stock),
        precio: parseFloat(formData.precio),
        estado: formData.estado,
        proveedor: formData.proveedor,
        detalles: {
          descripcion: formData.detalles.descripcion,
          fechaIngreso: formData.detalles.fechaIngreso,
          ubicacion: formData.detalles.ubicacion,
          ultimaActualizacion: new Date().toISOString().split('T')[0]
        }
      };
      setProductos(prevProductos => [...prevProductos, newProducto]);
      toast.success(`Producto "${formData.nombre}" creado exitosamente`);
    }
    
    setShowModal(false);
    setSelectedProducto(null);
    setFormData({
      nombre: '',
      categoria: '',
      stock: '',
      precio: '',
      estado: 'Activo',
      proveedor: '',
      detalles: {
        descripcion: '',
        fechaIngreso: '',
        ubicacion: ''
      }
    });
  };

  const filteredProductos = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.proveedor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && producto.estado === 'Activo') ||
                         (selectedFilter === 'inactive' && producto.estado === 'Inactivo');
    
    return matchesSearch && matchesFilter;
  });

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
                onClick={() => {
                  setShowModal(true);
                  setSelectedProducto(null);
                  setFormData({
                    nombre: '',
                    categoria: '',
                    stock: '',
                    precio: '',
                    estado: 'Activo',
                    proveedor: '',
                    detalles: {
                      descripcion: '',
                      fechaIngreso: '',
                      ubicacion: ''
                    }
                  });
                }}
                className="flex items-center space-x-2 bg-[#5D0F1D] text-white px-6 py-3 rounded-xl hover:bg-[#7A1E2E] transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Nuevo Producto</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
          {filteredProductos.map((producto) => (
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
                      title="Editar producto"
                    >
                      <Edit className="w-5 h-5 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProducto(producto)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Eliminar producto"
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

      {/* Modal de Nuevo/Editar Producto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#5D0F1D]">
                {selectedProducto ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setSelectedProducto(null);
                  setFormData({
                    nombre: '',
                    categoria: '',
                    stock: '',
                    precio: '',
                    estado: 'Activo',
                    proveedor: '',
                    detalles: {
                      descripcion: '',
                      fechaIngreso: '',
                      ubicacion: ''
                    }
                  });
                }}
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
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleFormChange}
                    placeholder="Nombre del Producto"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  />
                </div>
                <div className="relative">
                  <Boxes className="absolute left-3 top-3 text-gray-400" />
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleFormChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    <option value="Electrónicos">Electrónicos</option>
                    <option value="Herramientas">Herramientas</option>
                    <option value="Materiales">Materiales</option>
                    <option value="Mobiliario">Mobiliario</option>
                  </select>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleFormChange}
                    placeholder="Stock"
                    className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleFormChange}
                    placeholder="Precio"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="proveedor"
                    value={formData.proveedor}
                    onChange={handleFormChange}
                    placeholder="Proveedor"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  />
                </div>
                <div className="relative">
                  <Map className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="detalles.ubicacion"
                    value={formData.detalles.ubicacion}
                    onChange={handleFormChange}
                    placeholder="Ubicación"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  />
                </div>
                <div className="relative">
                  <textarea
                    name="detalles.descripcion"
                    value={formData.detalles.descripcion}
                    onChange={handleFormChange}
                    placeholder="Descripción del producto"
                    className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    rows={3}
                    required
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    name="detalles.fechaIngreso"
                    value={formData.detalles.fechaIngreso}
                    onChange={handleFormChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  />
                </div>
                <div className="relative">
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleFormChange}
                    className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5D0F1D] focus:border-[#5D0F1D] transition-all duration-200"
                    required
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedProducto(null);
                    setFormData({
                      nombre: '',
                      categoria: '',
                      stock: '',
                      precio: '',
                      estado: 'Activo',
                      proveedor: '',
                      detalles: {
                        descripcion: '',
                        fechaIngreso: '',
                        ubicacion: ''
                      }
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5D0F1D] text-white rounded-lg hover:bg-[#7A1E2E]"
                >
                  {selectedProducto ? 'Actualizar' : 'Crear'} Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center space-x-4 mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-800">Confirmar Eliminación</h2>
            </div>
            <p className="text-gray-600 mb-4">
              ¿Estás seguro que deseas eliminar el producto "{productoToDelete?.nombre}"? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setProductoToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteProducto}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductosManagement; 