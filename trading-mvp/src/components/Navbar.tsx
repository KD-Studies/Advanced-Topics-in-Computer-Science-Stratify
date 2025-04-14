"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

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
    <div className="hidden md:block w-64 bg-white border-r border-gray-100 fixed left-0 top-16 bottom-0 overflow-y-auto z-30 pt-6">
      <div className="px-4 mb-6">
        <h3 className="text-xl font-serif text-gray-900 mb-4">Assets</h3>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-gray-800 text-sm border border-gray-200 rounded-none p-2 pl-8 focus:ring-1 focus:ring-red-500 focus:outline-none font-light"
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

      {/* Kryptowährungen */}
      <div className="mb-4">
        <button 
          onClick={() => toggleSection('crypto')}
          className="flex justify-between items-center w-full px-4 py-2 text-left font-serif text-gray-800 hover:bg-gray-50"
        >
          <span>Kryptowährungen</span>
          <svg 
            className={`w-4 h-4 text-gray-600 transition-transform ${expandedSections.crypto ? 'transform rotate-180' : ''}`} 
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
                    ? 'border-l-red-500 bg-gray-50 text-gray-900' 
                    : 'border-l-transparent text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-serif">{asset.symbol}</span>
                    <span className="ml-2 text-xs text-gray-500 font-light">{asset.name}</span>
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
              <div className="px-6 py-3 text-sm text-gray-500 font-light">
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
          className="flex justify-between items-center w-full px-4 py-2 text-left font-serif text-gray-800 hover:bg-gray-50"
        >
          <span>Aktien</span>
          <svg 
            className={`w-4 h-4 text-gray-600 transition-transform ${expandedSections.stocks ? 'transform rotate-180' : ''}`} 
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
                    ? 'border-l-red-500 bg-gray-50 text-gray-900' 
                    : 'border-l-transparent text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-serif">{asset.symbol}</span>
                    <span className="ml-2 text-xs text-gray-500 font-light">{asset.name}</span>
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
              <div className="px-6 py-3 text-sm text-gray-500 font-light">
                Keine Ergebnisse gefunden
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 px-4 text-center text-xs text-gray-500 font-light pb-6">
        <div className="flex justify-center items-center mb-2">
          <Image 
            src="/stratify-logo-transparent-schwarz.png" 
            alt="Stratify Logo" 
            width={20} 
            height={20}
            className="mr-1"
          />
          <span className="text-red-500 tracking-wider uppercase text-xs">Stratify</span>
        </div>
        <p>Daten in Echtzeit</p>
      </div>
    </div>
  );
};

interface NavbarProps {
  username?: string;
}

const Navbar = ({ username = 'Demo User' }: NavbarProps) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode } = useTheme();

  return (
    <nav className={`${darkMode ? 'bg-stone-900 border-stone-800 text-white' : 'bg-white border-gray-100 text-gray-900'} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => router.push('/depot')}>
              <div className="flex items-center space-x-2">
                <Image 
                  src={darkMode ? "/stratify-logo-transparent-weiß.png" : "/stratify-logo-transparent-schwarz.png"}
                  alt="Stratify Logo" 
                  width={40} 
                  height={40}
                  className="mr-1"
                />
                <span className="text-sm font-light text-red-500 tracking-widest uppercase">Stratify</span>
              </div>
            </div>
            
            {/* Desktop Navigation - GEÄNDERT */}
            <div className="hidden md:flex ml-12 space-x-12">
              <button 
                onClick={() => router.push('/depot')}
                className={`text-sm font-light ${darkMode ? 'text-stone-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                Portfolio
              </button>
              <button 
                onClick={() => router.push('/chartsuche')}
                className={`text-sm font-light ${darkMode ? 'text-stone-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                Assetsuche
              </button>
              <button 
                onClick={() => router.push('/backtest')}
                className={`text-sm font-light ${darkMode ? 'text-stone-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                Strategie
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Theme Toggle */}
            <div className="mr-6">
              <ThemeToggle />
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className={`flex items-center text-sm font-light ${darkMode ? 'text-stone-300' : 'text-gray-700'} focus:outline-none`}
              >
                <span className="mr-2">{username}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {menuOpen && (
                <div className={`absolute right-0 mt-2 w-48 py-2 ${darkMode ? 'bg-stone-800 border-stone-700' : 'bg-white border-gray-100'} border shadow-lg rounded-none z-50`}>
                  <button 
                    onClick={() => {
                      setMenuOpen(false);
                      router.push('/profile');
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-stone-300 hover:bg-stone-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Profil
                  </button>
                  <button 
                    onClick={() => {
                      setMenuOpen(false);
                      router.push('/settings');
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-stone-300 hover:bg-stone-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Einstellungen
                  </button>
                  <button 
                    onClick={() => {
                      setMenuOpen(false);
                      router.push('/auth/login');
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-stone-300 hover:bg-stone-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Abmelden
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Menu - GEÄNDERT */}
        {menuOpen && (
          <div className={`md:hidden pb-4 border-t ${darkMode ? 'border-stone-800' : 'border-gray-100'} transition-colors duration-300`}>
            <div className="flex flex-col space-y-3 pt-3">
              <button 
                onClick={() => {
                  router.push('/depot');
                  setMenuOpen(false);
                }} 
                className={`text-sm ${darkMode ? 'text-stone-300 hover:text-red-400' : 'text-gray-900 hover:text-red-500'} font-light py-2 transition-colors duration-300`}
              >
                Portfolio
              </button>
              <button 
                onClick={() => {
                  router.push('/chartsuche');
                  setMenuOpen(false);
                }} 
                className={`text-sm ${darkMode ? 'text-stone-300 hover:text-red-400' : 'text-gray-900 hover:text-red-500'} font-light py-2 transition-colors duration-300`}
              >
                Assetsuche
              </button>
              <button 
                onClick={() => {
                  router.push('/backtest');
                  setMenuOpen(false);
                }} 
                className={`text-sm ${darkMode ? 'text-stone-300 hover:text-red-400' : 'text-gray-900 hover:text-red-500'} font-light py-2 transition-colors duration-300`}
              >
                Strategie
              </button>
              <div className={`pt-3 border-t ${darkMode ? 'border-stone-800 text-stone-300' : 'border-gray-100 text-gray-700'} text-sm font-light transition-colors duration-300`}>
                {username}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;