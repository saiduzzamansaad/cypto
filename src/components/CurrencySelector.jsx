import React, { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';

const CurrencySelector = () => {
  const { currency, setCurrency } = useContext(CryptoContext);

  const currencies = [
    { code: 'usd', symbol: '$', label: 'USD' },
    { code: 'eur', symbol: '€', label: 'EUR' },
    { code: 'gbp', symbol: '£', label: 'GBP' },
  ];

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {currencies.map((c) => (
        <option key={c.code} value={c.code}>
          {c.label} ({c.symbol})
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;