
import { Provider } from 'react-redux';
import { store } from '@/store';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-crypto-bg">
        <Dashboard />
      </div>
    </Provider>
  );
};

export default Index;
