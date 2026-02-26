export const sortCoins = (coins, key, order = 'desc') => {
      return [...coins].sort((a, b) => {
        if (order === 'asc') {
          return a[key] - b[key];
        } else {
          return b[key] - a[key];
        }
      });
    };