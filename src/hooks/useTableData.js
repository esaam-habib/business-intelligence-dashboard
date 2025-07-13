import { useState, useMemo } from 'react';
import { applyFilters } from '../utils/filterHelpers.js';
import { TABLE_CONFIG } from '../types/index';

export const useTableData = (data, filters) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return applyFilters(data, filters);
  }, [data, filters]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / TABLE_CONFIG.ITEMS_PER_PAGE);
  }, [filteredData.length]);

  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * TABLE_CONFIG.ITEMS_PER_PAGE;
    const endIndex = startIndex + TABLE_CONFIG.ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    filteredData,
    currentPageData,
    currentPage,
    totalPages,
    goToPage,
    resetPage
  };
};