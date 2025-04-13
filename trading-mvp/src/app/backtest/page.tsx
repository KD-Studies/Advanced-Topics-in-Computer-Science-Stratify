"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // Footer importieren
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
} from 'chart.js';

// Registrieren der benötigten Chart.js Komponenten
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Backtest() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('design');
  const [selectedStrategy, setSelectedStrategy] = useState('strategy1');
  const { darkMode } = useTheme(); // Dark Mode-Status abrufen
  
  // Mock-Daten für Backtest-Ergebnisse
  const backtestResults = {
    strategy1: {
      name: "Momentum Strategie",
      winRate: 67,
      totalTrades: 43,
      profitFactor: 2.31,
      maxDrawdown: 12.4,
      annualReturn: 28.7,
      chart: {
        labels: Array.from({ length: 24 }, (_, i) => `${i + 1}`),
        datasets: [
          {
            label: 'Strategie Performance',
            data: [10000, 10200, 10600, 10400, 10900, 11200, 11100, 11500, 12100, 12300, 12200, 12500, 
                  12700, 13100, 13400, 13200, 13000, 13500, 14200, 14100, 14600, 15200, 15800, 16400],
            borderColor: '#c81e1e',
            backgroundColor: 'rgba(200, 30, 30, 0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'S&P 500',
            data: [10000, 10100, 10150, 10300, 10250, 10400, 10500, 10600, 10850, 11000, 10900, 11100,
                  11300, 11400, 11600, 11550, 11700, 11800, 12000, 12100, 12300, 12500, 12600, 12800],
            borderColor: '#888',
            backgroundColor: 'rgba(136, 136, 136, 0.1)',
            borderDash: [5, 5],
            tension: 0.4,
            fill: false,
          }
        ]
      }
    },
    strategy2: {
      name: "Trendfolge Strategie",
      winRate: 58,
      totalTrades: 35,
      profitFactor: 1.85,
      maxDrawdown: 15.2,
      annualReturn: 22.1,
      chart: {
        labels: Array.from({ length: 24 }, (_, i) => `${i + 1}`),
        datasets: [
          {
            label: 'Strategie Performance',
            data: [10000, 10100, 10400, 10300, 10600, 10900, 11200, 11100, 11400, 11800, 11700, 12100,
                  12200, 12500, 12300, 12700, 13100, 13500, 13700, 14000, 14300, 14200, 14500, 15100],
            borderColor: '#c81e1e',
            backgroundColor: 'rgba(200, 30, 30, 0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'S&P 500',
            data: [10000, 10100, 10150, 10300, 10250, 10400, 10500, 10600, 10850, 11000, 10900, 11100,
                  11300, 11400, 11600, 11550, 11700, 11800, 12000, 12100, 12300, 12500, 12600, 12800],
            borderColor: '#888',
            backgroundColor: 'rgba(136, 136, 136, 0.1)',
            borderDash: [5, 5],
            tension: 0.4,
            fill: false,
          }
        ]
      }
    }
  };

  const selectedBacktest = backtestResults[selectedStrategy as keyof typeof backtestResults];

  return (
    <main className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <Navbar username="John Doe" />
      
      {/* Container ohne max-w-7xl, damit volle Breite genutzt wird */}
      <div className="flex-grow w-full">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-16">
            <h1 className="text-4xl font-serif">Strategie</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-light mt-3 transition-colors duration-300`}>
              Gestalten und testen Sie Ihre eigene Trading-Strategie
            </p>
          </div>
          
          {/* Strategy Tabs */}
          <div className="mb-12">
            <div className="border-b border-gray-100">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('design')}
                  className={`pb-4 text-sm font-light ${activeTab === 'design' ? 'border-b border-red-500 text-red-500' : 'text-gray-500'}`}
                >
                  Design
                </button>
                <button
                  onClick={() => setActiveTab('backtest')}
                  className={`pb-4 text-sm font-light ${activeTab === 'backtest' ? 'border-b border-red-500 text-red-500' : 'text-gray-500'}`}
                >
                  Backtest
                </button>
                <button
                  onClick={() => setActiveTab('deploy')}
                  className={`pb-4 text-sm font-light ${activeTab === 'deploy' ? 'border-b border-red-500 text-red-500' : 'text-gray-500'}`}
                >
                  Aktivieren
                </button>
              </div>
            </div>
          </div>
          
          {activeTab === 'design' && (
            <div>
              <div className="mb-12">
                <h2 className="text-2xl font-serif mb-8">Strategie entwickeln</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div 
                    className={`cursor-pointer border-t ${selectedStrategy === 'strategy1' ? 'border-red-400' : 'border-gray-200'} pt-6`}
                    onClick={() => setSelectedStrategy('strategy1')}
                  >
                    <h3 className="text-xl font-serif mb-2">Momentum Strategie</h3>
                    <p className="text-gray-500 font-light">Basiert auf Preisdynamik und kurzfristigen Trends.</p>
                    {selectedStrategy === 'strategy1' && (
                      <div className="mt-4 text-red-500 text-sm">Ausgewählt</div>
                    )}
                  </div>
                  
                  <div 
                    className={`cursor-pointer border-t ${selectedStrategy === 'strategy2' ? 'border-red-400' : 'border-gray-200'} pt-6`}
                    onClick={() => setSelectedStrategy('strategy2')}
                  >
                    <h3 className="text-xl font-serif mb-2">Trendfolge Strategie</h3>
                    <p className="text-gray-500 font-light">Identifiziert und folgt langfristigen Markttrends.</p>
                    {selectedStrategy === 'strategy2' && (
                      <div className="mt-4 text-red-500 text-sm">Ausgewählt</div>
                    )}
                  </div>
                  
                  <div 
                    className="cursor-pointer border-t border-gray-200 pt-6"
                  >
                    <h3 className="text-xl font-serif mb-2">+ Neue Strategie</h3>
                    <p className="text-gray-500 font-light">Erstellen Sie eine eigene Trading-Strategie.</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-serif text-xl mb-6">Parameter</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <div>
                      <label className="block text-sm font-light text-gray-600 mb-2">Signalschwelle</label>
                      <input type="range" min="0" max="100" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-600 mb-2">Stop-Loss (%)</label>
                      <input type="range" min="0" max="100" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-600 mb-2">Take-Profit (%)</label>
                      <input type="range" min="0" max="100" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-600 mb-2">Haltedauer (Tage)</label>
                      <input type="range" min="0" max="100" className="w-full" />
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <button 
                    onClick={() => setActiveTab('backtest')} 
                    className="st-button-primary"
                  >
                    Backtest starten
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'backtest' && (
            <div>
              <h2 className="text-2xl font-serif mb-8">{selectedBacktest.name} - Backtest Ergebnisse</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="border-t border-gray-200 pt-6">
                  <div className="text-gray-500 text-sm font-light mb-2">Win-Rate</div>
                  <div className="text-2xl font-serif">{selectedBacktest.winRate}%</div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <div className="text-gray-500 text-sm font-light mb-2">Trades</div>
                  <div className="text-2xl font-serif">{selectedBacktest.totalTrades}</div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <div className="text-gray-500 text-sm font-light mb-2">Max. Drawdown</div>
                  <div className="text-2xl font-serif">-{selectedBacktest.maxDrawdown}%</div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <div className="text-gray-500 text-sm font-light mb-2">Jährl. Rendite</div>
                  <div className="text-2xl font-serif">{selectedBacktest.annualReturn}%</div>
                </div>
              </div>
              
              <div className="mb-12">
                <div className="chart-container p-0 mb-4">
                  <div style={{ height: "400px" }}>
                    <Line 
                      data={selectedBacktest.chart} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                            labels: {
                              font: { family: "'Inter', sans-serif", size: 10 },
                              boxWidth: 12
                            }
                          },
                          tooltip: {
                            backgroundColor: 'white',
                            titleColor: '#1a1a1a',
                            bodyColor: '#555555',
                            borderColor: '#e5e5e5',
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
                          }
                        },
                        scales: {
                          x: {
                            grid: { color: 'rgba(0, 0, 0, 0.03)' },
                            ticks: { 
                              color: '#888',
                              font: { family: "'Inter', sans-serif", size: 10 }
                            },
                          },
                          y: {
                            grid: { color: 'rgba(0, 0, 0, 0.03)' },
                            ticks: {
                              color: '#888',
                              font: { family: "'Inter', sans-serif", size: 10 },
                              callback: function(value) {
                                return '$' + value.toLocaleString();
                              }
                            },
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="text-right">
                  <button 
                    onClick={() => setActiveTab('deploy')} 
                    className="st-button-primary"
                  >
                    Strategie aktivieren
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'deploy' && (
            <div>
              <h2 className="text-2xl font-serif mb-8">Strategie aktivieren</h2>
              
              <div className="bg-white border border-gray-100 p-8 mb-12">
                <h3 className="font-serif text-xl mb-6">Einstellungen</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-sm font-light text-gray-600 mb-2">Ausgewählte Strategie</label>
                    <div className="st-input flex items-center">
                      {selectedBacktest.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-light text-gray-600 mb-2">Asset-Klasse</label>
                    <select className="st-input">
                      <option>Kryptowährungen</option>
                      <option>Aktien</option>
                      <option>Beide</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-light text-gray-600 mb-2">Kapitalzuweisung pro Trade</label>
                    <select className="st-input">
                      <option>5% des Portfolios</option>
                      <option>10% des Portfolios</option>
                      <option>15% des Portfolios</option>
                      <option>Fester Betrag</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-light text-gray-600 mb-2">Signalbenachrichtigungen</label>
                    <select className="st-input">
                      <option>E-Mail + Push</option>
                      <option>Nur E-Mail</option>
                      <option>Nur Push</option>
                      <option>Keine Benachrichtigungen</option>
                    </select>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-8 flex justify-end">
                  <button className="st-button-primary">
                    Strategie jetzt aktivieren
                  </button>
                </div>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-gray-500 font-light">
                  Die Strategie wird nach der Aktivierung automatisch Signale generieren.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer compact={true} />
    </main>
  );
}