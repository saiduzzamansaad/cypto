import React, { useContext, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';

const AdvancedFilters = () => {
  const { filters, setFilters } = useContext(CryptoContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      minVolume: '',
      maxVolume: '',
      minChange7d: '',
      maxChange7d: '',
    });
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        {isOpen ? 'Hide Filters' : 'Advanced Filters'}
      </button>

      {isOpen && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Price ($)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Price ($)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Volume ($)</label>
              <input
                type="number"
                name="minVolume"
                value={filters.minVolume}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Volume ($)</label>
              <input
                type="number"
                name="maxVolume"
                value={filters.maxVolume}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Min 7d Change (%)</label>
              <input
                type="number"
                name="minChange7d"
                value={filters.minChange7d}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max 7d Change (%)</label>
              <input
                type="number"
                name="maxChange7d"
                value={filters.maxChange7d}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={clearFilters}
              className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;