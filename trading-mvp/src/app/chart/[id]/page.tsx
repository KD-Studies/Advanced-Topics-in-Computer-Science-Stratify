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

export default function CryptoChart({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { darkMode } = useTheme(); // Dark Mode-Status abrufen
  const [activeTab, setActiveTab] = useState('new');
  
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

  // Hilfsfunktion: Box-Muller, um normalverteilte Zufallswerte zu erzeugen
  const randomGaussian = () => {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); // u darf nicht null sein
    while(v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  };

  // MOVED HERE: Function defined before being used in useState
  // Funktion zur Simulation der Chart-Daten mittels GBM
  const generateChartData = () => {
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
  };
  
  // Zuerst müssen wir die Dataset-Generierung anpassen, um Dark Mode zu berücksichtigen
  const [chartData, setChartData] = useState(() => {
    const baseData = generateChartData();
    
    // Wir nutzen die generateChartData Funktion, passen aber die Farben dynamisch an
    return {
      ...baseData,
      datasets: [{
        ...baseData.datasets[0],
        // Dynamische Farben basierend auf Dark Mode und Kursänderung
        borderColor: crypto.change24h >= 0 
          ? 'rgba(75,192,100,1)' 
          : 'rgba(255,92,92,1)',
        backgroundColor: crypto.change24h >= 0 
          ? darkMode ? 'rgba(75,192,100,0.15)' : 'rgba(75,192,100,0.2)' 
          : darkMode ? 'rgba(255,92,92,0.15)' : 'rgba(255,92,92,0.2)',
      }]
    };
  });

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
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-light`}>
                    Keine aktiven Positionen für {crypto.name}.
                  </p>
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
