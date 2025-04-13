"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AssetSidebar from '@/components/AssetSidebar'; // AssetSidebar importieren
import Footer from '@/components/Footer';
import { Line } from 'react-chartjs-2';
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
import { useTheme } from '@/context/ThemeContext'; // Theme-Hook importieren

// Registrieren der benötigten Chart.js Komponenten
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Depot() {
  const router = useRouter();
  const [activeTimeframe, setActiveTimeframe] = useState('1m');
  const [activePortfolioTab, setActivePortfolioTab] = useState('gesamt');
  const { darkMode } = useTheme(); // Dark Mode-Status abrufen

  // Assets für die Sidebar definieren
  const allAssets = {
    bitcoin: {
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 50000.00,
      change24h: 2.5,
      assetType: 'crypto' as 'crypto',
      marketCap: '950B',
      volume: '32B'
    },
    ethereum: {
      name: 'Ethereum',
      symbol: 'ETH',
      price: 1800.00,
      change24h: -1.2,
      assetType: 'crypto' as 'crypto',
      marketCap: '225B',
      volume: '15B'
    },
    cardano: {
      name: 'Cardano',
      symbol: 'ADA',
      price: 1.20,
      change24h: 4.2,
      assetType: 'crypto' as 'crypto',
      marketCap: '38B',
      volume: '1.5B'
    },
    ripple: {
      name: 'Ripple',
      symbol: 'XRP',
      price: 0.85,
      change24h: -2.4,
      assetType: 'crypto' as 'crypto',
      marketCap: '42B',
      volume: '2.8B'
    },
    aapl: {
      name: 'Apple Inc.',
      symbol: 'AAPL',
      price: 182.66,
      change24h: 1.3,
      assetType: 'stock' as 'stock',
      marketCap: '2.9T',
      sector: 'Technology'
    },
    tsla: {
      name: 'Tesla, Inc.',
      symbol: 'TSLA',
      price: 260.52,
      change24h: -2.1,
      assetType: 'stock' as 'stock',
      marketCap: '827B',
      sector: 'Automotive'
    },
    msft: {
      name: 'Microsoft Corp.',
      symbol: 'MSFT',
      price: 334.15,
      change24h: 1.7,
      assetType: 'stock' as 'stock',
      marketCap: '2.5T',
      sector: 'Technology'
    },
    nvda: {
      name: 'NVIDIA Corp.',
      symbol: 'NVDA',
      price: 840.25,
      change24h: 2.1,
      assetType: 'stock' as 'stock',
      marketCap: '2.1T',
      sector: 'Technology'
    }
  };

  const portfolioData = {
    gesamt: {
      totalValue: 10780,
      '1w': {
        change: 2.3,
        labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
        data: [10000, 10050, 10200, 10120, 10230],
      },
      '1m': {
        change: 4.8,
        labels: Array.from({ length: 30 }, (_, i) => `${i+1}`),
        data: [
          10000, 10035, 10110, 10095, 10150, 10220, 10180, 10250, 10290, 10275,
          10310, 10290, 10350, 10420, 10395, 10450, 10510, 10490, 10530, 10590,
          10550, 10590, 10650, 10630, 10670, 10710, 10690, 10730, 10770, 10780, 
        ],
      },
      '3m': {
        change: 8.2,
        labels: Array.from({ length: 12 }, (_, i) => `W${i+1}`),
        data: [
          10000, 10120, 10250, 10190, 10320, 10410, 10380, 10560, 10640, 10590, 10730, 10820
        ],
      },
    },
    krypto: {
      totalValue: 5830,
      '1w': {
        change: 3.1,
        labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
        data: [5500, 5580, 5650, 5600, 5680],
      },
      '1m': {
        change: 6.0,
        labels: Array.from({ length: 30 }, (_, i) => `${i+1}`),
        data: [
          5500, 5520, 5570, 5550, 5590, 5640, 5610, 5660, 5680, 5670,
          5690, 5680, 5710, 5750, 5730, 5760, 5790, 5780, 5810, 5830,
          5810, 5820, 5840, 5830, 5850, 5870, 5860, 5880, 5900, 5830,
        ],
      },
      '3m': {
        change: 10.5,
        labels: Array.from({ length: 12 }, (_, i) => `W${i+1}`),
        data: [
          5300, 5370, 5420, 5390, 5450, 5490, 5470, 5560, 5600, 5580, 5680, 5830
        ],
      },
    },
    aktien: {
      totalValue: 4950,
      '1w': {
        change: 1.4,
        labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
        data: [4800, 4830, 4870, 4850, 4880],
      },
      '1m': {
        change: 3.1,
        labels: Array.from({ length: 30 }, (_, i) => `${i+1}`),
        data: [
          4800, 4815, 4840, 4830, 4855, 4875, 4860, 4885, 4900, 4890,
          4910, 4900, 4920, 4935, 4925, 4940, 4955, 4945, 4960, 4980,
          4970, 4985, 5000, 4990, 5005, 5020, 5010, 5025, 5040, 4950,
        ],
      },
      '3m': {
        change: 5.3,
        labels: Array.from({ length: 12 }, (_, i) => `W${i+1}`),
        data: [
          4700, 4750, 4800, 4780, 4830, 4860, 4840, 4890, 4920, 4900, 4940, 4950
        ],
      },
    }
  };
  
  type TimeframeKey = '1w' | '1m' | '3m';
  const currentPortfolioData = portfolioData[activePortfolioTab as keyof typeof portfolioData];
  const currentPerformance = currentPortfolioData[activeTimeframe as TimeframeKey];
  
  const allPositions = [
    {
      id: 'bitcoin-long',
      asset: 'Bitcoin',
      symbol: 'BTC',
      type: 'long',
      openPrice: 45320,
      currentPrice: 50000,
      pnl: 10.33,
      date: '05.03.2025',
      amount: '$3,500.00',
      assetType: 'krypto',
    },
    {
      id: 'ethereum-long',
      asset: 'Ethereum',
      symbol: 'ETH',
      type: 'long',
      openPrice: 1700.80,
      currentPrice: 1800.00,
      pnl: 5.83,
      date: '01.04.2025',
      amount: '$2,330.00',
      assetType: 'krypto',
    },
    {
      id: 'tesla-short',
      asset: 'Tesla',
      symbol: 'TSLA',
      type: 'short',
      openPrice: 280.50,
      currentPrice: 260.50,
      pnl: 7.13,
      date: '23.03.2025',
      amount: '$2,800.00',
      assetType: 'aktien',
    },
    {
      id: 'apple-long',
      asset: 'Apple',
      symbol: 'AAPL',
      type: 'long',
      openPrice: 175.20,
      currentPrice: 182.60,
      pnl: 4.22,
      date: '15.03.2025',
      amount: '$2,150.00',
      assetType: 'aktien',
    },
  ];
  
  const filteredPositions = activePortfolioTab === 'gesamt' 
    ? allPositions 
    : allPositions.filter(position => position.assetType === activePortfolioTab);
  
  const recommendations = [
    {
      id: 'crypto-1',
      asset: 'Cardano',
      symbol: 'ADA',
      price: 1.20,
      change: 4.2,
      action: 'long',
      reliability: 87,
      assetType: 'krypto',
    },
    {
      id: 'stock-1',
      asset: 'NVIDIA',
      symbol: 'NVDA',
      price: 840.25,
      change: 2.1,
      action: 'long',
      reliability: 83,
      assetType: 'aktien',
    },
    {
      id: 'crypto-2',
      asset: 'Ripple',
      symbol: 'XRP',
      price: 0.85,
      change: -2.4,
      action: 'short',
      reliability: 79,
      assetType: 'krypto',
    },
    {
      id: 'stock-2',
      asset: 'Microsoft',
      symbol: 'MSFT',
      price: 334.15,
      change: 1.7,
      action: 'long',
      reliability: 81,
      assetType: 'aktien',
    },
  ];
  
  const filteredRecommendations = activePortfolioTab === 'gesamt' 
    ? recommendations 
    : recommendations.filter(rec => rec.assetType === activePortfolioTab);
  
  return (
    <main className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <Navbar username="John Doe" />
      
      {/* AssetSidebar hinzufügen */}
      <AssetSidebar 
        assets={allAssets} 
        activeAssetId="" // Kein aktives Asset auf der Depot-Seite
      />
      
      {/* Hauptcontainer mit Abstand zur Sidebar auf Desktop */}
      <div className="ml-0 md:ml-64 flex-grow w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
              <div>
                <h1 className="text-4xl font-serif mb-2">Mein Portfolio</h1>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-light transition-colors duration-300`}>
                  Dashboard mit allen Aktivitäten und Kennzahlen
                </p>
              </div>
              <div>
                <div className="text-lg text-right">
                  <span className="text-3xl font-serif">${currentPortfolioData.totalValue.toLocaleString()}</span>
                  <span className={`ml-2 text-sm ${currentPerformance.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {currentPerformance.change >= 0 ? '+' : ''}{currentPerformance.change}%
                  </span>
                </div>
                <p className="text-right text-sm text-gray-500 font-light">
                  {activePortfolioTab === 'gesamt' ? 'Gesamtwert' : 
                   activePortfolioTab === 'krypto' ? 'Krypto-Wert' : 'Aktien-Wert'}
                </p>
              </div>
            </div>
          </div>
          
          <div className={`mb-8 border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'} transition-colors duration-300`}>
            <div className="flex space-x-8">
              <button
                onClick={() => setActivePortfolioTab('gesamt')}
                className={`pb-4 text-sm font-light ${
                  activePortfolioTab === 'gesamt' 
                    ? 'border-b border-red-500 text-red-500' 
                    : darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Gesamt
              </button>
              <button
                onClick={() => setActivePortfolioTab('krypto')}
                className={`pb-4 text-sm font-light ${
                  activePortfolioTab === 'krypto' 
                    ? 'border-b border-red-500 text-red-500' 
                    : darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Krypto
              </button>
              <button
                onClick={() => setActivePortfolioTab('aktien')}
                className={`pb-4 text-sm font-light ${
                  activePortfolioTab === 'aktien' 
                    ? 'border-b border-red-500 text-red-500' 
                    : darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Aktien
              </button>
            </div>
          </div>
          
          <div className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="text-2xl font-serif">Performance</h2>
              
              <div className="flex mt-4 md:mt-0 space-x-4">
                <button 
                  onClick={() => setActiveTimeframe('1w')} 
                  className={`text-sm ${activeTimeframe === '1w' ? 'text-red-500 border-b border-red-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} pb-1`}
                >
                  1W
                </button>
                <button 
                  onClick={() => setActiveTimeframe('1m')} 
                  className={`text-sm ${activeTimeframe === '1m' ? 'text-red-500 border-b border-red-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} pb-1`}
                >
                  1M
                </button>
                <button 
                  onClick={() => setActiveTimeframe('3m')} 
                  className={`text-sm ${activeTimeframe === '3m' ? 'text-red-500 border-b border-red-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} pb-1`}
                >
                  3M
                </button>
              </div>
            </div>
            
            <div className="chart-container mb-8">
              <div style={{ height: "300px" }}>
                <Line 
                  data={{
                    labels: currentPerformance.labels,
                    datasets: [
                      {
                        label: 'Portfolio Wert',
                        data: currentPerformance.data,
                        borderColor: '#c81e1e',
                        backgroundColor: 'rgba(200, 30, 30, 0.1)',
                        tension: 0.4,
                        fill: true,
                      }
                    ]
                  }} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        backgroundColor: darkMode ? '#333' : 'white',
                        titleColor: darkMode ? '#fff' : '#1a1a1a',
                        bodyColor: darkMode ? '#ddd' : '#555555',
                        borderColor: darkMode ? '#555' : '#e5e5e5',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                          label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                              label += ': ';
                            }
                            if (context.parsed.y !== null) {
                              label += new Intl.NumberFormat('de-DE', { 
                                style: 'currency', 
                                currency: 'USD' 
                              }).format(context.parsed.y);
                            }
                            return label;
                          }
                        }
                      }
                    },
                    scales: {
                      x: {
                        grid: { color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.03)' },
                        ticks: { 
                          color: darkMode ? '#aaa' : '#888',
                          font: { family: "'Inter', sans-serif", size: 10 }
                        },
                      },
                      y: {
                        grid: { color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.03)' },
                        ticks: {
                          color: darkMode ? '#aaa' : '#888',
                          font: { family: "'Inter', sans-serif", size: 10 },
                          callback: function(value) {
                            return '$' + value.toLocaleString();
                          }
                        },
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-serif mb-8">
              {activePortfolioTab === 'gesamt' ? 'Aktive Positionen' : 
               activePortfolioTab === 'krypto' ? 'Krypto-Positionen' : 'Aktien-Positionen'}
            </h2>
            
            {filteredPositions.length > 0 ? (
              <div className="overflow-auto mb-6">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                      <th className={`py-3 text-left font-serif font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Asset</th>
                      <th className={`py-3 text-left font-serif font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Position</th>
                      <th className={`py-3 text-right font-serif font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Einkauf</th>
                      <th className={`py-3 text-right font-serif font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Aktuell</th>
                      <th className={`py-3 text-right font-serif font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>P&L</th>
                      <th className={`py-3 text-right font-serif font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Datum</th>
                      <th className={`py-3 text-right font-serif font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Betrag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPositions.map((position) => (
                      <tr 
                        key={position.id}
                        className={`border-b ${darkMode ? 'border-gray-800 hover:bg-gray-800' : 'border-gray-50 hover:bg-gray-50'} cursor-pointer`}
                        onClick={() => router.push(`/chart/${position.symbol.toLowerCase()}`)}
                      >
                        <td className="py-4">
                          <div className="flex items-start">
                            <div>
                              <div className="font-serif">{position.asset}</div>
                              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{position.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 text-xs ${position.type === 'long' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {position.type}
                          </span>
                        </td>
                        <td className="py-4 text-right font-light">
                          ${position.openPrice.toLocaleString()}
                        </td>
                        <td className="py-4 text-right font-light">
                          ${position.currentPrice.toLocaleString()}
                        </td>
                        <td className="py-4 text-right">
                          <span className={position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {position.pnl >= 0 ? '+' : ''}{position.pnl}%
                          </span>
                        </td>
                        <td className="py-4 text-right font-light">
                          {position.date}
                        </td>
                        <td className="py-4 text-right font-light">
                          {position.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-light`}>
                Keine aktiven Positionen in dieser Kategorie.
              </p>
            )}
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-serif mb-8">
              {activePortfolioTab === 'gesamt' ? 'Empfehlungen' : 
               activePortfolioTab === 'krypto' ? 'Krypto-Empfehlungen' : 'Aktien-Empfehlungen'}
            </h2>
            
            {filteredRecommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredRecommendations.map((rec) => (
                  <div 
                    key={rec.id} 
                    className={`border-t ${darkMode ? 'border-gray-800 hover:border-red-400' : 'border-gray-100 hover:border-red-400'} pt-6 cursor-pointer transition-colors`}
                    onClick={() => router.push(`/chart/${rec.id}`)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <h3 className="text-xl font-serif">{rec.asset}</h3>
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{rec.symbol}</span>
                        </div>
                      </div>
                      <div>
                        <span className={`px-2 py-1 text-xs ${rec.action === 'long' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {rec.action}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg">${rec.price.toLocaleString()}</div>
                        <div className={`text-xs ${rec.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {rec.change >= 0 ? '+' : ''}{rec.change}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Verlässlichkeit</div>
                        <div className="text-sm font-medium">{rec.reliability}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-light`}>
                Keine Empfehlungen in dieser Kategorie.
              </p>
            )}
          </div>
        </div>
      </div>
      
      <Footer compact={true} />
    </main>
  );
}
