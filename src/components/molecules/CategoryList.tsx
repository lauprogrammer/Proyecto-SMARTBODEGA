import React from 'react';
import { Category } from '@/types/category';
import CategoryCard from '@/components/atoms/CategoryCard';
import EmptyState from '@/components/atoms/EmptyState';

interface CategoryListProps {
  categories: Category[];
  expandedCategory: number | null;
  onToggleExpand: (categoryId: number) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onCreateNew?: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  expandedCategory,
  onToggleExpand,
  onEdit,
  onDelete,
  onCreateNew
}) => {
  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <EmptyState
          title="No se encontraron categorías"
          description="Intenta ajustar los filtros o crear una nueva categoría."
          actionText="Crear Nueva Categoría"
          onAction={onCreateNew}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          isExpanded={expandedCategory === category.id}
          onToggleExpand={() => onToggleExpand(category.id)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CategoryList; 