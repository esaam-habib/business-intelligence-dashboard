export const applyFilters = (data, filters) => {
    let result = data;
    
    Object.entries(filters).forEach(([column, selectedValues]) => {
      if (selectedValues.size > 0) {
        result = result.filter(row => selectedValues.has(row[column]));
      }
    });
    
    return result;
  };
  
  /**
   * Gets available options for a filter column based on other active filters
   * @param {import('../types/index.js').DataRow[]} data 
   * @param {import('../types/index.js').FilterState} filters 
   * @param {string} targetColumn 
   * @returns {number[]}
   */
  export const getAvailableOptions = (data, filters, targetColumn) => {
    // Get all filters except the target column
    const otherFilters = Object.entries(filters).filter(([column]) => column !== targetColumn);
    
    // Apply other filters to get relevant data
    let relevantData = data;
    otherFilters.forEach(([column, selectedValues]) => {
      if (selectedValues.size > 0) {
        relevantData = relevantData.filter(row => selectedValues.has(row[column]));
      }
    });
    
    // Extract unique values for the target column
    const uniqueValues = new Set(relevantData.map(row => row[targetColumn]));
    
    return Array.from(uniqueValues).sort((a, b) => a - b);
  };