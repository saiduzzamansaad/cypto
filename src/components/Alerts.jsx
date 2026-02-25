import React, { useContext, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { FaTimes } from 'react-icons/fa';

const Alerts = ({ onClose }) => {
  const { alerts, removeAlert, addAlert, coins } = useContext(CryptoContext);
  const [showForm, setShowForm] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [condition, setCondition] = useState('above');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!selectedCoin || !price) return;
    addAlert(selectedCoin, condition, Number(price));
    setShowForm(false);
    setSelectedCoin('');
    setCondition('above');
    setPrice('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Price Alerts</h2>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            New Alert
          </button>
        ) : (
          <div className="mb-4 p-4 border rounded-lg">
            <div className="grid grid-cols-1 gap-4">
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
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="above">Price goes above</option>
                <option value="below">Price goes below</option>
              </select>
              <input
                type="number"
                placeholder="Target price (USD)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-2 rounded"
              />
              <div className="flex space-x-2">
                <button onClick={handleAdd} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
                <button onClick={() => setShowForm(false)} className="px-3 py-1 border rounded">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {alerts.length === 0 ? (
          <p className="text-gray-500">No alerts set.</p>
        ) : (
          <ul className="space-y-2">
            {alerts.map(alert => {
              const coin = coins.find(c => c.id === alert.coinId);
              return (
                <li key={alert.id} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <span className="font-medium">{coin?.name || alert.coinId}</span> –{' '}
                    {alert.condition === 'above' ? '>' : '<'} ${alert.price}
                    {alert.triggered && (
                      <span className="ml-2 text-green-600 text-sm">(Triggered)</span>
                    )}
                  </div>
                  <button onClick={() => removeAlert(alert.id)} className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Alerts;