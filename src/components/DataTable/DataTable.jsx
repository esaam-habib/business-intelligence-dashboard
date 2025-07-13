import { useState, useMemo } from 'react';
import Button from '../common/Button/Button';
import { TABLE_CONFIG } from '../../types/index';
import './DataTable.css';

const DataTable = ({ data, currentPage, totalPages, onPageChange, totalRecords }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const { startIndex, endIndex, visibleData } = useMemo(() => {
    const rowHeight = TABLE_CONFIG.ROW_HEIGHT;
    const visibleRows = TABLE_CONFIG.VISIBLE_ROWS;
    
    const startRow = Math.floor(scrollTop / rowHeight);
    const endRow = Math.min(startRow + visibleRows, data.length);
    
    const startIndex = (currentPage - 1) * TABLE_CONFIG.ITEMS_PER_PAGE + 1;
    const endIndex = Math.min(startIndex + data.length - 1, totalRecords);
    
    return {
      startIndex,
      endIndex,
      visibleData: data.slice(startRow, endRow),
      startRow,
      endRow
    };
  }, [data, currentPage, scrollTop, totalRecords]);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const containerHeight = TABLE_CONFIG.VISIBLE_ROWS * TABLE_CONFIG.ROW_HEIGHT;
  const contentHeight = data.length * TABLE_CONFIG.ROW_HEIGHT;
  const offsetY = Math.floor(scrollTop / TABLE_CONFIG.ROW_HEIGHT) * TABLE_CONFIG.ROW_HEIGHT;

  return (
    <div className="data-table card">
      <div className="data-table__header">
        <h3 className="data-table__title">Data Table</h3>
        <p className="data-table__subtitle">
          Showing {startIndex} to {endIndex} of {totalRecords} entries
        </p>
      </div>

      <div className="data-table__content">
        <div 
          className="data-table__scroll-container"
          style={{ height: containerHeight }}
          onScroll={handleScroll}
        >
          <div style={{ height: contentHeight, position: 'relative' }}>
            <div style={{ transform: `translateY(${offsetY}px)` }}>
              <table className="data-table__table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Value</th>
                    <th>Mod 3</th>
                    <th>Mod 4</th>
                    <th>Mod 5</th>
                    <th>Mod 6</th>
                    <th>Mod 7</th>
                    <th>Mod 8</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.value}</td>
                      <td>{row.mod3}</td>
                      <td>{row.mod4}</td>
                      <td>{row.mod5}</td>
                      <td>{row.mod6}</td>
                      <td>{row.mod7}</td>
                      <td>{row.mod8}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="data-table__pagination">
          <div className="data-table__page-info">
            Page {currentPage} of {totalPages}
          </div>
          <div className="data-table__page-controls">
            <Button
              variant="default"
              size="small"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="default"
              size="small"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;