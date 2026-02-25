import React, { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import CryptoRow from './CryptoRow';
import SkeletonRow from './SkeletonRow';

const CryptoTable = () => {
  const { filteredCoins, loading, error, retry } = useContext(CryptoContext);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={retry} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-4 py-3 text-left">Coin</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-right">24h %</th>
            <th className="px-4 py-3 text-right">7d %</th>
            <th className="px-4 py-3 text-right">Market Cap</th>
            <th className="px-4 py-3 text-right">Volume</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
          ) : filteredCoins.length > 0 ? (
            filteredCoins.map((coin, index) => <CryptoRow key={coin.id} coin={coin} index={index} />)
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-8 text-gray-500">
                No coins found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;