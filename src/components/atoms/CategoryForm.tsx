import React, { useState } from 'react';
import { X } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Category, CategoryFormData } from '@/types/category';

// Schema de validación con Zod
const categorySchema = z.object({
  name: z.string()
    .min(1, { message: "El nombre es obligatorio" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(50, { message: "El nombre no puede exceder 50 caracteres" }),
  description: z.string()
    .min(1, { message: "La descripción es obligatoria" })
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(200, { message: "La descripción no puede exceder 200 caracteres" })
});

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => void;
  selectedCategory?: Category | null;
  isSubmitting?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedCategory,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: selectedCategory?.name || '',
    description: selectedCategory?.description || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validar con Zod
      categorySchema.parse(formData);
      
      // Si la validación pasa, enviar los datos
      onSubmit(formData);
      
      // Limpiar errores
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error('Por favor, corrige los errores en el formulario');
      }
    }
  };

  const handleClose = () => {
    setFormData({ name: '', description: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#5D0F1D]">
            {selectedCategory ? 'Editar Categoría' : 'Crear Nueva Categoría'}
          </h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Categoría *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent transition-colors ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Ej: Electrónicos, Herramientas, etc."
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent transition-colors resize-none ${
                errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Describe el propósito y contenido de esta categoría"
              rows={4}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/200 caracteres
            </p>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#5D0F1D] hover:bg-[#7A1E2E] text-white'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? 'Procesando...' 
                : selectedCategory ? 'Actualizar Categoría' : 'Crear Categoría'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm; 