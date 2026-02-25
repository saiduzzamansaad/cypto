import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { FaArrowLeft } from 'react-icons/fa';

const CoinDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [detailsRes, chartRes] = await Promise.all([
          fetchCoinDetails(id),
          fetchCoinChart(id, days),
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
  }, [id, days]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
          <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  if (!details) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-700 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <img src={details.image.large} alt={details.name} className="w-16 h-16 mr-4" />
            <div>
              <h1 className="text-4xl font-bold">{details.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 uppercase">{details.symbol}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <div className="text-sm text-gray-500 dark:text-gray-400">Price</div>
              <div className="text-xl font-bold">{formatCurrency(details.market_data.current_price.usd)}</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <div className="text-sm text-gray-500 dark:text-gray-400">24h Change</div>
              <div className={`text-xl font-bold ${details.market_data.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(details.market_data.price_change_percentage_24h)}
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <div className="text-sm text-gray-500 dark:text-gray-400">Market Cap</div>
              <div className="text-xl font-bold">{formatCurrency(details.market_data.market_cap.usd)}</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <div className="text-sm text-gray-500 dark:text-gray-400">Volume</div>
              <div className="text-xl font-bold">{formatCurrency(details.market_data.total_volume.usd)}</div>
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
                <span className="ml-2 font-medium">{details.market_data.circulating_supply.toLocaleString()} {details.symbol.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Total Supply:</span>
                <span className="ml-2 font-medium">{details.market_data.total_supply?.toLocaleString() || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;