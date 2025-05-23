"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AssetSidebar from '@/components/AssetSidebar';
import Footer from '@/components/Footer';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@/context/ThemeContext'; // Theme-Hook importieren
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

// Chart.js Setup
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  TimeScale,
  annotationPlugin
);

// This function creates random numbers used in your chart
const randomGaussian = () => {
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

export default function CryptoChart({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { darkMode } = useTheme(); // Dark Mode-Status abrufen
  const [activeTab, setActiveTab] = useState('new');
  const [autoOpen, setAutoOpen] = useState(false);
  
  // Add state to track the current asset ID for chart data
  const [currentChartId, setCurrentChartId] = useState(id);
  
  // Define AssetData type to match the interface in AssetSidebar
  type AssetType = "crypto" | "stock";
  
  interface AssetData {
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    assetType: AssetType;
    marketCap: string;
    volume?: string;
    sector?: string;
  }
  
  // Add position interface
  interface Position {
    id: string;
    assetId: string;
    type: 'long' | 'short';
    openPrice: number;
    currentPrice: number;
    amount: number;
    leverage: number;
    openDate: string;
    pnl: number;
    pnlPercent: number;
  }
  
  // Sample active positions
  const [activePositions] = useState<Position[]>([
    {
      id: 'pos1',
      assetId: 'bitcoin',
      type: 'long',
      openPrice: 48500,
      currentPrice: 50000,
      amount: 0.1,
      leverage: 5,
      openDate: '2025-04-10',
      pnl: 750,
      pnlPercent: 3.09
    },
    {
      id: 'pos2',
      assetId: 'ethereum',
      type: 'short',
      openPrice: 1850,
      currentPrice: 1800,
      amount: 2,
      leverage: 3,
      openDate: '2025-04-12',
      pnl: 300,
      pnlPercent: 2.7
    },
    {
      id: 'pos3',
      assetId: 'solana',
      type: 'long',
      openPrice: 115.20,
      currentPrice: 120.50,
      amount: 12,
      leverage: 2,
      openDate: '2025-04-14',
      pnl: 636,
      pnlPercent: 4.6
    },
    {
      id: 'pos4',
      assetId: 'tsla',
      type: 'short',
      openPrice: 275.30,
      currentPrice: 260.52,
      amount: 5,
      leverage: 2,
      openDate: '2025-04-08',
      pnl: 1478,
      pnlPercent: 10.7
    }
  ]);
  
  // Kombiniere Crypto und Stock Daten
  const allAssets: Record<string, AssetData> = {
    bitcoin: { name: 'Bitcoin', symbol: 'BTC', price: 50000, change24h: 2.5, assetType: 'crypto', marketCap: '950B', volume: '32B' },
    ethereum: { name: 'Ethereum', symbol: 'ETH', price: 1800, change24h: -1.2, assetType: 'crypto', marketCap: '225B', volume: '15B' },
    litecoin: { name: 'Litecoin', symbol: 'LTC', price: 250, change24h: 0.8, assetType: 'crypto', marketCap: '15B', volume: '2B' },
    ripple: { name: 'Ripple', symbol: 'XRP', price: 0.85, change24h: 1.3, assetType: 'crypto', marketCap: '41B', volume: '3B' },
    cardano: { name: 'Cardano', symbol: 'ADA', price: 1.20, change24h: -0.5, assetType: 'crypto', marketCap: '38B', volume: '2.5B' },
    polkadot: { name: 'Polkadot', symbol: 'DOT', price: 15.30, change24h: 3.2, assetType: 'crypto', marketCap: '16B', volume: '1.2B' },
    solana: { name: 'Solana', symbol: 'SOL', price: 120.50, change24h: 5.1, assetType: 'crypto', marketCap: '45B', volume: '5B' },
    dogecoin: { name: 'Dogecoin', symbol: 'DOGE', price: 0.15, change24h: -2.7, assetType: 'crypto', marketCap: '20B', volume: '1.8B' },
    aapl: { name: 'Apple Inc.', symbol: 'AAPL', price: 182.66, change24h: 1.3, assetType: 'stock', marketCap: '2.9T', sector: 'Technology' },
    tsla: { name: 'Tesla, Inc.', symbol: 'TSLA', price: 260.52, change24h: -2.1, assetType: 'stock', marketCap: '827B', sector: 'Automotive' },
  };

  const crypto = allAssets[id as keyof typeof allAssets] || { name: 'Unknown', symbol: '???', price: 0, change24h: 0 };

  // This ensures TypeScript knows allAssets is indexable by string
  const validAssetIds = Object.keys(allAssets);
  const isValidId = validAssetIds.includes(id);

  // MOVED HERE: Function defined before being used in useState
  // Funktion zur Simulation der Chart-Daten mittels GBM
  const generateChartData = useCallback(() => {
    // Use the properly typed id for calculations
    const assetSeed = isValidId 
      ? id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      : 0; // Default seed if id is invalid
    
    // Rest of the function remains the same
    const labels = Array.from({length: 30}, (_, i) => `${i + 1}`);
    
    const dt = 1 / 30;
    const mu = ((assetSeed % 10) - 5) / 1000;
    const sigma = 0.015 * (0.8 + (assetSeed % 5) / 10);
    
    let price = crypto.price * 0.88;
    const data: number[] = [];
    
    for (let i = 0; i < labels.length; i++) {
      const epsilon = randomGaussian();
      price = price * Math.exp((mu - (sigma * sigma) / 2) * dt + sigma * Math.sqrt(dt) * epsilon);
      data.push(price);
    }
    
    data[data.length - 1] = crypto.price;

    const supportLevel = Math.min(...data.slice(5, 20)) * 0.995;
    const resistanceLevel = Math.max(...data.slice(5, 20)) * 1.005;

    const longCandidates: number[] = [];
    const shortCandidates: number[] = [];
    for (let i = 5; i < data.length - 5; i++) {
      if (Math.abs(data[i] - supportLevel) / supportLevel < 0.01) {
        longCandidates.push(i);
      }
      if (Math.abs(data[i] - resistanceLevel) / resistanceLevel < 0.01) {
        shortCandidates.push(i);
      }
    }

    const longOpenIndex = longCandidates.length > 0 
      ? longCandidates[assetSeed % longCandidates.length]
      : 5 + (assetSeed % 5);
    
    let longCloseIndex = Math.min(longOpenIndex + 3 + (assetSeed % 5), data.length - 7);
    if (data[longOpenIndex] >= data[longCloseIndex]) {
      data[longCloseIndex] = data[longOpenIndex] * (1 + 0.03 + (assetSeed % 6) / 100);
    }
    
    const shortOpenIndex = shortCandidates.length > 0 
      ? shortCandidates[assetSeed % shortCandidates.length]
      : longCloseIndex + 2 + (assetSeed % 3);
    
    let shortCloseIndex = Math.min(shortOpenIndex + 2 + (assetSeed % 4), data.length - 2);
    if (data[shortOpenIndex] <= data[shortCloseIndex]) {
      data[shortCloseIndex] = data[shortOpenIndex] * (1 - 0.03 - (assetSeed % 5) / 100);
    }
    
    const volumeData = data.map((price, i) => {
      let volume = price * 0.05;
      if (i === longOpenIndex || i === longCloseIndex || i === shortOpenIndex || i === shortCloseIndex) {
        volume *= 2.5;
      }
      volume *= 0.7 + Math.random() * 0.6;
      return volume;
    });
    
    const signals = [
      { index: longOpenIndex, type: 'long-open', value: data[longOpenIndex] },
      { index: longCloseIndex, type: 'long-close', value: data[longCloseIndex] },
      { index: shortOpenIndex, type: 'short-open', value: data[shortOpenIndex] },
      { index: shortCloseIndex, type: 'short-close', value: data[shortCloseIndex] },
    ];

    return {
      labels,
      datasets: [
        {
          label: `${crypto.name} Kursverlauf`,
          data,
          borderColor: crypto.change24h >= 0 ? 'rgba(75,192,100,1)' : 'rgba(255,92,92,1)',
          backgroundColor: crypto.change24h >= 0 ? 'rgba(75,192,100,0.2)' : 'rgba(255,92,92,0.2)',
          fill: true,
          tension: 0.2,
          borderWidth: 2,
          pointRadius: 0,
        },
      ],
      supportLevel,
      resistanceLevel,
      signals,
      volumeData,
    };
  }, [id, isValidId, crypto.price, crypto.name]); // Add dependencies that affect chart generation
  
  // Create chart data state that only updates when the asset ID changes
  const [chartData, setChartData] = useState(() => {
    const baseData = generateChartData();
    return {
      ...baseData,
      datasets: [{
        ...baseData.datasets[0],
        borderColor: crypto.change24h >= 0 
          ? 'rgba(75,192,100,1)' 
          : 'rgba(255,92,92,1)',
        backgroundColor: crypto.change24h >= 0 
          ? darkMode ? 'rgba(75,192,100,0.15)' : 'rgba(75,192,100,0.2)' 
          : darkMode ? 'rgba(255,92,92,0.15)' : 'rgba(255,92,92,0.2)',
      }]
    };
  });
  
  // Update chart data only when ID changes
  useEffect(() => {
    if (id !== currentChartId) {
      const baseData = generateChartData();
      setChartData({
        ...baseData,
        datasets: [{
          ...baseData.datasets[0],
          borderColor: crypto.change24h >= 0 
            ? 'rgba(75,192,100,1)' 
            : 'rgba(255,92,92,1)',
          backgroundColor: crypto.change24h >= 0 
            ? darkMode ? 'rgba(75,192,100,0.15)' : 'rgba(75,192,100,0.2)' 
            : darkMode ? 'rgba(255,92,92,0.15)' : 'rgba(255,92,92,0.2)',
        }]
      });
      setCurrentChartId(id);
    }
  }, [id, currentChartId, generateChartData, crypto.change24h, darkMode]);
  
  // Only update colors when dark mode changes
  useEffect(() => {
    setChartData(prevData => ({
      ...prevData,
      datasets: [{
        ...prevData.datasets[0],
        backgroundColor: crypto.change24h >= 0 
          ? darkMode ? 'rgba(75,192,100,0.15)' : 'rgba(75,192,100,0.2)' 
          : darkMode ? 'rgba(255,92,92,0.15)' : 'rgba(255,92,92,0.2)',
      }]
    }));
  }, [darkMode, crypto.change24h]);

  // Filter positions for current asset
  const currentAssetPositions = activePositions.filter(pos => pos.assetId === id);
  const hasPositions = currentAssetPositions.length > 0;

  return (
    <main className={`min-h-screen ${darkMode ? 'bg-stone-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <Navbar username="John Doe" />
      
      {/* Sidebar wird bereits angepasst, wenn die Komponente aktualisiert wird */}
      <AssetSidebar assets={allAssets} activeAssetId={params.id} />
      
      <div className="ml-0 md:ml-64 flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Chart Header */}
          <div className="mb-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-serif mb-1">{crypto.name}</h1>
                <p className={`${darkMode ? 'text-stone-400' : 'text-gray-600'} text-sm font-light`}>
                  {crypto.symbol} • ${crypto.price.toLocaleString()}
                  <span className={`ml-2 ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Chart mit Dark Mode-Farben */}
          <div className="mb-8">
            <div className="chart-container">
              <div style={{ height: "500px" }}>
                <Line 
                  data={chartData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    backgroundColor: darkMode ? '#1a1a18' : '#fff', // Dunklerer Granit-Ton
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        backgroundColor: darkMode ? '#2a2a28' : 'white', // Dunklerer Granit-Ton
                        titleColor: darkMode ? '#fff' : '#1a1a1a',
                        bodyColor: darkMode ? '#ddd' : '#555555',
                        borderColor: darkMode ? '#444442' : '#e5e5e5', // Dunklerer Granit-Ton
                        borderWidth: 1,
                        padding: 12,
                        titleFont: {
                          family: "'Playfair Display', serif",
                          size: 14
                        },
                        bodyFont: {
                          family: "'Inter', sans-serif",
                          size: 12,
                          weight: 300
                        },
                      },
                      annotation: {
                        annotations: {
                          ...chartData.signals.reduce((acc : any, signal, index) => {
                            const signalId = `signal-${index}`;
                            acc[signalId] = {
                              type: 'point',
                              xValue: signal.index,
                              yValue: signal.value,
                              backgroundColor: signal.type.includes('long') ? 'rgba(0,255,0,1)' : 'rgba(255,0,0,1)',
                              radius: 8,
                              borderWidth: 2,
                              borderColor: darkMode ? '#333' : '#fff', // Dunklerer Rahmen für Granitlook
                              z: 100,
                            };
                            const labelId = `label-${index}`;
                            acc[labelId] = {
                              type: 'label',
                              xValue: signal.index,
                              yValue: signal.type === 'long-open' || signal.type === 'short-close' 
                                ? signal.value * 0.96 
                                : signal.value * 1.04,
                              content: signal.type.includes('long') 
                                ? (signal.type.includes('open') ? '🟢 LONG' : '🟢 CLOSE LONG')
                                : (signal.type.includes('open') ? '🔴 SHORT' : '🔴 CLOSE SHORT'),
                              font: { weight: 'bold', size: 12 },
                              color: signal.type.includes('long') ? '#00ff00' : '#ff0000',
                              backgroundColor: darkMode ? 'rgba(32,32,32,0.9)' : 'rgba(0,0,0,0.7)', // Granit-ähnlicher Hintergrund
                              padding: 4,
                              borderRadius: 4,
                              z: 101
                            };
                            return acc;
                          }, {})
                        }
                      }
                    },
                    scales: {
                      x: {
                        grid: { 
                          color: darkMode ? 'rgba(70, 70, 68, 0.15)' : 'rgba(0, 0, 0, 0.03)', // Dunklerer Granit-Ton
                          z: -1 
                        },
                        ticks: { 
                          color: darkMode ? '#888' : '#888',
                          font: { family: "'Inter', sans-serif", size: 10, weight: 300 } 
                        },
                      },
                      y: {
                        position: 'right',
                        grid: { 
                          color: darkMode ? 'rgba(70, 70, 68, 0.15)' : 'rgba(0, 0, 0, 0.03)', // Dunklerer Granit-Ton
                          z: -1 
                        },
                        ticks: {
                          color: darkMode ? '#aaa' : '#888',
                          font: { family: "'Inter', sans-serif", size: 10, weight: 300 },
                        },
                      },
                    },
                    elements: {
                      line: {
                        borderWidth: darkMode ? 2.5 : 2,
                      },
                      point: {
                        radius: 0,
                        hoverRadius: 6,
                        hoverBorderWidth: 2,
                        hoverBorderColor: darkMode ? '#222' : '#fff',
                        hoverBackgroundColor: darkMode ? '#fff' : '#000',
                      }
                    },
                  }} 
                />
              </div>
            </div>
          </div>
          
          {/* Tab-Schalter HIERHER verschoben - NACH dem Chart */}
          <div className={`border-b ${darkMode ? 'border-stone-800' : 'border-gray-100'} transition-colors duration-300 mb-8`}>
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('new')}
                className={`pb-4 text-sm font-light ${activeTab === 'new' ? 'border-b border-red-500 text-red-500' : `${darkMode ? 'text-stone-400' : 'text-gray-500'}`}`}
              >
                Neue Position
              </button>
              <button
                onClick={() => setActiveTab('positions')}
                className={`pb-4 text-sm font-light ${activeTab === 'positions' ? 'border-b border-red-500 text-red-500' : `${darkMode ? 'text-gray-400' : 'text-gray-500'}`}`}
              >
                Meine Positionen
              </button>
            </div>
          </div>
          
          {/* Trading Section */}
          <div className="mb-16">
            <div className="py-4"> {/* Reduziertes Padding, da der Tab-Schalter jetzt darüber ist */}
              {activeTab === 'new' ? (
                <div>
                  <h3 className="text-xl font-serif mb-8">Position eröffnen</h3>
                  
                  <div className="max-w-md">
                    <div className="mb-8">
                      <label className={`block ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2 text-sm font-light`}>Investitionsbetrag ($)</label>
                      <input 
                        type="number" 
                        min="0" 
                        step="100" 
                        defaultValue="1000" 
                        className={`w-full p-3 border focus:ring-1 focus:ring-red-500 focus:outline-none font-light transition-colors duration-300 ${
                          darkMode 
                            ? 'bg-stone-800 text-white border-stone-700 placeholder-stone-500' 
                            : 'bg-white text-gray-900 border-gray-200 placeholder-gray-400'
                        }`}
                      />
                    </div>
                    
                    {/* Automatische Positionseröffnung Toggle */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between">
                        <label className={`${darkMode ? 'text-stone-400' : 'text-gray-500'} text-sm font-light`}>Automatisch eröffnen</label>
                        <button 
                          onClick={() => setAutoOpen(!autoOpen)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                            autoOpen 
                              ? 'bg-red-500' 
                              : darkMode ? 'bg-stone-700' : 'bg-gray-200'
                          }`}
                        >
                          <span className="sr-only">Automatisch eröffnen</span>
                          <span 
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              autoOpen ? 'translate-x-6' : 'translate-x-1'
                            }`} 
                          />
                        </button>
                      </div>
                      
                      {autoOpen && (
                        <p className={`mt-2 text-xs font-light ${darkMode ? 'text-stone-400' : 'text-gray-500'}`}>
                          Die Position wird automatisch basierend auf den KI-Empfehlungen eröffnet.
                        </p>
                      )}
                    </div>
                    
                    <div className="flex space-x-6">
                      <button className="px-6 py-3 border transition-colors duration-300 bg-green-50 border-green-600 text-green-600 hover:bg-green-600 hover:text-white flex-1">
                        Long Position
                      </button>
                      <button className="px-6 py-3 border transition-colors duration-300 bg-red-50 border-red-600 text-red-600 hover:bg-red-600 hover:text-white flex-1">
                        Short Position
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-serif mb-8">Aktive Positionen</h3>
                  
                  {!hasPositions ? (
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-light`}>
                      Keine aktiven Positionen für {crypto.name}.
                    </p>
                  ) : (
                    <div className={`rounded-lg overflow-hidden border ${darkMode ? 'border-stone-800' : 'border-gray-200'}`}>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className={`${darkMode ? 'bg-stone-800' : 'bg-gray-50'}`}>
                          <tr>
                            <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Typ</th>
                            <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Eröffnungskurs</th>
                            <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Aktueller Kurs</th>
                            <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Betrag</th>
                            <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Investitionsbetrag</th>
                            <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>P&L</th>
                            <th className={`px-6 py-3 text-right text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Aktionen</th>
                          </tr>
                        </thead>
                        <tbody className={`${darkMode ? 'bg-stone-900' : 'bg-white'} divide-y ${darkMode ? 'divide-stone-800' : 'divide-gray-200'}`}>
                          {currentAssetPositions.map((position) => {
                            // Berechne den Investitionsbetrag
                            const investmentAmount = (position.amount * position.openPrice) / position.leverage;
                            
                            return (
                              <tr key={position.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    position.type === 'long' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {position.type === 'long' ? 'Long' : 'Short'}
                                  </span>
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  ${position.openPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  ${position.currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {position.amount} {crypto.symbol}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  ${investmentAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className={`text-sm font-medium ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    ${position.pnl.toLocaleString()}
                                  </div>
                                  <div className={`text-xs ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {position.pnl >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button className="text-red-600 hover:text-red-900 mr-3">Schließen</button>
                                  <button className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>Details</button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer compact={true} />
    </main>
  );
}
