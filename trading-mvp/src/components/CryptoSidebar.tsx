"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CryptoData {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: string;
  volume: string;
}

interface CryptoSidebarProps {
  cryptoData: Record<string, CryptoData>;
  activeCryptoId: string;
}

const CryptoSidebar = ({ cryptoData, activeCryptoId }: CryptoSidebarProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCryptos = Object.entries(cryptoData).filter(([id, crypto]) => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hidden md:block w-64 bg-[#1a1a1a] border-r border-gray-700 fixed left-0 top-16 bottom-0 overflow-y-auto z-30 pt-6">
      <div className="px-4 mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Asset Charts</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#2a2a2a] text-white text-sm border border-gray-700 rounded-lg p-2 pl-8 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <svg
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-1 px-3">
        {filteredCryptos.map(([cryptoId, crypto]) => (
          <button
            key={cryptoId}
            onClick={() => router.push(`/chart/${cryptoId}`)}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition ${
              cryptoId === activeCryptoId 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'text-gray-300 hover:bg-[#2a2a2a]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full mr-2 ${crypto.change24h >= 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <div className="flex-1 flex justify-between items-center">
              <span className="font-medium">{crypto.symbol}</span>
              <div className="text-right">
                <div>${crypto.price.toLocaleString()}</div>
                <div className={`text-xs ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CryptoSidebar;