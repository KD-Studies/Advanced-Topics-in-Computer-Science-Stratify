"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react'; // Importiere use
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
  Legend,
  TimeScale,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation'; // Annotation Plugin importieren

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
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const [timeframe, setTimeframe] = useState('1m'); // fix auf 1m gesetzt
  const [activeTab, setActiveTab] = useState('new');

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

  // Hilfsfunktion: Box-Muller, um normalverteilte Zufallswerte zu erzeugen
  const randomGaussian = () => {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); // u darf nicht null sein
    while(v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  };

  // Funktion zur Simulation der Chart-Daten mittels GBM
  const generateChartData = () => {
    // Erstelle Labels für 30 Tage des Monats
    const labels = Array.from({length: 30}, (_, i) => `${i + 1}`);
    
    // Setze Parameter für die Simulation
    // dt entspricht 1 Tag (kann je nach gewünschter Präzision angepasst werden)
    const dt = 1 / 30;
    // Drift (mu) – hier basierend auf einem kleinen Bias der Asset-ID
    const assetSeed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const mu = ((assetSeed % 10) - 5) / 1000; // z.B. Werte um ±0.5%
    // Volatilität (sigma) – Krypto haben in der Regel höhere Volatilität
    const sigma = 0.015 * (0.8 + (assetSeed % 5) / 10);
    
    // Setze den Startpreis etwas unterhalb des aktuellen Preises, damit der "aufwärts" Trend sichtbar ist
    let price = crypto.price * 0.88;
    const data: number[] = [];
    
    // Simuliere 30 Tage Preisbewegung mithilfe des GBM-Modells
    for (let i = 0; i < labels.length; i++) {
      // Preisentwicklung: S[t+1] = S[t] * exp((mu - sigma^2/2)*dt + sigma*sqrt(dt)*epsilon)
      const epsilon = randomGaussian();
      price = price * Math.exp((mu - (sigma * sigma) / 2) * dt + sigma * Math.sqrt(dt) * epsilon);
      data.push(price);
    }
    
    // Setze den letzten Wert exakt auf den aktuellen Preis, um Konsistenz zu gewährleisten
    data[data.length - 1] = crypto.price;

    // Bestimme Unterstützung und Widerstand (nur mittlere Tage betrachten)
    const supportLevel = Math.min(...data.slice(5, 20)) * 0.995;
    const resistanceLevel = Math.max(...data.slice(5, 20)) * 1.005;

    // Ermittele potenzielle Signalkandidaten anhand der Nähe zu Unterstützung/Widerstand
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

    // Wähle Einstiegspunkte für Long und Short (Fallback, falls keine Kandidaten gefunden wurden)
    const longOpenIndex = longCandidates.length > 0 
      ? longCandidates[assetSeed % longCandidates.length]
      : 5 + (assetSeed % 5);
    
    let longCloseIndex = Math.min(longOpenIndex + 3 + (assetSeed % 5), data.length - 7);
    // Bei Long muss der Einstiegspreis unter dem Ausstiegspreis liegen
    if (data[longOpenIndex] >= data[longCloseIndex]) {
      data[longCloseIndex] = data[longOpenIndex] * (1 + 0.03 + (assetSeed % 6) / 100);
    }
    
    const shortOpenIndex = shortCandidates.length > 0 
      ? shortCandidates[assetSeed % shortCandidates.length]
      : longCloseIndex + 2 + (assetSeed % 3);
    
    let shortCloseIndex = Math.min(shortOpenIndex + 2 + (assetSeed % 4), data.length - 2);
    // Bei Short muss der Einstiegspreis oberhalb des Ausstiegspreises liegen
    if (data[shortOpenIndex] <= data[shortCloseIndex]) {
      data[shortCloseIndex] = data[shortOpenIndex] * (1 - 0.03 - (assetSeed % 5) / 100);
    }
    
    // Erzeuge zusätzlich Volumendaten, wobei Signale hervorgehoben werden
    const volumeData = data.map((price, i) => {
      let volume = price * 0.05;
      if (i === longOpenIndex || i === longCloseIndex || i === shortOpenIndex || i === shortCloseIndex) {
        volume *= 2.5;
      }
      volume *= 0.7 + Math.random() * 0.6;
      return volume;
    });
    
    // Handelssignale definieren
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

  const [chartData, setChartData] = useState(generateChartData());

  // Aktualisiere die Chartdaten beim Wechsel des Zeitrahmens
  useEffect(() => {
    setChartData(generateChartData());
  }, [timeframe]);

  return (
    <main className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white min-h-screen">
      <Navbar username="John Doe" />
      
      <div className="flex">
        {/* Sidebar */}
        <CryptoSidebar cryptoData={cryptoData} activeCryptoId={id} />

        {/* Main Content */}
        <div className="w-full md:pl-64">
          <div className="px-6 py-12">
            {/* Blur Background */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 opacity-20 rounded-full filter blur-3xl z-0 animate-pulse"></div>

            {/* Back Button */}
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

              {/* Statistiken */}
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
              <h3 className="text-xl font-semibold mb-6">Monatschart</h3>
              
              <div style={{ height: "400px" }}>
                <Line 
                  data={chartData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
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
                              yValue: signal.value,
                              backgroundColor: signal.type.includes('long') ? 'rgba(0,255,0,1)' : 'rgba(255,0,0,1)',
                              radius: 8,
                              borderWidth: 2,
                              borderColor: '#fff',
                              z: 100,
                            };
                            const labelId = `label-${index}`;
                            let yValueLabel = signal.value;
                            if (signal.type === 'long-open' || signal.type === 'short-close') {
                              yValueLabel *= 0.96;
                            } else {
                              yValueLabel *= 1.04;
                            }
                            
                            acc[labelId] = {
                              type: 'label',
                              xValue: signal.index,
                              yValue: yValueLabel,
                              content: signal.type.includes('long') 
                                ? (signal.type.includes('open') ? '🟢 LONG' : '🟢 CLOSE LONG')
                                : (signal.type.includes('open') ? '🔴 SHORT' : '🔴 CLOSE SHORT'),
                              font: { weight: 'bold', size: 12 },
                              color: signal.type.includes('long') ? '#00ff00' : '#ff0000',
                              backgroundColor: 'rgba(0,0,0,0.7)',
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
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#888' },
                      },
                      y: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: {
                          color: '#888',
                          callback: (value) => '$' + value.toLocaleString(),
                        },
                      },
                    },
                  }} 
                />
              </div>
            </div>

            {/* Trading Section */}
            <div className="max-w-6xl mx-auto bg-[#1e1e1e] border border-gray-700 rounded-xl p-6 shadow-lg mb-8">
              <div className="flex border-b border-gray-700 mb-6">
                <button
                  onClick={() => setActiveTab('new')}
                  className={`py-2 px-4 font-medium ${activeTab === 'new' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Neue Position
                </button>
                <button
                  onClick={() => setActiveTab('positions')}
                  className={`py-2 px-4 font-medium ${activeTab === 'positions' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Meine Positionen
                </button>
              </div>

              {activeTab === 'new' ? (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Position eröffnen</h3>
                  
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
                  
                  <div className="mb-6">
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="text-purple-500" />
                      <span className="ml-2 text-white">Beim nächsten Signal ausführen</span>
                    </label>
                  </div>
                  
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
