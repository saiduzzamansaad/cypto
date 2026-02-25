import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchCoins = async (page = 1, perPage = 50, currency = 'usd') => {
  try {
    const response = await api.get('/coins/markets', {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: perPage,
        page: page,
        sparkline: false,
        price_change_percentage: '24h,7d',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCoinChart = async (coinId, days = 7, currency = 'usd') => {
  try {
    const response = await api.get(`/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: currency,
        days: days,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// NEW: OHLC data for candlestick chart
export const fetchCoinOHLC = async (coinId, days = 7, currency = 'usd') => {
  try {
    const response = await api.get(`/coins/${coinId}/ohlc`, {
      params: {
        vs_currency: currency,
        days: days,
      },
    });
    return response.data; // array of [timestamp, open, high, low, close]
  } catch (error) {
    throw error;
  }
};

export const fetchCoinDetails = async (coinId) => {
  try {
    const response = await api.get(`/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};