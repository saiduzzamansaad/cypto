export const formatCurrency = (value, currency = 'usd') => {
      if (!value && value !== 0) return 'N/A';
      const symbols = { usd: '$', eur: '€', gbp: '£' };
      const symbol = symbols[currency] || '$';
    
      if (value >= 1e12) return `${symbol}${(value / 1e12).toFixed(2)}T`;
      if (value >= 1e9) return `${symbol}${(value / 1e9).toFixed(2)}B`;
      if (value >= 1e6) return `${symbol}${(value / 1e6).toFixed(2)}M`;
      if (value >= 1e3) return `${symbol}${(value / 1e3).toFixed(2)}K`;
      return `${symbol}${value.toFixed(2)}`;
    };
    
    export const formatPercentage = (value) => {
      if (!value && value !== 0) return '0%';
      return `${value.toFixed(2)}%`;
    };