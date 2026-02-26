import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CryptoContext } from '../context/CryptoContext';

// Components
import Navbar from '../components/Navbar';
import TopGainers from '../components/TopGainers';
import CryptoTable from '../components/CryptoTable';
import AdvancedFilters from '../components/AdvancedFilters';
import Portfolio from '../components/Portfolio';
import Alerts from '../components/Alerts';

const Home = () => {
  const { selectedCoin } = useContext(CryptoContext);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      <Navbar />

      <main className="container mx-auto px-4 lg:px-8 py-6 max-w-[1400px]">
        
        
        <section className="mb-10 pt-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-end gap-6"
          >
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">
                Market <span className="text-indigo-600">Pulse</span>
              </h2>
              <p className="text-slate-500 font-medium">Global crypto assets in neural-time tracking.</p>
            </div>

            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowPortfolio(true)}
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                💼 My Portfolio
              </button>
              <button 
                onClick={() => setShowAlerts(true)}
                className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all"
              >
                🔔 Smart Alerts
              </button>
            </div>
          </motion.div>
        </section>

        
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
           
            <div className="xl:col-span-1 space-y-6">
               <div className="bg-white/70 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                    Neural Filters
                  </h3>
                  <AdvancedFilters />
               </div>
            </div>

           
            <div className="xl:col-span-3">
              <TopGainers />
            </div>
          </div>
        </motion.section>

       
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6 px-4">
            <h3 className="text-xl font-black text-slate-800">Global Assets</h3>
            <div className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter">
              Live updates every 30s
            </div>
          </div>
          
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)] p-2">
            <CryptoTable />
          </div>
        </section>

      </main>

     
      <AnimatePresence>
        {showPortfolio && <Portfolio onClose={() => setShowPortfolio(false)} />}
        {showAlerts && <Alerts onClose={() => setShowAlerts(false)} />}
      </AnimatePresence>

     
      <AnimatePresence>
        {selectedCoin && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50"
          >
            <div className="bg-white/90 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-2xl border border-white">
              
               <div className="flex justify-between mb-4">
                  <h4 className="font-black">Market Analytics: {selectedCoin.toUpperCase()}</h4>
                  <button className="text-slate-400 font-bold">Close X</button>
               </div>
               <div className="h-48 bg-slate-50 rounded-2xl flex items-center justify-center border-dashed border-2 border-slate-200">
                  <p className="text-slate-400 text-sm">Neural Chart Loading...</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;