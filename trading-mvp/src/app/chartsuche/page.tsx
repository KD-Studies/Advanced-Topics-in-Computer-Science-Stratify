"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTheme } from '@/context/ThemeContext'; // Theme-Hook importieren

export default function ChartSuche() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode } = useTheme(); // Dark Mode-Status abrufen

  // Beispieldaten für Kryptowährungen mit Prognosewerten (auch negative)
  const cryptos = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 50000, change24h: 2.5, type: 'crypto', forecast: 8.7 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 1800, change24h: -1.2, type: 'crypto', forecast: 12.3 },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', price: 250, change24h: 0.8, type: 'crypto', forecast: 5.1 },
    { id: 'ripple', name: 'Ripple', symbol: 'XRP', price: 0.85, change24h: 1.3, type: 'crypto', forecast: -3.8 },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 1.20, change24h: -0.5, type: 'crypto', forecast: 6.2 },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 15.30, change24h: 3.2, type: 'crypto', forecast: 9.4 },
    { id: 'solana', name: 'Solana', symbol: 'SOL', price: 120.50, change24h: 5.1, type: 'crypto', forecast: 15.7 },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.15, change24h: -2.7, type: 'crypto', forecast: -2.8 },
  ];

  // Beispieldaten für Aktien mit Prognosewerten (auch negative)
  const stocks = [
    { id: 'apple', name: 'Apple Inc.', symbol: 'AAPL', price: 180.95, change24h: 0.8, type: 'stock', forecast: 7.2 },
    { id: 'microsoft', name: 'Microsoft', symbol: 'MSFT', price: 378.85, change24h: 1.2, type: 'stock', forecast: 6.3 },
    { id: 'amazon', name: 'Amazon', symbol: 'AMZN', price: 182.15, change24h: -0.6, type: 'stock', forecast: 11.5 },
    { id: 'google', name: 'Alphabet', symbol: 'GOOGL', price: 143.96, change24h: 0.3, type: 'stock', forecast: -4.7 },
    { id: 'tesla', name: 'Tesla', symbol: 'TSLA', price: 260.50, change24h: 3.9, type: 'stock', forecast: 13.8 },
    { id: 'nvidia', name: 'NVIDIA', symbol: 'NVDA', price: 840.25, change24h: 2.1, type: 'stock', forecast: 10.2 },
    { id: 'meta', name: 'Meta Platforms', symbol: 'META', price: 476.70, change24h: -1.8, type: 'stock', forecast: -5.6 },
    { id: 'jpmorgan', name: 'JPMorgan Chase', symbol: 'JPM', price: 186.42, change24h: 0.5, type: 'stock', forecast: 3.2 },
  ];

  // Kombiniere alle Assets
  const allAssets = [...cryptos, ...stocks];
  
  // Top Performer ermitteln
  const topPerformers = [...allAssets]
    .sort((a, b) => b.forecast - a.forecast)
    .slice(0, 3);
  
  // Gefilterte Assets basierend auf Suche
  const filteredAssets = allAssets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <Navbar username="John Doe" />
      
      {/* Container ohne max-w-7xl, damit volle Breite genutzt wird */}
      <div className="flex-grow w-full">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-serif mb-3">Märkte</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-light max-w-2xl mx-auto transition-colors duration-300`}>
              Entdecken Sie Handelsmöglichkeiten in verschiedenen Märkten
            </p>
          </div>

          {/* Top Performers */}
          <div className="mb-24">
            <h2 className={`font-serif text-2xl mb-12 flex items-center after:content-[''] after:h-px after:flex-grow ${darkMode ? 'after:bg-gray-700' : 'after:bg-gray-200'} after:ml-6 transition-colors duration-300`}>
              Top Empfehlungen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {topPerformers.map((asset, index) => (
                <div 
                  key={asset.id}
                  className={`${darkMode ? 'bg-gray-900 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-400'} border-t pt-8 transition-colors cursor-pointer group`}
                  onClick={() => router.push(`/chart/${asset.id}`)}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <h3 className="text-2xl font-serif">{asset.name}</h3>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>{asset.symbol}</span>
                      </div>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs mt-2 font-light transition-colors duration-300`}>
                        {asset.type === 'crypto' ? 'Kryptowährung' : 'Aktie'}
                      </p>
                    </div>
                    <div className="text-sm">
                      <span className={`${asset.forecast >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {asset.forecast >= 0 ? '+' : ''}{asset.forecast}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end group-hover:text-red-500 transition-colors">
                    <span className="text-2xl font-serif">${asset.price.toLocaleString()}</span>
                    <span className={`text-sm ${asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'} group-hover:text-red-500`}>
                      24h: {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                    </span>
                  </div>
                  
                  {/* Ranking Number */}
                  <div className={`absolute top-0 right-0 w-8 h-8 flex items-center justify-center font-serif ${darkMode ? 'text-gray-300' : 'text-gray-900'} transition-colors duration-300`}>
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
              
          {/* Search & All Assets */}
          <div>
            <div className="mb-12">
              <h2 className="font-serif text-2xl mb-6">Alle Märkte</h2>
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full p-3 border focus:ring-1 focus:ring-red-500 focus:outline-none font-light transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-500' 
                      : 'bg-white text-gray-900 border-gray-200 placeholder-gray-400'
                  }`}
                />
                <svg 
                  className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'} absolute right-4 top-3 transition-colors duration-300`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Assets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredAssets.map((asset) => (
                <div 
                  key={asset.id}
                  className={`border-t pt-6 cursor-pointer transition-colors group ${
                    darkMode 
                      ? 'border-gray-700 hover:border-red-500' 
                      : 'border-gray-100 hover:border-red-400'
                  }`}
                  onClick={() => router.push(`/chart/${asset.id}`)}
                >
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="text-lg font-serif group-hover:text-red-500 transition-colors">{asset.name}</h3>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>{asset.symbol}</span>
                  </div>
                  
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-xl font-light">${asset.price.toLocaleString()}</span>
                    <span className={`text-sm ${asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'} group-hover:text-red-500 transition-colors`}>
                      {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                    </span>
                  </div>
                  
                  <div className={`text-right text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                    Prognose: <span className={asset.forecast >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {asset.forecast >= 0 ? '+' : ''}{asset.forecast}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer compact={true} />
    </main>
  );
}