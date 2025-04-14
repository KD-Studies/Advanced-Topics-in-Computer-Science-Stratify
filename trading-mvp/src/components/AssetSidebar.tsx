"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

// Erweiterte Interfaces für alle Asset-Typen
interface AssetData {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  assetType: 'crypto' | 'stock';
  // Optionale spezifische Felder
  marketCap?: string;
  volume?: string;
  sector?: string;
  pe?: number;
}

interface AssetSidebarProps {
  assets: Record<string, AssetData>;
  activeAssetId: string;
}

const AssetSidebar = ({ assets, activeAssetId }: AssetSidebarProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    crypto: true,
    stocks: true
  });
  const { darkMode } = useTheme();

  // Filtere Assets nach Suchbegriff
  const filteredAssets = Object.entries(assets).filter(([id, asset]) => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gruppiere nach Asset-Typ
  const cryptoAssets = filteredAssets.filter(([_, asset]) => asset.assetType === 'crypto');
  const stockAssets = filteredAssets.filter(([_, asset]) => asset.assetType === 'stock');

  // Toggle für Abschnitte
  const toggleSection = (section: 'crypto' | 'stocks') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className={`hidden md:block w-64 fixed left-0 top-16 bottom-0 overflow-y-auto z-30 pt-6 border-r transition-colors duration-300 ${
      darkMode ? 'bg-stone-900 text-white border-stone-800' : 'bg-white text-gray-900 border-gray-100'
    }`}>
      <div className="px-4 mb-6">
        <h3 className={`text-xl font-serif mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Assets</h3>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full text-sm border rounded-none p-2 pl-8 focus:ring-1 focus:ring-red-500 focus:outline-none font-light ${
              darkMode 
                ? 'bg-stone-800 text-white border-stone-700 placeholder-stone-500' 
                : 'bg-white text-gray-800 border-gray-200 placeholder-gray-400'
            }`}
          />
          <svg
            className={`absolute left-2.5 top-2.5 h-4 w-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
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

      {/* Kryptowährungen */}
      <div className="mb-4">
        <button 
          onClick={() => toggleSection('crypto')}
          className={`flex justify-between items-center w-full px-4 py-2 text-left font-serif ${
            darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-50'
          }`}
        >
          <span>Kryptowährungen</span>
          <svg 
            className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'} transition-transform ${expandedSections.crypto ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSections.crypto && (
          <div className="space-y-1">
            {cryptoAssets.map(([assetId, asset]) => (
              <button
                key={assetId}
                onClick={() => router.push(`/chart/${assetId}`)}
                className={`w-full flex items-center py-3 px-4 text-sm transition border-l-2 ${
                  assetId === activeAssetId 
                    ? darkMode
                      ? 'border-l-red-500 bg-stone-800 text-white' 
                      : 'border-l-red-500 bg-gray-50 text-gray-900' 
                    : darkMode 
                      ? 'border-l-transparent text-stone-300 hover:bg-stone-800' 
                      : 'border-l-transparent text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-serif">{asset.symbol}</span>
                    <span className={`ml-2 text-xs font-light ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{asset.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-light">${asset.price.toLocaleString()}</div>
                    <div className={`text-xs ${asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                    </div>
                  </div>
                </div>
              </button>
            ))}
            
            {cryptoAssets.length === 0 && (
              <div className={`px-6 py-3 text-sm font-light ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Keine Ergebnisse gefunden
              </div>
            )}
          </div>
        )}
      </div>

      {/* Aktien */}
      <div className="mb-4">
        <button 
          onClick={() => toggleSection('stocks')}
          className={`flex justify-between items-center w-full px-4 py-2 text-left font-serif ${
            darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-50'
          }`}
        >
          <span>Aktien</span>
          <svg 
            className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'} transition-transform ${expandedSections.stocks ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSections.stocks && (
          <div className="space-y-1">
            {stockAssets.map(([assetId, asset]) => (
              <button
                key={assetId}
                onClick={() => router.push(`/chart/${assetId}`)}
                className={`w-full flex items-center py-3 px-4 text-sm transition border-l-2 ${
                  assetId === activeAssetId 
                    ? darkMode
                      ? 'border-l-red-500 bg-stone-800 text-white' 
                      : 'border-l-red-500 bg-gray-50 text-gray-900' 
                    : darkMode 
                      ? 'border-l-transparent text-stone-300 hover:bg-stone-800' 
                      : 'border-l-transparent text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-serif">{asset.symbol}</span>
                    <span className={`ml-2 text-xs font-light ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{asset.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-light">${asset.price.toLocaleString()}</div>
                    <div className={`text-xs ${asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                    </div>
                  </div>
                </div>
              </button>
            ))}
            
            {stockAssets.length === 0 && (
              <div className={`px-6 py-3 text-sm font-light ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Keine Ergebnisse gefunden
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 px-4 text-center text-xs pb-6">
        <div className="flex justify-center items-center mb-2">
          <Image 
            src={darkMode ? "/stratify-logo-transparent-weiß.png" : "/stratify-logo-transparent-schwarz.png"} 
            alt="Stratify Logo" 
            width={20} 
            height={20}
            className="mr-1"
          />
          <span className="text-red-500 tracking-wider uppercase text-xs">Stratify</span>
        </div>
        <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Daten in Echtzeit</p>
      </div>
    </div>
  );
};

export default AssetSidebar;