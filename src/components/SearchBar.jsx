import React, { useState, useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CryptoContext } from '../context/CryptoContext';
import useDebounce from '../hooks/useDebounce';
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const { search, setSearch } = useContext(CryptoContext);
  const [localSearch, setLocalSearch] = useState(search);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const debouncedSearch = useDebounce(localSearch, 300);

  // Sync debounce with Global Context
  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  // Keyboard shortcut (CMD/CTRL + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative group flex items-center">
      <motion.div
        animate={{
          width: isFocused ? '280px' : '220px',
          scale: isFocused ? 1.02 : 1,
        }}
        className={`relative flex items-center transition-all duration-500 ease-out
          bg-white/40 backdrop-blur-2xl border border-white/60 rounded-2xl
          ${isFocused ? 'shadow-[0_0_25px_rgba(79,70,229,0.15)] border-indigo-400' : 'shadow-sm'}
        `}
      >
        {/* Futuristic Search Icon */}
        <div className="pl-4 text-slate-400">
          <motion.div
            animate={{ rotate: isFocused ? 90 : 0, color: isFocused ? '#4f46e5' : '#94a3b8' }}
          >
            <FaSearch className="text-sm" />
          </motion.div>
        </div>

        {/* The Input */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Neural Search..."
          value={localSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full bg-transparent px-3 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
        />

        {/* 2050 Shortcut Badge */}
        <AnimatePresence>
          {!isFocused && (
            <motion.div
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              className="absolute right-3 flex items-center gap-1 bg-slate-100/80 px-1.5 py-0.5 rounded-md border border-slate-200 text-[10px] text-slate-400 font-bold"
            >
              <FaSearch className="text-[8px]" />
              <span>K</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Focus Border (Bottom) */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isFocused ? '80%' : '0%' }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
        />
      </motion.div>

      {/* Loading Pulse (Optional: only shows when debouncing) */}
      {localSearch !== debouncedSearch && (
        <motion.div 
          layoutId="loader"
          className="absolute -right-2 top-0 w-2 h-2 bg-indigo-500 rounded-full animate-ping"
        />
      )}
    </div>
  );
};

export default SearchBar;