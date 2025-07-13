import { useEffect } from 'react';
import FilterPanel from '../FilterPanel/FilterPanel';
import DataTable from '../DataTable/DataTable';
import { useFilters } from '../../hooks/useFilters';
import { useTableData } from '../../hooks/useTableData';
import { generateMockData } from '../../utils/dataGenerator';
import './Dashboard.css';

const Dashboard = () => {
  const data = generateMockData(500);
  const { filters, updateFilter, clearAllFilters, getActiveFiltersCount } = useFilters();
  const { filteredData, currentPageData, currentPage, totalPages, goToPage, resetPage } = useTableData(data, filters);

  // Reset page when filters change
  useEffect(() => {
    resetPage();
  }, [filters, resetPage]);

  const handleFilterChange = (column, selectedValues) => {
    updateFilter(column, selectedValues);
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard__header">
          <h1 className="dashboard__title">Business Intelligence Dashboard</h1>
          <p className="dashboard__subtitle">Interactive data filtering and visualization</p>
        </div>

        <FilterPanel
          data={data}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={clearAllFilters}
          activeFiltersCount={activeFiltersCount}
        />

        {activeFiltersCount > 0 && (
          <div className="dashboard__results-summary">
            <div className="results-summary">
              <div className="results-summary__count">{filteredData.length}</div>
              <div className="results-summary__text">
                records match your current filters
                <span className="results-summary__filters">
                  ({activeFiltersCount} active filter{activeFiltersCount > 1 ? 's' : ''})
                </span>
              </div>
            </div>
          </div>
        )}

        <DataTable
          data={currentPageData}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          totalRecords={filteredData.length}
        />
      </div>
    </div>
  );
};

export default Dashboard;