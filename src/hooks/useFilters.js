import { useState, useCallback } from 'react';

export const useFilters = () => {
  const [filters, setFilters] = useState({});

  const updateFilter = useCallback((column, selectedValues) => {
    setFilters(prev => ({
      ...prev,
      [column]: selectedValues
    }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
  }, []);

  const clearFilter = useCallback((column) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[column];
      return newFilters;
    });
  }, []);

  const getActiveFiltersCount = useCallback(() => {
    return Object.values(filters).filter(filterSet => filterSet.size > 0).length;
  }, [filters]);

  return {
    filters,
    updateFilter,
    clearAllFilters,
    clearFilter,
    getActiveFiltersCount
  };
};