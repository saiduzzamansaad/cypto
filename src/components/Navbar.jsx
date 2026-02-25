import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CryptoContext } from '../context/CryptoContext';
import SearchBar from './SearchBar';
import CurrencySelector from './CurrencySelector';
import { FaStar, FaDownload, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { showWatchlistOnly, setShowWatchlistOnly, exportToCSV } = useContext(CryptoContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Sticky wrapper with padding to create the "floating" effect
    <nav className="sticky top-0 z-50 w-full px-4 py-3 pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="container mx-auto max-w-7xl pointer-events-auto"
      >
        <div className="bg-white/70 backdrop-blur-lg border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2rem] px-6 py-3">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <motion.h1 
              whileHover={{ scale: 1.05 }}
              className="text-xl sm:text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
            >
              CryptoVision
            </motion.h1>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <SearchBar />
              <div className="h-6 w-[1px] bg-slate-200 mx-2" />
              <CurrencySelector />
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
                className={`p-3 rounded-2xl transition-all ${
                  showWatchlistOnly 
                  ? 'bg-yellow-400 text-white shadow-lg shadow-yellow-200' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                <FaStar />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={exportToCSV}
                className="p-3 rounded-2xl bg-slate-800 text-white hover:bg-slate-900 shadow-md"
              >
                <FaDownload />
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 text-xl"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Mobile Expandable Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden md:hidden"
              >
                <div className="pt-4 pb-2 space-y-4 flex flex-col items-center border-t border-slate-100 mt-3">
                  <div className="w-full"><SearchBar /></div>
                  <div className="flex justify-between w-full items-center px-2">
                    <CurrencySelector />
                    <div className="flex gap-2">
                      <button 
                         onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
                         className={`p-4 rounded-2xl ${showWatchlistOnly ? 'bg-yellow-400 text-white' : 'bg-slate-100'}`}
                      >
                        <FaStar />
                      </button>
                      <button 
                        onClick={exportToCSV}
                        className="p-4 rounded-2xl bg-slate-800 text-white"
                      >
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;