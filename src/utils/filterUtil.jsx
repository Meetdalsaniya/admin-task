// Filter helpers
export function filterByDate(data, date) {
    return data.filter(row => row.date === date);
  }
  
  export function filterByStatus(data, status) {
    return data.filter(row => row.status === status);
  }
  
  export function applyFilters(data, filters) {
    let filteredData = [...data];
    
    if (filters.date) {
      filteredData = filterByDate(filteredData, filters.date);
    }
    if (filters.status) {
      filteredData = filterByStatus(filteredData, filters.status);
    }
    
    return filteredData;
  }
  