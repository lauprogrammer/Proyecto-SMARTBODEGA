import React from 'react';
import { Boxes, Plus, Search, Filter } from 'lucide-react';

interface CategoryHeaderProps {
  searchTerm: string;
  filterStatus: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onCreateNew: () => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  searchTerm,
  filterStatus,
  onSearchChange,
  onFilterChange,
  onCreateNew
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#5D0F1D] bg-opacity-10 p-3 rounded-xl">
            <Boxes className="w-8 h-8 text-[#5D0F1D]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#5D0F1D]">Gestión de Categorías</h1>
            <p className="text-gray-500">Administra las categorías de productos</p>
          </div>
        </div>
        <button 
          className="flex items-center space-x-2 bg-[#5D0F1D] text-white px-4 py-2 rounded-lg hover:bg-[#7A1E2E] transition-colors duration-200"
          onClick={onCreateNew}
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
            onChange={(e) => onSearchChange(e.target.value)}
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
            onChange={(e) => onFilterChange(e.target.value)}
            className="bg-white border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
          >
            <option value="all">Todas las categorías</option>
            <option value="Activo">Activas</option>
            <option value="Inactivo">Inactivas</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader; 