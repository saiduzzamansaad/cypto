import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CryptoContext } from '../context/CryptoContext';
import { formatPercentage, formatCurrency } from '../utils/formatNumber';

const TopGainers = () => {
  const { topGainers, topLosers, loading } = useContext(CryptoContext);

  const renderCoinList = (coins, title, isGainer) => (
    <div className="flex flex-col w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between px-2 mb-4">
        <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
          {title}
        </h3>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          isGainer ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
        }`}>
          24H STATS
        </span>
      </div>

      {/* Card Container */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2 sm:p-4">
        <motion.div layout className="flex flex-col gap-1">
          <AnimatePresence mode='popLayout'>
            {coins.map((coin, index) => (
              <motion.div
                layout // This makes the item slide smoothly if the rank changes
                key={coin.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }} // Mobile haptic feel
                className="flex items-center justify-between p-3 sm:p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
              >
                {/* Left Side: Identity */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-300 w-4">{index + 1}</span>
                  <div className="relative">
                    <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full shadow-sm" />
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      isGainer ? 'bg-emerald-500' : 'bg-rose-500'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-none">{coin.symbol.toUpperCase()}</h4>
                    <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">{coin.name}</p>
                  </div>
                </div>

                {/* Right Side: Data & Trend */}
                <div className="flex items-center gap-4">
                  {/* Decorative Mini-Trend Line (Visual Only) */}
                  <div className="hidden sm:flex items-end gap-[2px] h-6">
                    {[4, 7, 5, 9, 6].map((h, i) => (
                      <div 
                        key={i} 
                        className={`w-1 rounded-full ${isGainer ? 'bg-emerald-200' : 'bg-rose-200'}`} 
                        style={{ height: `${h * (i + 1)}%` }} 
                      />
                    ))}
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{formatCurrency(coin.current_price)}</p>
                    <p className={`text-xs font-heavy flex items-center justify-end ${
                      isGainer ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {isGainer ? '▲' : '▼'} {formatPercentage(coin.price_change_percentage_24h)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Responsive Grid: 1 col on mobile, 2 cols on tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {renderCoinList(topGainers, "Market Leaders 🚀", true)}
        {renderCoinList(topLosers, "Top Decliners 📉", false)}
      </div>
    </section>
  );
};

export default TopGainers;