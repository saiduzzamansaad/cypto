import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { fetchCoins } from '../api/cryptoApi';
import useLocalStorage from '../hooks/useLocalStorage';

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  // Core states
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);

  // NEW: Multi-currency
  const [currency, setCurrency] = useLocalStorage('currency', 'usd');

  // NEW: Watchlist (already present)
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', []);

  // NEW: Portfolio
  const [portfolio, setPortfolio] = useLocalStorage('portfolio', []); // { id, name, symbol, quantity, purchasePrice }

  // NEW: Alerts
  const [alerts, setAlerts] = useLocalStorage('alerts', []); // { id, coinId, condition: 'above'|'below', price, triggered: false }

  // NEW: Advanced filters
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minVolume: '',
    maxVolume: '',
    minChange7d: '',
    maxChange7d: '',
  });

  // Fetch coins (auto-refresh every 30s)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const data = await fetchCoins(page, perPage, currency);
        setCoins(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch coins');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [page, perPage, currency]);

  // Check alerts whenever coins update
  useEffect(() => {
    if (!coins.length) return;
    const updatedAlerts = alerts.map(alert => {
      const coin = coins.find(c => c.id === alert.coinId);
      if (!coin) return alert;
      const currentPrice = coin.current_price;
      const triggered = alert.condition === 'above'
        ? currentPrice >= alert.price
        : currentPrice <= alert.price;
      return { ...alert, triggered };
    });
    setAlerts(updatedAlerts);
  }, [coins]);

  // Toggle watchlist
  const toggleWatchlist = (coinId) => {
    setWatchlist(prev =>
      prev.includes(coinId) ? prev.filter(id => id !== coinId) : [...prev, coinId]
    );
  };

  // Portfolio functions
  const addToPortfolio = (coin, quantity, purchasePrice) => {
    const existing = portfolio.find(item => item.id === coin.id);
    if (existing) {
      setPortfolio(prev =>
        prev.map(item =>
          item.id === coin.id
            ? { ...item, quantity: item.quantity + quantity, purchasePrice: (item.purchasePrice * item.quantity + purchasePrice * quantity) / (item.quantity + quantity) }
            : item
        )
      );
    } else {
      setPortfolio([...portfolio, { id: coin.id, name: coin.name, symbol: coin.symbol, image: coin.image, quantity, purchasePrice }]);
    }
  };

  const removeFromPortfolio = (coinId) => {
    setPortfolio(prev => prev.filter(item => item.id !== coinId));
  };

  // Alert functions
  const addAlert = (coinId, condition, price) => {
    const newAlert = {
      id: Date.now(),
      coinId,
      condition,
      price,
      triggered: false,
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  const removeAlert = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  // Filtering logic
  const filteredCoins = useMemo(() => {
    let filtered = coins.filter(coin => {
      // Search
      const matchesSearch = coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase());
      if (!matchesSearch) return false;

      // Watchlist filter
      if (showWatchlistOnly && !watchlist.includes(coin.id)) return false;

      // Advanced filters
      const price = coin.current_price;
      const volume = coin.total_volume;
      const change7d = coin.price_change_percentage_7d_in_currency || 0;

      if (filters.minPrice && price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && price > Number(filters.maxPrice)) return false;
      if (filters.minVolume && volume < Number(filters.minVolume)) return false;
      if (filters.maxVolume && volume > Number(filters.maxVolume)) return false;
      if (filters.minChange7d && change7d < Number(filters.minChange7d)) return false;
      if (filters.maxChange7d && change7d > Number(filters.maxChange7d)) return false;

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'price':
          aVal = a.current_price;
          bVal = b.current_price;
          break;
        case 'market_cap':
          aVal = a.market_cap;
          bVal = b.market_cap;
          break;
        case 'volume':
          aVal = a.total_volume;
          bVal = b.total_volume;
          break;
        case 'change24h':
          aVal = a.price_change_percentage_24h;
          bVal = b.price_change_percentage_24h;
          break;
        case 'change7d':
          aVal = a.price_change_percentage_7d_in_currency || 0;
          bVal = b.price_change_percentage_7d_in_currency || 0;
          break;
        default:
          aVal = a.market_cap;
          bVal = b.market_cap;
      }
      if (order === 'asc') return aVal - bVal;
      else return bVal - aVal;
    });

    return filtered;
  }, [coins, search, sortBy, order, showWatchlistOnly, watchlist, filters]);

  // Top gainers/losers (24h)
  const topGainers = useMemo(() => {
    return [...coins]
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 5);
  }, [coins]);

  const topLosers = useMemo(() => {
    return [...coins]
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, 5);
  }, [coins]);

  // Retry function
  const retry = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCoins(page, perPage, currency);
      setCoins(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, currency]);

  // Export CSV
  const exportToCSV = () => {
    const headers = ['Rank', 'Name', 'Symbol', 'Price', '24h %', '7d %', 'Market Cap', 'Volume'];
    const rows = filteredCoins.map((coin, idx) => [
      idx + 1,
      coin.name,
      coin.symbol.toUpperCase(),
      coin.current_price,
      coin.price_change_percentage_24h,
      coin.price_change_percentage_7d_in_currency || 0,
      coin.market_cap,
      coin.total_volume,
    ]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'crypto_data.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const value = {
    coins,
    filteredCoins,
    loading,
    error,
    search,
    setSearch,
    sortBy,
    setSortBy,
    order,
    setOrder,
    page,
    setPage,
    perPage,
    setPerPage,
    selectedCoin,
    setSelectedCoin,
    watchlist,
    toggleWatchlist,
    showWatchlistOnly,
    setShowWatchlistOnly,
    topGainers,
    topLosers,
    retry,
    // New
    currency,
    setCurrency,
    portfolio,
    addToPortfolio,
    removeFromPortfolio,
    alerts,
    addAlert,
    removeAlert,
    filters,
    setFilters,
    exportToCSV,
  };

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  );
};