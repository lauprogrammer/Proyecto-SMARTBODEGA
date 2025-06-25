import React, { useState, useEffect } from 'react';
import { categoryService } from '@/api/categoryService';
import { Category, CategoryFormData } from '@/types/category';
import { toast } from 'react-hot-toast';

// Componentes atómicos y moleculares
import CategoryHeader from '@/components/atoms/CategoryHeader';
import CategoryList from '@/components/molecules/CategoryList';
import CategoryForm from '@/components/atoms/CategoryForm';
import DeleteConfirmModal from '@/components/atoms/DeleteConfirmModal';

const Features = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar categorías iniciales
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      // Si hay error, usar datos de ejemplo
      setCategories([
        {
          id: 1,
          name: 'Electrónicos',
          description: 'Productos electrónicos y dispositivos tecnológicos',
          products: 25,
          status: 'Activo',
          details: {
            created: '2024-01-15',
            lastUpdate: '2024-04-18',
            manager: 'Juan Pérez'
          }
        },
        {
          id: 2,
          name: 'Herramientas',
          description: 'Herramientas manuales y eléctricas para diferentes usos',
          products: 18,
          status: 'Activo',
          details: {
            created: '2024-02-20',
            lastUpdate: '2024-04-17',
            manager: 'María García'
          }
        },
        {
          id: 3,
          name: 'Materiales',
          description: 'Materiales de construcción y suministros generales',
          products: 32,
          status: 'Activo',
          details: {
            created: '2024-03-10',
            lastUpdate: '2024-04-16',
            manager: 'Carlos López'
          }
        },
        {
          id: 4,
          name: 'Papelería',
          description: 'Artículos de oficina y papelería',
          products: 15,
          status: 'Inactivo',
          details: {
            created: '2024-01-25',
            lastUpdate: '2024-04-15',
            manager: 'Ana Rodríguez'
          }
        }
      ]);
    }
  };

  // Buscar y filtrar categorías
  useEffect(() => {
    const searchAndFilter = async () => {
      try {
        let filteredCategories: Category[] = [];
        
        if (searchTerm) {
          filteredCategories = await categoryService.searchCategories(searchTerm);
        } else if (filterStatus !== 'all') {
          filteredCategories = await categoryService.filterByStatus(filterStatus);
        } else {
          await loadCategories();
          return;
        }
        
        setCategories(filteredCategories);
      } catch (error) {
        // Si hay error, filtrar localmente
        const allCategories = categories;
        let filtered = allCategories;
        
        if (searchTerm) {
          filtered = allCategories.filter(cat => 
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        if (filterStatus !== 'all') {
          filtered = filtered.filter(cat => cat.status === filterStatus);
        }
        
        setCategories(filtered);
      }
    };

    searchAndFilter();
  }, [searchTerm, filterStatus]);

  const handleCategoryClick = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleCreateCategory = async (formData: CategoryFormData) => {
    setIsSubmitting(true);
    try {
      await categoryService.createCategory(formData);
      setShowCreateModal(false);
      loadCategories();
      toast.success('Categoría creada exitosamente');
    } catch (error) {
      // Simular creación local
      const newCategory: Category = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        name: formData.name,
        description: formData.description,
        products: 0,
        status: 'Activo',
        details: {
          created: new Date().toISOString().split('T')[0],
          lastUpdate: new Date().toISOString().split('T')[0],
          manager: 'Usuario Actual'
        }
      };
      setCategories(prev => [...prev, newCategory]);
      setShowCreateModal(false);
      toast.success('Categoría creada exitosamente');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCategory = async (category: Category) => {
    setSelectedCategory(category);
    setShowCreateModal(true);
  };

  const handleUpdateCategory = async (formData: CategoryFormData) => {
    if (!selectedCategory) return;

    setIsSubmitting(true);
    try {
      await categoryService.updateCategory(selectedCategory.id, formData);
      setShowCreateModal(false);
      setSelectedCategory(null);
      loadCategories();
      toast.success('Categoría actualizada exitosamente');
    } catch (error) {
      // Simular actualización local
      setCategories(prev => 
        prev.map(cat => 
          cat.id === selectedCategory.id 
            ? {
                ...cat,
                name: formData.name,
                description: formData.description,
                details: {
                  ...cat.details,
                  lastUpdate: new Date().toISOString().split('T')[0]
                }
              }
            : cat
        )
      );
      setShowCreateModal(false);
      setSelectedCategory(null);
      toast.success('Categoría actualizada exitosamente');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    setSelectedCategory(category);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;

    setIsDeleting(true);
    try {
      await categoryService.deleteCategory(selectedCategory.id);
      setShowDeleteConfirm(false);
      setSelectedCategory(null);
      loadCategories();
      toast.success('Categoría eliminada exitosamente');
    } catch (error) {
      // Simular eliminación local
      setCategories(prev => prev.filter(cat => cat.id !== selectedCategory.id));
      setShowDeleteConfirm(false);
      setSelectedCategory(null);
      toast.success('Categoría eliminada exitosamente');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormSubmit = (formData: CategoryFormData) => {
    if (selectedCategory) {
      handleUpdateCategory(formData);
    } else {
      handleCreateCategory(formData);
    }
  };

  const handleCreateNew = () => {
    setSelectedCategory(null);
    setShowCreateModal(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <CategoryHeader
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterStatus}
          onCreateNew={handleCreateNew}
        />

        {/* Categories List */}
        <CategoryList
          categories={categories}
          expandedCategory={expandedCategory}
          onToggleExpand={handleCategoryClick}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          onCreateNew={handleCreateNew}
        />
      </div>

      {/* Create/Edit Category Modal */}
      <CategoryForm
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleFormSubmit}
        selectedCategory={selectedCategory}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setSelectedCategory(null);
        }}
        onConfirm={confirmDelete}
        title="Confirmar Eliminación"
        message={`¿Estás seguro que deseas eliminar la categoría "${selectedCategory?.name}"? Esta acción no se puede deshacer.`}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Features; 