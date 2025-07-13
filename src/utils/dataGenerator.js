export const generateMockData = (count = 500) => {
    const data = [];
    
    for (let i = 1; i <= count; i++) {
      data.push({
        id: i,
        value: i,
        mod3: i % 3,
        mod4: i % 4,
        mod5: i % 5,
        mod6: i % 6,
        mod7: i % 7,
        mod8: i % 8,
      });
    }
    
    return data;
  };