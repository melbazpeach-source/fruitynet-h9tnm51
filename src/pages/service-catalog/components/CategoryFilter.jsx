import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange('all')}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth
          ${activeCategory === 'all' ?'bg-primary text-primary-foreground shadow-elevation-sm' :'bg-card text-foreground hover:bg-muted border border-border'
          }
        `}
      >
        <Icon name="Grid3x3" size={16} />
        <span className="text-sm font-medium">All Services</span>
        <span className="ml-1 px-2 py-0.5 bg-background/20 rounded-full text-xs font-caption">
          {categories?.reduce((sum, cat) => sum + cat?.count, 0)}
        </span>
      </button>
      {categories?.map((category) => (
        <button
          key={category?.id}
          onClick={() => onCategoryChange(category?.id)}
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth
            ${activeCategory === category?.id 
              ? 'bg-primary text-primary-foreground shadow-elevation-sm' 
              : 'bg-card text-foreground hover:bg-muted border border-border'
            }
          `}
        >
          <Icon name={category?.icon} size={16} />
          <span className="text-sm font-medium">{category?.name}</span>
          <span className="ml-1 px-2 py-0.5 bg-background/20 rounded-full text-xs font-caption">
            {category?.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;