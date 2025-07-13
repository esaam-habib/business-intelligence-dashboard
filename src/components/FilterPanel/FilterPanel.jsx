import { useMemo } from 'react';
import Dropdown from '../common/Dropdown/Dropdown';
import Button from '../common/Button/Button';
import { getAvailableOptions } from '../../utils/filterHelpers';
import { FILTER_COLUMNS } from '../../types/index';
import './FilterPanel.css';

const FilterPanel = ({ data, filters, onFilterChange, onClearAll, activeFiltersCount }) => {
  const filterConfigs = useMemo(() => {
    return FILTER_COLUMNS.map(column => ({
      key: column,
      label: `${column.charAt(0).toUpperCase() + column.slice(1)} Filter`,
      options: getAvailableOptions(data, filters, column)
    }));
  }, [data, filters]);

  return (
    <div className="filter-panel card">
      <div className="filter-panel__header">
        <h2 className="filter-panel__title">Filters</h2>
        {activeFiltersCount > 0 && (
          <Button variant="secondary" size="small" onClick={onClearAll}>
            Clear all ({activeFiltersCount})
          </Button>
        )}
      </div>
      
      <div className="filter-panel__content">
        <div className="filter-panel__grid">
          {filterConfigs.map(config => (
            <Dropdown
              key={config.key}
              label={config.label}
              options={config.options}
              selectedValues={filters[config.key] || new Set()}
              onSelectionChange={(values) => onFilterChange(config.key, values)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;