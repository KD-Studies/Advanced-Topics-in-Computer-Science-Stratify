"use client";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import Navbar from '@/components/Navbar';
import CryptoSidebar from '@/components/CryptoSidebar'; // Importiere die Sidebar
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js Setup
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Depot = () => {
  const router = useRouter();
  const chartRef = useRef(null);

  // Statische Kryptowährungs-Daten
  const [cryptos] = useState([
    { name: 'Bitcoin', symbol: 'BTC', amount: 1.2, price: 50000 },
    { name: 'Ethereum', symbol: 'ETH', amount: 5.3, price: 1800 },
    { name: 'Litecoin', symbol: 'LTC', amount: 10.8, price: 250 },
  ]);

  // Statische Aktien-Daten
  const [stocks] = useState([
    { name: 'Apple', symbol: 'AAPL', amount: 5, price: 180 },
    { name: 'Microsoft', symbol: 'MSFT', amount: 3, price: 320 },
    { name: 'Amazon', symbol: 'AMZN', amount: 2, price: 165 },
  ]);

  // Für die Sidebar benötigte Daten
  const cryptoData = {
    bitcoin: { name: 'Bitcoin', symbol: 'BTC', price: 50000, change24h: 2.5, marketCap: '950B', volume: '32B' },
    ethereum: { name: 'Ethereum', symbol: 'ETH', price: 1800, change24h: -1.2, marketCap: '225B', volume: '15B' },
    litecoin: { name: 'Litecoin', symbol: 'LTC', price: 250, change24h: 0.8, marketCap: '15B', volume: '2B' },
    ripple: { name: 'Ripple', symbol: 'XRP', price: 0.85, change24h: 1.3, marketCap: '41B', volume: '3B' },
    cardano: { name: 'Cardano', symbol: 'ADA', price: 1.20, change24h: -0.5, marketCap: '38B', volume: '2.5B' },
    polkadot: { name: 'Polkadot', symbol: 'DOT', price: 15.30, change24h: 3.2, marketCap: '16B', volume: '1.2B' },
    solana: { name: 'Solana', symbol: 'SOL', price: 120.50, change24h: 5.1, marketCap: '45B', volume: '5B' },
    dogecoin: { name: 'Dogecoin', symbol: 'DOGE', price: 0.15, change24h: -2.7, marketCap: '20B', volume: '1.8B' },
  };

  // Gesamtwerte berechnen
  const totalCryptoValue = cryptos.reduce((acc, crypto) => acc + crypto.amount * crypto.price, 0);
  const totalStocksValue = stocks.reduce((acc, stock) => acc + stock.amount * stock.price, 0);
  const totalWealth = totalCryptoValue + totalStocksValue;

  // Chart-Daten für beide Vermögensklassen
  const [chartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Gesamt',
        data: [12000, 12800, 13400, 12200, 13100, 14500, 15200, 16100, 16800, 17500, 18200, totalWealth],
        borderColor: 'rgba(147, 51, 234, 1)', // Lila
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Krypto',
        data: [10000, 10400, 10800, 9600, 10200, 11000, 11500, 12000, 12500, 13000, 13500, totalCryptoValue],
        borderColor: 'rgba(56, 189, 248, 1)', // Blau
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Aktien',
        data: [2000, 2400, 2600, 2600, 2900, 3500, 3700, 4100, 4300, 4500, 4700, totalStocksValue],
        borderColor: 'rgba(74, 222, 128, 1)', // Grün
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        tension: 0.3,
      },
    ],
  });

  const [activeTab, setActiveTab] = useState('crypto'); // 'crypto' oder 'stocks'
  const [chartTab, setChartTab] = useState('all'); // 'all', 'crypto', oder 'stocks'

  return (
    <main className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white min-h-screen">
      <Navbar username="John Doe" />
      
      <div className="flex">
        {/* Sidebar hinzufügen */}
        <CryptoSidebar cryptoData={cryptoData} activeCryptoId="" />

        {/* Main Content - bestehender Inhalt mit angepasstem Layout */}
        <div className="w-full md:pl-64">
          <div className="px-6 py-12">
            {/* Blur Background Glow */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 opacity-20 rounded-full filter blur-3xl z-0 animate-pulse"></div>

            {/* Depot Overview */}
            <div className="z-10 max-w-4xl text-center mx-auto mb-24">
              <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                  Dein Depot
                </span>{' '}
                Überblick
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-10">
                Dein aktuelles Vermögen: <span className="font-semibold">{totalWealth.toFixed(2)} €</span>
              </p>
            </div>

            {/* Chart Section mit Tabs */}
            <div className="mb-10 z-10 max-w-6xl mx-auto">
              {/* Tab Navigation für Chart */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Vermögensentwicklung</h3>
                <div className="bg-gray-900 rounded-lg p-1">
                  <button 
                    className={`px-4 py-2 text-sm rounded-lg transition ${
                      chartTab === 'all' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setChartTab('all')}
                  >
                    Gesamt
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm rounded-lg transition ${
                      chartTab === 'crypto' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setChartTab('crypto')}
                  >
                    Krypto
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm rounded-lg transition ${
                      chartTab === 'stocks' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setChartTab('stocks')}
                  >
                    Aktien
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg" style={{ height: "300px" }}>
                <Line 
                  ref={chartRef} 
                  data={{
                    labels: chartData.labels,
                    datasets: chartTab === 'all' 
                      ? chartData.datasets 
                      : chartTab === 'crypto'
                        ? [chartData.datasets[1]] // Nur Krypto-Daten
                        : [chartData.datasets[2]] // Nur Aktien-Daten
                  }} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: false,
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                          color: '#888',
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                          color: '#888',
                        }
                      },
                    },
                    plugins: {
                      legend: {
                        display: chartTab === 'all',
                        position: 'top',
                        labels: {
                          color: '#fff',
                          font: {
                            size: 12
                          }
                        }
                      },
                      tooltip: {
                        backgroundColor: '#1e1e1e',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#444',
                        borderWidth: 1,
                      }
                    }
                  }} 
                />
              </div>
            </div>

            {/* Asset-Liste mit Tabs */}
            <div className="z-10 max-w-6xl mx-auto">
              {/* Tab Navigation */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Deine Anlagen</h3>
                <div className="bg-gray-900 rounded-lg p-1">
                  <button 
                    className={`px-4 py-2 text-sm rounded-lg transition ${
                      activeTab === 'crypto' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('crypto')}
                  >
                    Kryptowährungen
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm rounded-lg transition ${
                      activeTab === 'stocks' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('stocks')}
                  >
                    Aktien
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                {activeTab === 'crypto' ? (
                  <>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm text-gray-400">Gesamtwert: {totalCryptoValue.toFixed(2)} €</p>
                      <button className="text-xs text-purple-400 hover:text-purple-300">
                        Neue Krypto hinzufügen
                      </button>
                    </div>
                    <table className="w-full text-sm text-left text-gray-300">
                      <thead className="text-xs uppercase bg-gray-700">
                        <tr>
                          <th className="px-6 py-3">Krypto</th>
                          <th className="px-6 py-3">Menge</th>
                          <th className="px-6 py-3">Preis pro Einheit (€)</th>
                          <th className="px-6 py-3">Gesamtwert (€)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cryptos.map((crypto, idx) => (
                          <tr key={idx} className="border-b border-gray-700">
                            <td className="px-6 py-4">{crypto.name} ({crypto.symbol})</td>
                            <td className="px-6 py-4">{crypto.amount}</td>
                            <td className="px-6 py-4">{crypto.price.toFixed(2)}</td>
                            <td className="px-6 py-4">{(crypto.amount * crypto.price).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm text-gray-400">Gesamtwert: {totalStocksValue.toFixed(2)} €</p>
                      <button className="text-xs text-purple-400 hover:text-purple-300">
                        Neue Aktie hinzufügen
                      </button>
                    </div>
                    <table className="w-full text-sm text-left text-gray-300">
                      <thead className="text-xs uppercase bg-gray-700">
                        <tr>
                          <th className="px-6 py-3">Aktie</th>
                          <th className="px-6 py-3">Anzahl</th>
                          <th className="px-6 py-3">Kurs (€)</th>
                          <th className="px-6 py-3">Gesamtwert (€)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stocks.map((stock, idx) => (
                          <tr key={idx} className="border-b border-gray-700">
                            <td className="px-6 py-4">{stock.name} ({stock.symbol})</td>
                            <td className="px-6 py-4">{stock.amount}</td>
                            <td className="px-6 py-4">{stock.price.toFixed(2)}</td>
                            <td className="px-6 py-4">{(stock.amount * stock.price).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Depot;
