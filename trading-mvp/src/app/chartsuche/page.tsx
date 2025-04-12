"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function ChartSuche() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Beispieldaten für Kryptowährungen
  const cryptos = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 50000, change24h: 2.5 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 1800, change24h: -1.2 },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', price: 250, change24h: 0.8 },
    { id: 'ripple', name: 'Ripple', symbol: 'XRP', price: 0.85, change24h: 1.3 },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 1.20, change24h: -0.5 },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 15.30, change24h: 3.2 },
    { id: 'solana', name: 'Solana', symbol: 'SOL', price: 120.50, change24h: 5.1 },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.15, change24h: -2.7 },
  ];

  // Filtern der Kryptowährungen basierend auf dem Suchbegriff
  const filteredCryptos = cryptos.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white min-h-screen">
      <Navbar username="John Doe" />
      
      <div className="px-6 py-12">
        {/* Blur Background Glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 opacity-20 rounded-full filter blur-3xl z-0 animate-pulse"></div>

        {/* Search Section */}
        <div className="z-10 max-w-4xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Krypto Charts
            </span>
          </h2>
          
          <div className="relative mb-10">
            <input
              type="text"
              placeholder="Suche nach Kryptowährungen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-gray-700 rounded-xl px-5 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <svg className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Crypto List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCryptos.map((crypto) => (
              <div 
                key={crypto.id}
                className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-purple-600/30 transition cursor-pointer hover:scale-105"
                onClick={() => router.push(`/chart/${crypto.id}`)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">{crypto.name}</h3>
                  <span className="text-sm bg-[#2a2a2a] px-2 py-1 rounded">{crypto.symbol}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold">${crypto.price.toLocaleString()}</span>
                  <span className={`text-sm ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}