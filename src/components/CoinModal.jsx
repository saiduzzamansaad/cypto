import React, { useEffect, useState } from 'react';
import { fetchCoinDetails, fetchCoinChart } from '../api/cryptoApi';
import { formatCurrency, formatPercentage } from '../utils/formatNumber';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FaTimes } from 'react-icons/fa';

const CoinModal = ({ coin, onClose }) => {
  const [details, setDetails] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [detailsRes, chartRes] = await Promise.all([
          fetchCoinDetails(coin.id),
          fetchCoinChart(coin.id, days),
        ]);
        setDetails(detailsRes);
        const prices = chartRes.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price,
        }));
        setChartData(prices);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [coin.id, days]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
            <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <FaTimes size={24} />
        </button>

        <div className="flex items-center mb-6">
          <img src={coin.image} alt={coin.name} className="w-12 h-12 mr-4" />
          <div>
            <h2 className="text-3xl font-bold">{coin.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 uppercase">{coin.symbol}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <div className="text-sm text-gray-500 dark:text-gray-400">Price</div>
            <div className="text-xl font-bold">{formatCurrency(coin.current_price)}</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <div className="text-sm text-gray-500 dark:text-gray-400">24h Change</div>
            <div className={`text-xl font-bold ${coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(coin.price_change_percentage_24h)}
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <div className="text-sm text-gray-500 dark:text-gray-400">Market Cap</div>
            <div className="text-xl font-bold">{formatCurrency(coin.market_cap)}</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <div className="text-sm text-gray-500 dark:text-gray-400">Volume</div>
            <div className="text-xl font-bold">{formatCurrency(coin.total_volume)}</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">Price History</h3>
            <div className="flex space-x-2">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-3 py-1 rounded ${
                    days === d
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {d}D
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line type="monotone" dataKey="price" stroke="#4f46e5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {details && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Market Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-500 dark:text-gray-400">All Time High:</span>
                <span className="ml-2 font-medium">{formatCurrency(details.market_data.ath.usd)}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">All Time Low:</span>
                <span className="ml-2 font-medium">{formatCurrency(details.market_data.atl.usd)}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Circulating Supply:</span>
                <span className="ml-2 font-medium">{details.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Total Supply:</span>
                <span className="ml-2 font-medium">{details.market_data.total_supply?.toLocaleString() || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinModal;