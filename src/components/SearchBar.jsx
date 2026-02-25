import React, { useState, useContext, useEffect } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import useDebounce from '../hooks/useDebounce';

const SearchBar = () => {
  const { search, setSearch } = useContext(CryptoContext);
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <input
      type="text"
      placeholder="Search coin..."
      value={localSearch}
      onChange={(e) => setLocalSearch(e.target.value)}
      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
};

export default SearchBar;