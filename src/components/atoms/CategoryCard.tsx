import React from 'react';
import { Boxes, ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react';
import { Category } from '@/types/category';

interface CategoryCardProps {
  category: Category;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isExpanded,
  onToggleExpand,
  onEdit,
  onDelete
}) => {
  return (
    <div className="border-b last:border-b-0">
      <div
        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
        onClick={onToggleExpand}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#5D0F1D] rounded-lg flex items-center justify-center text-white">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-lg text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{category.products} productos</span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              category.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {category.status}
            </span>
            <div className="flex space-x-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(category);
                }}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                title="Editar categoría"
              >
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(category);
                }}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                title="Eliminar categoría"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="bg-gray-50 p-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Información General</h4>
              <div className="space-y-2">
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
              <h4 className="font-medium text-gray-700 mb-2">Estadísticas</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Total de productos:</span> {category.products}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Estado:</span> {category.status}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Acciones Rápidas</h4>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                  Ver Productos
                </button>
                <button className="w-full px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200 transition-colors">
                  Exportar Datos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard; 