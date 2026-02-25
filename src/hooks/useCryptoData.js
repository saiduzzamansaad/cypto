// This hook is now integrated in context, but you can use it to fetch specific data
import { useState, useEffect } from 'react';
import { fetchCoinChart } from '../api/cryptoApi';

export const useCryptoData = (coinId, days = 7) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coinId) return;
    const fetchChart = async () => {
      try {
        setLoading(true);
        const data = await fetchCoinChart(coinId, days);
        setChartData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChart();
  }, [coinId, days]);

  return { chartData, loading, error };
};