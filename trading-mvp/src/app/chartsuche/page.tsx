"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CryptoSidebar from '@/components/CryptoSidebar';

export default function ChartSuche() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

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

  // Kombiniere Krypto und Aktien für die Sidebar
  const allAssets = [...cryptos, ...stocks];
  
  // Ermittle die Top 3 Performer basierend auf der Prognose
  const topPerformers = [...allAssets]
    .sort((a, b) => b.forecast - a.forecast)
    .slice(0, 3);
  
  // Für die Sidebar benötigte Daten
  const cryptoData = allAssets.reduce((acc, asset) => {
    acc[asset.id] = { 
      name: asset.name, 
      symbol: asset.symbol, 
      price: asset.price, 
      change24h: asset.change24h,
      marketCap: 'N/A',
      volume: 'N/A'
    };
    return acc;
  }, {});

  // Filtern nur basierend auf Suchbegriff
  const filteredAssets = allAssets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white min-h-screen">
      <Navbar username="John Doe" />
      
      <div className="flex">
        {/* Sidebar für Konsistenz mit anderen Seiten */}
        <CryptoSidebar cryptoData={cryptoData} activeCryptoId="" />

        {/* Main Content */}
        <div className="w-full md:pl-64">
          <div className="px-6 py-12">
            {/* Blur Background Glow */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 opacity-20 rounded-full filter blur-3xl z-0 animate-pulse"></div>

            {/* Search Section */}
            <div className="z-10 max-w-4xl mx-auto mb-10">
              <h2 className="text-3xl font-bold mb-6 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                  Alle Charts
                </span>
              </h2>
              
              {/* Top Performers Section */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  <span className="relative inline-block">
                    <span className="text-white">Top 3 Empfehlungen</span>
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500"></span>
                  </span>
                </h3>
                <p className="text-gray-400 text-center mb-6">Basierend auf unserer KI-Analyse für die kommenden Wochen</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topPerformers.map((asset, index) => (
                    <div 
                      key={asset.id}
                      className="bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-purple-600/30 transition cursor-pointer hover:scale-105 relative overflow-hidden"
                      onClick={() => router.push(`/chart/${asset.id}`)}
                    >
                      {/* Position Badge */}
                      <div className="absolute -top-4 -right-4 bg-purple-600 text-white w-16 h-16 flex items-end justify-start p-2 transform rotate-12 shadow-lg">
                        <span className="text-2xl font-bold transform -rotate-12">#{index + 1}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">{asset.name}</h3>
                        <div className="flex items-center">
                          <span className={`text-xs mr-2 px-2 py-1 rounded-full ${
                            asset.type === 'crypto' 
                              ? 'bg-blue-900/40 text-blue-400' 
                              : 'bg-green-900/40 text-green-400'
                          }`}>
                            {asset.type === 'crypto' ? 'Krypto' : 'Aktie'}
                          </span>
                          <span className="text-sm bg-[#2a2a2a] px-2 py-1 rounded">{asset.symbol}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold">${asset.price.toLocaleString()}</span>
                        <span className={`text-sm ${asset.forecast >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          Prognose: {asset.forecast >= 0 ? '+' : ''}{asset.forecast}%
                        </span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="text-xs text-gray-400">Letzte 24h</div>
                        <span className={`text-sm ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Suche nach Kryptowährungen oder Aktien..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-gray-700 rounded-xl px-5 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <svg className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Assets List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map((asset) => (
                  <div 
                    key={asset.id}
                    className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-purple-600/30 transition cursor-pointer hover:scale-105"
                    onClick={() => router.push(`/chart/${asset.id}`)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">{asset.name}</h3>
                      <div className="flex items-center">
                        <span className={`text-xs mr-2 px-2 py-1 rounded-full ${
                          asset.type === 'crypto' 
                            ? 'bg-blue-900/40 text-blue-400' 
                            : 'bg-green-900/40 text-green-400'
                        }`}>
                          {asset.type === 'crypto' ? 'Krypto' : 'Aktie'}
                        </span>
                        <span className="text-sm bg-[#2a2a2a] px-2 py-1 rounded">{asset.symbol}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-bold">${asset.price.toLocaleString()}</span>
                      <span className={`text-sm ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                      </span>
                    </div>
                    {/* Forecast Tag */}
                    <div className="mt-2 text-right">
                      <span className={`text-xs ${asset.forecast >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        Prognose: {asset.forecast >= 0 ? '+' : ''}{asset.forecast}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}