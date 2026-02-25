import React, { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import SearchBar from './SearchBar';
import CurrencySelector from './CurrencySelector';
import { FaStar, FaDownload } from 'react-icons/fa';

const Navbar = () => {
  const { showWatchlistOnly, setShowWatchlistOnly, exportToCSV } = useContext(CryptoContext);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-indigo-600">CryptoVision</h1>

          <div className="flex items-center space-x-4">
            <SearchBar />
            <CurrencySelector />

            <button
              onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
              className={`p-2 rounded-lg ${
                showWatchlistOnly ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <FaStar />
            </button>

            <button
              onClick={exportToCSV}
              className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              title="Export to CSV"
            >
              <FaDownload />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;