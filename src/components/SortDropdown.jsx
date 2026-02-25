import React, { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';

const SortDropdown = () => {
  const { sortBy, setSortBy, order, setOrder } = useContext(CryptoContext);

  const sortOptions = [
    { value: 'market_cap', label: 'Market Cap' },
    { value: 'price', label: 'Price' },
    { value: 'volume', label: 'Volume' },
    { value: 'change', label: '24h %' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort by {opt.label}
          </option>
        ))}
      </select>

      <button
        onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
        className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        {order === 'asc' ? '↑ Asc' : '↓ Desc'}
      </button>
    </div>
  );
};

export default SortDropdown;