import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import TopGainers from '../components/TopGainers';
import CryptoTable from '../components/CryptoTable';
import Pagination from '../components/Pagination';
import ChartSection from '../components/ChartSection';
import SortDropdown from '../components/SortDropdown';
import AdvancedFilters from '../components/AdvancedFilters';
import Portfolio from '../components/Portfolio';
import Alerts from '../components/Alerts';
import { CryptoContext } from '../context/CryptoContext';

const Home = () => {
  const { selectedCoin } = useContext(CryptoContext);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Cryptocurrency Market</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowPortfolio(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Portfolio
            </button>
            <button
              onClick={() => setShowAlerts(true)}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              Alerts
            </button>
            <SortDropdown />
          </div>
        </div>

        <TopGainers />
        <AdvancedFilters />
        <CryptoTable />
        <Pagination />

        {selectedCoin && (
          <div className="mt-8">
            <ChartSection />
          </div>
        )}
      </main>

      {showPortfolio && <Portfolio onClose={() => setShowPortfolio(false)} />}
      {showAlerts && <Alerts onClose={() => setShowAlerts(false)} />}
    </div>
  );
};

export default Home;