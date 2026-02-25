import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import Home from './pages/Home';
import CoinDetails from './pages/CoinDetails';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </Router>
    </CryptoProvider>
  );
}

export default App;