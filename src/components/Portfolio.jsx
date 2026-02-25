import React, { useContext, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { formatCurrency } from '../utils/formatNumber';
import { FaTimes } from 'react-icons/fa';

const Portfolio = ({ onClose }) => {
  const { portfolio, removeFromPortfolio, coins, currency } = useContext(CryptoContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  const totalValue = portfolio.reduce((sum, item) => {
    const coin = coins.find(c => c.id === item.id);
    if (!coin) return sum;
    return sum + coin.current_price * item.quantity;
  }, 0);

  const totalCost = portfolio.reduce((sum, item) => sum + item.purchasePrice * item.quantity, 0);
  const profitLoss = totalValue - totalCost;
  const profitLossPercent = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;

  const handleAdd = () => {
    if (!selectedCoin || !quantity || !purchasePrice) return;
    const coin = coins.find(c => c.id === selectedCoin);
    if (!coin) return;
    // In a real app, you'd validate more
    addToPortfolio(coin, Number(quantity), Number(purchasePrice));
    setShowAddForm(false);
    setSelectedCoin('');
    setQuantity('');
    setPurchasePrice('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">My Portfolio</h2>

        <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-600">Total Value</div>
              <div className="text-xl font-bold">{formatCurrency(totalValue)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Cost</div>
              <div className="text-xl font-bold">{formatCurrency(totalCost)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">P/L</div>
              <div className={`text-xl font-bold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(profitLoss)} ({profitLossPercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>

        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Coin
          </button>
        ) : (
          <div className="mb-4 p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Add to Portfolio</h3>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Select Coin</option>
                {coins.map(coin => (
                  <option key={coin.id} value={coin.id}>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Purchase Price (USD)"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="border p-2 rounded"
              />
              <div className="flex space-x-2">
                <button onClick={handleAdd} className="px-3 py-1 bg-green-600 text-white rounded">Add</button>
                <button onClick={() => setShowAddForm(false)} className="px-3 py-1 border rounded">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {portfolio.length === 0 ? (
          <p className="text-gray-500">Your portfolio is empty.</p>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Coin</th>
                <th className="text-right">Quantity</th>
                <th className="text-right">Avg. Buy Price</th>
                <th className="text-right">Current Price</th>
                <th className="text-right">Value</th>
                <th className="text-right">P/L</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map(item => {
                const coin = coins.find(c => c.id === item.id);
                if (!coin) return null;
                const currentValue = coin.current_price * item.quantity;
                const cost = item.purchasePrice * item.quantity;
                const pl = currentValue - cost;
                const plPercent = cost > 0 ? (pl / cost) * 100 : 0;
                return (
                  <tr key={item.id} className="border-b">
                    <td className="py-2 flex items-center">
                      <img src={coin.image} alt={item.name} className="w-6 h-6 mr-2" />
                      {item.name}
                    </td>
                    <td className="text-right">{item.quantity}</td>
                    <td className="text-right">{formatCurrency(item.purchasePrice)}</td>
                    <td className="text-right">{formatCurrency(coin.current_price)}</td>
                    <td className="text-right">{formatCurrency(currentValue)}</td>
                    <td className={`text-right ${pl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(pl)} ({plPercent.toFixed(2)}%)
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => removeFromPortfolio(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Portfolio;