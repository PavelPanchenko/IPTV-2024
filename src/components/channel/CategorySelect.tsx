import React from 'react';

interface CategorySelectProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySelect = React.memo(({ categories, selectedCategory, onCategoryChange }: CategorySelectProps) => {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
    >
      {categories.map(category => (
        <option key={category} value={category}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </option>
      ))}
    </select>
  );
});

CategorySelect.displayName = 'CategorySelect';

export default CategorySelect;