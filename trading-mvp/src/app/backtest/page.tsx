"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import Navbar from '@/components/Navbar';
import CryptoSidebar from '@/components/CryptoSidebar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Chart.js Setup
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function BacktestPage() {
  const router = useRouter();
  
  // Tab States
  const [performanceTab, setPerformanceTab] = useState('crypto'); // 'crypto' oder 'stocks'
  const [positionsTab, setPositionsTab] = useState('crypto'); // 'crypto' oder 'stocks'
  const [showConfig, setShowConfig] = useState(false); // Konfiguration versteckt standardmäßig
  
  // Config States
  const [selectedAsset, setSelectedAsset] = useState('bitcoin');
  const [startDate, setStartDate] = useState('2022-01-01');
  const [endDate, setEndDate] = useState('2023-01-01');
  const [strategy, setStrategy] = useState('movingAverage');
  const [initialCapital, setInitialCapital] = useState(10000);
  const [longOpenSignal, setLongOpenSignal] = useState('macd_cross_above');
  const [longCloseSignal, setLongCloseSignal] = useState('macd_cross_below');
  const [shortOpenSignal, setShortOpenSignal] = useState('macd_cross_below');
  const [shortCloseSignal, setShortCloseSignal] = useState('macd_cross_above');
  const [maPeriod, setMaPeriod] = useState(14);
  const [rsiPeriod, setRsiPeriod] = useState(14);
  const [lotSize, setLotSize] = useState(1);
  
  // Beispieldaten für Assets
  const assets = {
    bitcoin: { name: 'Bitcoin', symbol: 'BTC', price: 50000, change24h: 2.5 },
    ethereum: { name: 'Ethereum', symbol: 'ETH', price: 1800, change24h: -1.2 },
    apple: { name: 'Apple Inc.', symbol: 'AAPL', price: 180.95, change24h: 0.8 },
    tesla: { name: 'Tesla', symbol: 'TSLA', price: 260.50, change24h: 3.9 },
  };
  
  // Für die Sidebar benötigte Daten
  const cryptoData = Object.entries(assets).reduce((acc, [id, asset]) => {
    acc[id] = { 
      name: asset.name, 
      symbol: asset.symbol, 
      price: asset.price, 
      change24h: asset.change24h,
      marketCap: 'N/A',
      volume: 'N/A'
    };
    return acc;
  }, {});

  // Performance-Metriken
  const metrics = {
    crypto: {
      totalReturn: 42.8,
      annualReturn: 32.5,
      maxDrawdown: -18.7,
      sharpeRatio: 1.65,
      winRate: 68.2,
      profitFactor: 2.4,
      totalTrades: 38
    },
    stocks: {
      totalReturn: 23.5,
      annualReturn: 18.2,
      maxDrawdown: -12.3,
      sharpeRatio: 1.28,
      winRate: 62.5,
      profitFactor: 1.9,
      totalTrades: 42
    }
  };

  // Handelsverlauf
  const trades = {
    crypto: [
      { id: 1, date: '2022-02-15', asset: 'BTC', type: 'buy', signalType: 'long-open', trigger: 'MACD kreuzt nach oben', price: 44200, amount: 0.1, value: 4420, result: null },
      { id: 2, date: '2022-03-18', asset: 'BTC', type: 'sell', signalType: 'long-close', trigger: 'Take Profit (10%)', price: 42800, amount: 0.1, value: 4280, result: -140 },
      { id: 3, date: '2022-04-10', asset: 'ETH', type: 'buy', signalType: 'long-open', trigger: 'RSI überkauft', price: 3100, amount: 1.6, value: 4960, result: null },
      { id: 4, date: '2022-05-22', asset: 'ETH', type: 'sell', signalType: 'long-close', trigger: 'MACD kreuzt nach unten', price: 2700, amount: 1.6, value: 4320, result: -640 },
      { id: 5, date: '2022-06-30', asset: 'BTC', type: 'buy', signalType: 'long-open', trigger: 'MA kreuzt nach oben', price: 38700, amount: 0.15, value: 5805, result: null },
      { id: 6, date: '2022-08-14', asset: 'BTC', type: 'sell', signalType: 'long-close', trigger: 'RSI überkauft', price: 49100, amount: 0.15, value: 7365, result: 1560 },
    ],
    stocks: [
      { id: 1, date: '2022-02-10', asset: 'AAPL', type: 'buy', signalType: 'long-open', trigger: 'MA kreuzt nach oben', price: 172.15, amount: 25, value: 4303.75, result: null },
      { id: 2, date: '2022-03-25', asset: 'AAPL', type: 'sell', signalType: 'long-close', trigger: 'Take Profit (8%)', price: 186.20, amount: 25, value: 4655, result: 351.25 },
      { id: 3, date: '2022-04-18', asset: 'TSLA', type: 'buy', signalType: 'long-open', trigger: 'MACD kreuzt nach oben', price: 280.35, amount: 15, value: 4205.25, result: null },
      { id: 4, date: '2022-05-30', asset: 'TSLA', type: 'sell', signalType: 'long-close', trigger: 'Stop Loss (5%)', price: 266.33, amount: 15, value: 3994.95, result: -210.3 },
      { id: 5, date: '2022-07-12', asset: 'MSFT', type: 'buy', signalType: 'long-open', trigger: 'RSI überkauft', price: 345.80, amount: 12, value: 4149.6, result: null },
      { id: 6, date: '2022-09-05', asset: 'MSFT', type: 'sell', signalType: 'long-close', trigger: 'MA kreuzt nach unten', price: 367.25, amount: 12, value: 4407, result: 257.4 },
    ]
  };

  // Chart-Daten
  const chartData = {
    crypto: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dez'],
      datasets: [
        {
          label: 'KI-Strategie',
          data: [10000, 10200, 9800, 11000, 12500, 12000, 14000, 15500, 14800, 16200, 16800, 17100],
          borderColor: 'rgba(147, 51, 234, 1)',
          backgroundColor: 'rgba(147, 51, 234, 0.2)',
          tension: 0.3,
        },
        {
          label: 'Krypto Index',
          data: [10000, 9800, 10200, 11500, 10800, 11200, 12500, 13800, 13200, 14500, 13800, 14200],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
        }
      ],
    },
    stocks: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dez'],
      datasets: [
        {
          label: 'KI-Strategie',
          data: [10000, 10300, 10500, 10200, 11000, 11600, 11400, 12200, 12800, 12500, 13100, 13500],
          borderColor: 'rgba(147, 51, 234, 1)',
          backgroundColor: 'rgba(147, 51, 234, 0.2)',
          tension: 0.3,
        },
        {
          label: 'S&P 500',
          data: [10000, 10100, 10300, 9900, 10500, 10800, 10600, 11200, 11300, 11100, 11800, 12000],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
        }
      ],
    }
  };

  return (
    <main className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white min-h-screen">
      <Navbar username="John Doe" />
      
      <div className="flex">
        {/* Sidebar für Konsistenz mit anderen Seiten */}
        <CryptoSidebar cryptoData={cryptoData} activeCryptoId={selectedAsset} />

        {/* Main Content */}
        <div className="w-full md:pl-64">
          <div className="px-6 py-12">
            {/* Blur Background Glow */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 opacity-20 rounded-full filter blur-3xl z-0 animate-pulse"></div>

            {/* Backtesting Header */}
            <div className="z-10 max-w-4xl mx-auto mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                  KI Backtesting Ergebnisse
                </span>
              </h2>
              <p className="text-gray-300 mb-2">
                Historische Performance unserer KI-gesteuerten Handelsstrategie
              </p>
              <button 
                onClick={() => setShowConfig(!showConfig)}
                className="mt-2 text-sm text-purple-400 hover:text-purple-300 flex items-center mx-auto"
              >
                {showConfig ? 'Konfiguration ausblenden' : 'Konfiguration anzeigen'} 
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${showConfig ? 'rotate-180' : ''}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Konfigurationsbereich (aufklappbar) */}
            {showConfig && (
              <div className="z-10 max-w-4xl mx-auto mb-10 bg-[#1e1e1e] border border-gray-700 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Konfiguration</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Asset</label>
                    <select 
                      value={selectedAsset}
                      onChange={(e) => setSelectedAsset(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
                      <option value="bitcoin">Bitcoin (BTC)</option>
                      <option value="ethereum">Ethereum (ETH)</option>
                      <option value="apple">Apple Inc. (AAPL)</option>
                      <option value="tesla">Tesla (TSLA)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Strategie</label>
                    <select 
                      value={strategy}
                      onChange={(e) => setStrategy(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
                      <option value="movingAverage">Moving Average Crossover</option>
                      <option value="rsi">RSI Strategie</option>
                      <option value="macd">MACD Strategie</option>
                      <option value="bollingerBands">Bollinger Bands</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Startdatum</label>
                    <input 
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Enddatum</label>
                    <input 
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Signale konfigurieren</label>
                  <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      {/* Long/Short Signale hier */}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Bereich */}
            <div className="z-10 max-w-6xl mx-auto mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Performance-Übersicht</h3>
                <div className="bg-gray-900 rounded-lg p-1">
                  <button 
                    className={`px-4 py-2 text-sm rounded-lg transition ${
                      performanceTab === 'crypto' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setPerformanceTab('crypto')}
                  >
                    Kryptowährungen
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm rounded-lg transition ${
                      performanceTab === 'stocks' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setPerformanceTab('stocks')}
                  >
                    Aktien
                  </button>
                </div>
              </div>
              
              {/* Performance Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-4 shadow-lg">
                  <h4 className="text-sm text-gray-300 mb-1">Gesamtrendite</h4>
                  <p className={`text-xl font-bold ${metrics[performanceTab].totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {metrics[performanceTab].totalReturn}%
                  </p>
                </div>
                
                <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-4 shadow-lg">
                  <h4 className="text-sm text-gray-300 mb-1">Max. Drawdown</h4>
                  <p className="text-xl font-bold text-red-500">{metrics[performanceTab].maxDrawdown}%</p>
                </div>
                
                <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-4 shadow-lg">
                  <h4 className="text-sm text-gray-300 mb-1">Sharpe Ratio</h4>
                  <p className="text-xl font-bold">{metrics[performanceTab].sharpeRatio}</p>
                </div>
                
                <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-4 shadow-lg">
                  <h4 className="text-sm text-gray-300 mb-1">Gewinnrate</h4>
                  <p className="text-xl font-bold">{metrics[performanceTab].winRate}%</p>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-6 shadow-lg mb-8">
                <h4 className="text-lg font-medium mb-4">Performance Chart</h4>
                <div style={{ height: "300px" }}>
                  <Line 
                    data={chartData[performanceTab]} 
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
            </div>
                
            {/* Handelshistorie Bereich */}
            <div className="z-10 max-w-6xl mx-auto mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Handelshistorie</h3>
                <div className="bg-gray-900 rounded-lg p-1">
                  <button 
                    className={`px-4 py-2 text-sm rounded-lg transition ${
                      positionsTab === 'crypto' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setPositionsTab('crypto')}
                  >
                    Kryptowährungen
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm rounded-lg transition ${
                      positionsTab === 'stocks' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setPositionsTab('stocks')}
                  >
                    Aktien
                  </button>
                </div>
              </div>

              <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-6 shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs uppercase bg-gray-700">
                      <tr>
                        <th className="px-6 py-3">Datum</th>
                        <th className="px-6 py-3">Asset</th>
                        <th className="px-6 py-3">Signal</th>
                        <th className="px-6 py-3">Trigger</th>
                        <th className="px-6 py-3">Preis</th>
                        <th className="px-6 py-3">Menge</th>
                        <th className="px-6 py-3">Wert</th>
                        <th className="px-6 py-3">P/L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trades[positionsTab].map(trade => (
                        <tr key={trade.id} className="border-b border-gray-700">
                          <td className="px-6 py-4">{trade.date}</td>
                          <td className="px-6 py-4">{trade.asset}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              trade.signalType === 'long-open' ? 'bg-green-900/40 text-green-400' : 
                              trade.signalType === 'long-close' ? 'bg-blue-900/40 text-blue-400' :
                              trade.signalType === 'short-open' ? 'bg-red-900/40 text-red-400' :
                              'bg-yellow-900/40 text-yellow-400'
                            }`}>
                              {trade.signalType === 'long-open' ? 'Long Open' : 
                              trade.signalType === 'long-close' ? 'Long Close' : 
                              trade.signalType === 'short-open' ? 'Short Open' : 'Short Close'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs text-gray-400">
                              {trade.trigger}
                            </span>
                          </td>
                          <td className="px-6 py-4">${trade.price.toLocaleString()}</td>
                          <td className="px-6 py-4">{trade.amount}</td>
                          <td className="px-6 py-4">${trade.value.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            {trade.result !== null ? (
                              <span className={trade.result >= 0 ? 'text-green-500' : 'text-red-500'}>
                                {trade.result >= 0 ? '+' : ''}{trade.result.toLocaleString()}$
                              </span>
                            ) : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}