"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react'; // Importiere use
import { Line } from 'react-chartjs-2';
import Navbar from '@/components/Navbar';
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
import annotationPlugin from 'chartjs-plugin-annotation'; // Füge diesen Import hinzu

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
  annotationPlugin  // Annotation Plugin hinzufügen
);

export default function CryptoChart({ params }: { params: { id: string } }) {
  const router = useRouter();
  const unwrappedParams = use(params); // Unwrappe params
  const { id } = unwrappedParams;
  
  const [timeframe, setTimeframe] = useState('1d'); // 1d, 1w, 1m, 1y
  const [activeTab, setActiveTab] = useState('new'); // 'new' oder 'positions'
  // Beispieldaten für die Kryptowährungen
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

  const crypto = cryptoData[id as keyof typeof cryptoData] || { name: 'Unknown', symbol: '???', price: 0, change24h: 0 };

  // Dummy Chart-Daten generieren basierend auf Zeitrahmen
  const generateChartData = () => {
    let labels: string[] = [];
    let data = [];
    let startPrice = crypto.price * 0.9; // Start ~10% niedriger

    switch(timeframe) {
      case '1d':
        labels = Array.from({length: 24}, (_, i) => `${i}:00`);
        break;
      case '1w':
        labels = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
        break;
      case '1m':
        labels = Array.from({length: 30}, (_, i) => `${i+1}`);
        break;
      case '1y':
        labels = ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
        break;
    }

    // Generiere realistische Preisbewegungen
    data = labels.map((_, i) => {
      // Zufällige Schwankung zwischen -2% und +2%
      const change = (Math.random() * 4 - 2) / 100;
      startPrice = startPrice * (1 + change);
      return startPrice;
    });

    // Stelle sicher, dass der letzte Wert dem aktuellen Preis entspricht
    data[data.length - 1] = crypto.price;

    // Beispiel Signalpunkte (in einer realen App würden diese aus Analysen oder der API kommen)
    const signals = [
      { index: Math.floor(labels.length * 0.3), type: 'long-open', value: data[Math.floor(labels.length * 0.3)] },
      { index: Math.floor(labels.length * 0.7), type: 'long-close', value: data[Math.floor(labels.length * 0.7)] },
      { index: Math.floor(labels.length * 0.5), type: 'short-open', value: data[Math.floor(labels.length * 0.5)] },
      { index: Math.floor(labels.length * 0.9), type: 'short-close', value: data[Math.floor(labels.length * 0.9)] },
    ];

    return {
      labels,
      datasets: [
        {
          label: `${crypto.name} Preis`,
          data,
          borderColor: crypto.change24h >= 0 ? 'rgba(75,192,100,1)' : 'rgba(255,92,92,1)',
          backgroundColor: crypto.change24h >= 0 ? 'rgba(75,192,100,0.2)' : 'rgba(255,92,92,0.2)',
          fill: true,
          tension: 0.3,
        },
      ],
      signals, // Signale für die Annotations
    };
  };

  const [chartData, setChartData] = useState(generateChartData());

  // Aktualisiere Chart-Daten wenn sich der Zeitrahmen ändert
  useEffect(() => {
    setChartData(generateChartData());
  }, [timeframe]);

  return (
    <main className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white min-h-screen">
      <Navbar username="John Doe" />
      
      <div className="px-6 py-12">
        {/* Blur Background Glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 opacity-20 rounded-full filter blur-3xl z-0 animate-pulse"></div>

        {/* Back Button - verbesserte Version */}
        <div className="max-w-6xl mx-auto mb-6 relative z-10">
          <button 
            onClick={() => router.push('/chartsuche')} 
            className="flex items-center text-gray-400 hover:text-white transition px-4 py-2 hover:bg-[#2a2a2a] rounded-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Übersicht
          </button>
        </div>

        {/* Crypto Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {crypto.name} 
                <span className="ml-2 text-lg bg-[#2a2a2a] px-2 py-1 rounded">
                  {crypto.symbol}
                </span>
              </h1>
              <p className="text-gray-400">Aktueller Preis</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-3xl font-bold">${crypto.price.toLocaleString()}</p>
              <p className={`text-sm ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}% (24h)
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-4">
              <p className="text-sm text-gray-400">Marktkapitalisierung</p>
              <p className="text-lg font-semibold">${crypto.marketCap}</p>
            </div>
            <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-4">
              <p className="text-sm text-gray-400">24h Volumen</p>
              <p className="text-lg font-semibold">${crypto.volume}</p>
            </div>
            <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-4">
              <p className="text-sm text-gray-400">Tiefststand (24h)</p>
              <p className="text-lg font-semibold">${(crypto.price * 0.97).toFixed(2)}</p>
            </div>
            <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-4">
              <p className="text-sm text-gray-400">Höchststand (24h)</p>
              <p className="text-lg font-semibold">${(crypto.price * 1.03).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="max-w-6xl mx-auto bg-[#1e1e1e] border border-gray-700 rounded-xl p-6 shadow-lg mb-8">
          {/* Timeframe Selector */}
          <div className="flex space-x-2 mb-6">
            {['1d', '1w', '1m', '1y'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-md text-sm ${
                  timeframe === tf 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-[#2a2a2a] text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          
          {/* Chart */}
          <div style={{ height: "400px" }}>
            <Line 
              data={chartData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1e1e1e',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#444',
                    borderWidth: 1,
                  },
                  annotation: {
                    annotations: {
                      ...chartData.signals.reduce((acc, signal, index) => {
                        const signalId = `signal-${index}`;
                        acc[signalId] = {
                          type: 'point',
                          xValue: signal.index,
                          yValue: signal.value * (signal.type === 'long-close' ? 1.03 : 1), // Long Close höher positionieren
                          backgroundColor: 
                            signal.type.includes('long') ? 'rgba(0,255,0,1)' : 'rgba(255,0,0,1)',
                          radius: 8,
                          borderWidth: 2,
                          borderColor: '#fff',
                          z: 100, // Hoher z-Wert damit Punkte über der Linie erscheinen
                        };
                        
                        // Text-Label für den Signal-Typ
                        const labelId = `label-${index}`;
                        acc[labelId] = {
                          type: 'label',
                          xValue: signal.index,
                          // Long Close höher platzieren, Short Close niedriger
                          yValue: signal.type === 'long-close' 
                            ? signal.value * 1.08  // Noch höher für LONG CLOSE
                            : signal.type === 'long-open' 
                              ? signal.value * 1.04  // Etwas höher für LONG OPEN
                              : signal.type === 'short-open' 
                                ? signal.value * 0.97  // Etwas niedriger für SHORT OPEN
                                : signal.value * 0.93,  // Noch niedriger für SHORT CLOSE
                          content: signal.type.includes('long') 
                            ? (signal.type.includes('open') ? '🟢 LONG' : '🟢 CLOSE LONG')
                            : (signal.type.includes('open') ? '🔴 SHORT' : '🔴 CLOSE SHORT'),
                          font: {
                            weight: 'bold',
                            size: 12
                          },
                          color: signal.type.includes('long') ? '#00ff00' : '#ff0000',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          padding: 4,
                          borderRadius: 4,
                          z: 101 // Noch höherer z-Wert für Labels
                        };
                        
                        return acc;
                      }, {})
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                    },
                    ticks: {
                      color: '#888',
                    },
                  },
                  y: {
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                    },
                    ticks: {
                      color: '#888',
                      callback: function(value) {
                        return '$' + value.toLocaleString();
                      }
                    },
                  },
                },
              }} 
            />
          </div>
        </div>

        {/* Trading Section */}
        <div className="max-w-6xl mx-auto bg-[#1e1e1e] border border-gray-700 rounded-xl p-6 shadow-lg mb-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab('new')}
              className={`py-2 px-4 font-medium ${
                activeTab === 'new'
                  ? 'border-b-2 border-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Neue Position
            </button>
            <button
              onClick={() => setActiveTab('positions')}
              className={`py-2 px-4 font-medium ${
                activeTab === 'positions'
                  ? 'border-b-2 border-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Meine Positionen
            </button>
          </div>

          {activeTab === 'new' ? (
            <div>
              <h3 className="text-xl font-semibold mb-4">Position eröffnen</h3>
              
              {/* Position Type */}
              <div className="mb-6">
                <label className="block text-gray-400 mb-2">Positionstyp</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name="position-type" defaultChecked className="text-purple-500" />
                    <span className="ml-2 text-white">Long</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="position-type" className="text-purple-500" />
                    <span className="ml-2 text-white">Short</span>
                  </label>
                </div>
              </div>
              
              {/* Investment Amount */}
              <div className="mb-6">
                <label className="block text-gray-400 mb-2">Investitionsbetrag ($)</label>
                <input 
                  type="number" 
                  min="0" 
                  step="100" 
                  defaultValue="1000" 
                  className="w-full bg-[#2a2a2a] border border-gray-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              
              {/* Signal Option */}
              <div className="mb-6">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="text-purple-500" />
                  <span className="ml-2 text-white">Beim nächsten Signal ausführen</span>
                </label>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold shadow-lg transition">
                  Long Position eröffnen
                </button>
                <button className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold shadow-lg transition">
                  Short Position eröffnen
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold mb-4">Aktive Positionen für {crypto.name}</h3>
              
              {/* Example Positions Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="text-xs uppercase bg-gray-700">
                    <tr>
                      <th className="px-6 py-3">Typ</th>
                      <th className="px-6 py-3">Menge</th>
                      <th className="px-6 py-3">Einstiegspreis</th>
                      <th className="px-6 py-3">Aktueller Preis</th>
                      <th className="px-6 py-3">P/L</th>
                      <th className="px-6 py-3">Aktion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="px-6 py-4"><span className="text-green-500">Long</span></td>
                      <td className="px-6 py-4">0.05 {crypto.symbol}</td>
                      <td className="px-6 py-4">${(crypto.price * 0.95).toFixed(2)}</td>
                      <td className="px-6 py-4">${crypto.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-green-500">+5.26%</td>
                      <td className="px-6 py-4">
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs">
                          Schließen
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="px-6 py-4"><span className="text-red-500">Short</span></td>
                      <td className="px-6 py-4">0.1 {crypto.symbol}</td>
                      <td className="px-6 py-4">${(crypto.price * 1.02).toFixed(2)}</td>
                      <td className="px-6 py-4">${crypto.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-red-500">-1.96%</td>
                      <td className="px-6 py-4">
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs">
                          Schließen
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* No positions message */}
              {/* Uncomment this if you want to show a message when there are no positions
              <div className="text-center py-8 text-gray-400">
                <p>Du hast noch keine Positionen für {crypto.name}.</p>
                <button 
                  onClick={() => setActiveTab('new')}
                  className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
                >
                  Jetzt Position eröffnen
                </button>
              </div>
              */}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}