import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CryptoContext } from '../context/CryptoContext';
import { formatCurrency, formatPercentage } from '../utils/formatNumber';

const CryptoTable = () => {
  const { coins, loading } = useContext(CryptoContext);

  return (
    <div className="w-full overflow-x-auto custom-scrollbar">
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-slate-400 text-xs uppercase tracking-widest">
            <th className="px-6 py-4 text-left font-bold">#</th>
            <th className="px-6 py-4 text-left font-bold">Coin Asset</th>
            <th className="px-6 py-4 text-right font-bold">Price</th>
            <th className="px-6 py-4 text-right font-bold">24h Change</th>
            <th className="px-6 py-4 text-right hidden md:table-cell font-bold">Market Cap</th>
            <th className="px-6 py-4 text-center font-bold">Action</th>
          </tr>
        </thead>
        
        <motion.tbody layout>
          <AnimatePresence>
            {coins.map((coin, index) => (
              <motion.tr
                key={coin.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                className="group bg-white/40 backdrop-blur-sm shadow-sm rounded-2xl cursor-pointer transition-all border border-white/20"
              >
                {/* Rank */}
                <td className="px-6 py-5 first:rounded-l-2xl text-sm font-bold text-slate-400">
                  {index + 1}
                </td>

                {/* Coin Name & Symbol */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <img src={coin.image} alt="" className="w-8 h-8 rounded-full shadow-inner" />
                    <div>
                      <p className="font-black text-slate-800 leading-none">{coin.symbol.toUpperCase()}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-tight">{coin.name}</p>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="px-6 py-5 text-right font-mono font-bold text-slate-700">
                  {formatCurrency(coin.current_price)}
                </td>

                {/* 24h Change with Badge style */}
                <td className="px-6 py-5 text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-black ${
                    coin.price_change_percentage_24h >= 0 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : 'bg-rose-100 text-rose-600'
                  }`}>
                    {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'} 
                    {formatPercentage(Math.abs(coin.price_change_percentage_24h))}
                  </span>
                </td>

                {/* Market Cap (Hidden on Mobile) */}
                <td className="px-6 py-5 text-right hidden md:table-cell text-sm font-semibold text-slate-500">
                  {formatCurrency(coin.market_cap).slice(0, -3)}
                </td>

                {/* Action Buttons */}
                <td className="px-6 py-5 last:rounded-r-2xl text-center">
                  <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-xl transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </button>
                    <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-xl transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </motion.tbody>
      </table>
    </div>
  );
};

export default CryptoTable;