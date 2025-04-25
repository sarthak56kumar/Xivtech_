
import { useEffect } from 'react';
import CryptoTable from './CryptoTable';
import Header from './Header';
import { cryptoWebSocketSimulator } from '@/services/cryptoWebSocketSimulator';

const Dashboard = () => {
  useEffect(() => {
    
    cryptoWebSocketSimulator.connect();
    
  
    return () => {
      cryptoWebSocketSimulator.disconnect();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <Header />
      <div className="mt-8 bg-gray-800 bg-opacity-40 rounded-lg p-4 shadow-lg">
        <CryptoTable />
      </div>
      <footer className="mt-8 text-center text-crypto-muted text-sm pb-8">
        <p>Data updates automatically every 2 seconds</p>
        <p className="mt-2">© 2025 Crypto Flow Dashboard</p>
      </footer>
    </div>
  );
};

export default Dashboard;
