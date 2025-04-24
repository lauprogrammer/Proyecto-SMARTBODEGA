import React, { useState, useEffect } from 'react';
import { Boxes, Plus, Search, Filter, ChevronDown, ChevronUp, Edit, Trash2, X, Check } from 'lucide-react';
import { categoryService } from '@/api/categoryService';
import { Category, CategoryFormData } from '@/types/category';
import { toast } from 'react-hot-toast';

const Features = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: ''
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Cargar categorías iniciales
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error('Error al cargar las categorías');
    }
  };

  // Buscar y filtrar categorías
  useEffect(() => {
    const searchAndFilter = async () => {
      try {
        let filteredCategories: Category[] = [];
        
        if (searchTerm) {
          filteredCategories = await categoryService.searchCategories(searchTerm);
        } else {
          filteredCategories = await categoryService.filterByStatus(filterStatus);
        }
        
        setCategories(filteredCategories);
      } catch (error) {
        toast.error('Error al filtrar las categorías');
      }
    };

    searchAndFilter();
  }, [searchTerm, filterStatus]);

  const handleCategoryClick = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await categoryService.createCategory(formData);
      setShowCreateModal(false);
      setFormData({ name: '', description: '' });
      loadCategories();
      toast.success('Categoría creada exitosamente');
    } catch (error) {
      toast.error('Error al crear la categoría');
    }
  };

  const handleEditCategory = async (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description
    });
    setShowCreateModal(true);
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    try {
      await categoryService.updateCategory(selectedCategory.id, formData);
      setShowCreateModal(false);
      setSelectedCategory(null);
      setFormData({ name: '', description: '' });
      loadCategories();
      toast.success('Categoría actualizada exitosamente');
    } catch (error) {
      toast.error('Error al actualizar la categoría');
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    setSelectedCategory(category);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;

    try {
      await categoryService.deleteCategory(selectedCategory.id);
      setShowDeleteConfirm(false);
      setSelectedCategory(null);
      loadCategories();
      toast.success('Categoría eliminada exitosamente');
    } catch (error) {
      toast.error('Error al eliminar la categoría');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Boxes className="w-8 h-8 text-[#5D0F1D]" />
            <h1 className="text-2xl font-bold text-[#5D0F1D]">Categorías</h1>
          </div>
          <button 
            className="flex items-center space-x-2 bg-[#5D0F1D] text-white px-4 py-2 rounded-lg hover:bg-[#7A1E2E] transition-colors duration-200"
            onClick={() => {
              setSelectedCategory(null);
              setFormData({ name: '', description: '' });
              setShowCreateModal(true);
            }}
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Categoría</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center space-x-2 bg-white border px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Filter className="w-5 h-5 text-gray-600" />
              <span>Filtrar</span>
            </button>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
            >
              <option value="all">Todas las categorías</option>
              <option value="Activo">Activas</option>
              <option value="Inactivo">Inactivas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {categories.map((category) => (
          <div key={category.id} className="border-b last:border-b-0">
            <div
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#5D0F1D] rounded-lg flex items-center justify-center text-white">
                    <Boxes className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{category.products} productos</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    category.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {category.status}
                  </span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCategory(category);
                      }}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category);
                      }}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                  {expandedCategory === category.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedCategory === category.id && (
              <div className="bg-gray-50 p-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Información General</h4>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Creada:</span> {category.details.created}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Última actualización:</span> {category.details.lastUpdate}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Responsable:</span> {category.details.manager}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Estadísticas</h4>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Total de productos:</span> {category.products}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Estado:</span> {category.status}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Acciones Rápidas</h4>
                    <div className="mt-2 space-y-2">
                      <button className="w-full px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                        Ver Productos
                      </button>
                      <button className="w-full px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200 transition-colors">
                        Exportar Datos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create/Edit Category Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#5D0F1D]">
                {selectedCategory ? 'Editar Categoría' : 'Crear Nueva Categoría'}
              </h2>
              <button 
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedCategory(null);
                  setFormData({ name: '', description: '' });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={selectedCategory ? handleUpdateCategory : handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre de la Categoría</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  placeholder="Ej: Electrónicos"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  placeholder="Descripción de la categoría"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedCategory(null);
                    setFormData({ name: '', description: '' });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5D0F1D] text-white rounded-lg hover:bg-[#7A1E2E]"
                >
                  {selectedCategory ? 'Actualizar' : 'Crear'} Categoría
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center space-x-4 mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-800">Confirmar Eliminación</h2>
            </div>
            <p className="text-gray-600 mb-4">
              ¿Estás seguro que deseas eliminar la categoría "{selectedCategory.name}"? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedCategory(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Features; 