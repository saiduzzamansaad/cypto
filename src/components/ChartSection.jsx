import React, { useState, useEffect, useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { fetchCoinChart } from '../api/cryptoApi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../utils/formatNumber';

const ChartSection = () => {
  const { selectedCoin } = useContext(CryptoContext);
  const [days, setDays] = useState(7);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedCoin) return;
    const loadChart = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCoinChart(selectedCoin.id, days);
        // Transform data for recharts: array of {timestamp, price}
        const prices = data.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price,
        }));
        setChartData(prices);
      } catch (err) {
        setError('Failed to load chart');
      } finally {
        setLoading(false);
      }
    };
    loadChart();
  }, [selectedCoin, days]);

  if (!selectedCoin) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center text-gray-500">
        Select a coin to view chart
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-64 animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {selectedCoin.name} Price Chart
        </h2>
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
  );
};

export default ChartSection;