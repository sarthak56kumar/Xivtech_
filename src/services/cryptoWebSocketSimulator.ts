
import { updateCryptoData, setError } from '../store/cryptoSlice';
import { store } from '../store';

export class CryptoWebSocketSimulator {
  private intervalId: number | null = null;
  private updateFrequency: number = 2000; // 2 seconds

  constructor(updateFrequency?: number) {
    if (updateFrequency) {
      this.updateFrequency = updateFrequency;
    }
  }

  connect(): void {
    console.log('Connecting to simulated crypto WebSocket...');
    
    // Clear any existing interval
    if (this.intervalId !== null) {
      this.disconnect();
    }
    
    // Set up interval to simulate WebSocket updates
    this.intervalId = window.setInterval(() => {
      try {
        store.dispatch(updateCryptoData());
      } catch (error) {
        console.error('Error updating crypto data:', error);
        store.dispatch(setError('Failed to update crypto data'));
      }
    }, this.updateFrequency);
    
    console.log('Connected to simulated crypto WebSocket');
  }

  disconnect(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Disconnected from simulated crypto WebSocket');
    }
  }

  setUpdateFrequency(ms: number): void {
    this.updateFrequency = ms;
    if (this.intervalId !== null) {
      // Reconnect with new frequency
      this.disconnect();
      this.connect();
    }
  }
}

// Create singleton instance
export const cryptoWebSocketSimulator = new CryptoWebSocketSimulator();
