import React, { useContext, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { formatCurrency, formatPercentage } from '../utils/formatNumber';
import { FaStar, FaChartLine, FaPlusCircle } from 'react-icons/fa';
import CoinModal from './CoinModal';

const CryptoRow = ({ coin, index }) => {
  const { watchlist, toggleWatchlist, setSelectedCoin, addToPortfolio } = useContext(CryptoContext);
  const [showModal, setShowModal] = useState(false);
  const isFavorite = watchlist.includes(coin.id);

  const handleRowClick = () => setShowModal(true);
  const handleChartClick = (e) => {
    e.stopPropagation();
    setSelectedCoin(coin);
  };
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleWatchlist(coin.id);
  };
  const handleAddToPortfolio = (e) => {
    e.stopPropagation();
    // Prompt for quantity and purchase price (simplified: use 1 and current price)
    const quantity = prompt('Enter quantity:', '1');
    if (quantity === null) return;
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) return;
    addToPortfolio(coin, qty, coin.current_price);
    alert('Added to portfolio!');
  };

  return (
    <>
      <tr
        onClick={handleRowClick}
        className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
      >
        <td className="px-4 py-3">{index + 1}</td>
        <td className="px-4 py-3">
          <div className="flex items-center">
            <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
            <div>
              <div className="font-medium">{coin.name}</div>
              <div className="text-sm text-gray-500 uppercase">{coin.symbol}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-right font-medium">{formatCurrency(coin.current_price)}</td>
        <td className={`px-4 py-3 text-right ${coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatPercentage(coin.price_change_percentage_24h)}
        </td>
        <td className={`px-4 py-3 text-right ${coin.price_change_percentage_7d_in_currency > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatPercentage(coin.price_change_percentage_7d_in_currency || 0)}
        </td>
        <td className="px-4 py-3 text-right">{formatCurrency(coin.market_cap)}</td>
        <td className="px-4 py-3 text-right">{formatCurrency(coin.total_volume)}</td>
        <td className="px-4 py-3 text-center">
          <div className="flex justify-center space-x-2">
            <button onClick={handleFavoriteClick} className={`p-2 rounded-full ${isFavorite ? 'text-yellow-400' : 'text-gray-400'}`}>
              <FaStar />
            </button>
            <button onClick={handleChartClick} className="p-2 rounded-full text-indigo-600" title="Show in chart">
              <FaChartLine />
            </button>
            <button onClick={handleAddToPortfolio} className="p-2 rounded-full text-green-600" title="Add to portfolio">
              <FaPlusCircle />
            </button>
          </div>
        </td>
      </tr>
      {showModal && <CoinModal coin={coin} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default CryptoRow;