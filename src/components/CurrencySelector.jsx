import React, { useState, useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';

const CurrencySelector = () => {
  const { currency, setCurrency } = useContext(CryptoContext);
  const [isOpen, setIsOpen] = useState(false);

  const currencies = [
    { code: 'usd', symbol: '$', label: 'USD' },
    { code: 'eur', symbol: '€', label: 'EUR' },
    { code: 'gbp', symbol: '£', label: 'GBP' },
  ];

  const activeCurrency = currencies.find((c) => c.code === currency);

  return (
    <div className="relative inline-block text-left">
      {/* Main Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm rounded-2xl hover:bg-white/60 transition-all duration-300 active:scale-95"
      >
        <span className="flex items-center justify-center w-6 h-6 bg-indigo-600 text-white text-[10px] font-bold rounded-full shadow-indigo-200 shadow-lg">
          {activeCurrency?.symbol}
        </span>
        <span className="text-sm font-bold text-slate-800 uppercase tracking-tight">
          {activeCurrency?.code}
        </span>
        {/* Simple CSS Chevron */}
        <div className={`w-2 h-2 border-b-2 border-r-2 border-slate-400 transition-transform duration-300 transform ${isOpen ? 'rotate-[-135deg] translate-y-0.5' : 'rotate-45 -translate-y-0.5'}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay to close when clicking outside without extra hooks */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 mt-3 w-32 origin-top-right z-20 overflow-hidden bg-white/80 backdrop-blur-xl border border-white/40 rounded-[1.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in duration-200">
            <div className="py-1">
              {currencies.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrency(c.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 text-sm font-bold transition-colors
                    ${currency === c.code 
                      ? 'bg-indigo-600/10 text-indigo-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  <span className="mr-3 opacity-50">{c.symbol}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencySelector;