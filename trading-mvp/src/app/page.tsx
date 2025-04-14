"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle'; // ThemeToggle importieren
import { useTheme } from '@/context/ThemeContext'; // Theme-Hook importieren

export default function Home() {
  const router = useRouter();
  const [animateIn, setAnimateIn] = useState(false);
  const { darkMode } = useTheme(); // Aktuellen Theme-Status abrufen

  // Funktion zum Scrollen zum Angebote-Abschnitt
  const scrollToOffers = () => {
    const offersSection = document.getElementById('angebote');
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  return (
    <main className={`min-h-screen overflow-hidden ${darkMode ? 'bg-stone-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Theme Toggle in der oberen rechten Ecke */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      {/* Vertikale Linie als Design-Element */}
      <div className={`fixed h-screen w-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} left-1/2 -translate-x-1/2 z-0 transition-colors duration-300`}></div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 z-10">
        <div className={`transition-opacity duration-1000 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
          {/* Logo - dynamisch je nach Theme */}
          <div className="flex flex-col items-center mb-24">
            <Image 
              src={darkMode ? "/stratify-logo-transparent-weiß.png" : "/stratify-logo-transparent-schwarz.png"} 
              alt="Stratify Logo" 
              width={500} 
              height={480}
              className="mb-4"
            />
            <span className="text-red-500 tracking-[0.5em] uppercase text-xl font-light mt-2">
              
            </span>
          </div>
          
          {/* Tagline */}
          <h2 className="text-2xl font-light text-center tracking-wide max-w-2xl mx-auto mb-20">
            Simplify your strategy, amplify your success
          </h2>
          
          {/* CTA Buttons */}
          <div className="text-center flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button 
              onClick={scrollToOffers} 
              className={`px-10 py-3 transition-colors duration-300 tracking-wide ${
                darkMode 
                  ? 'bg-red-500 text-stone-900 hover:bg-red-600' 
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              STARTEN
            </button>
            
            <button 
              onClick={() => router.push('/auth/login')} 
              className={`px-10 py-3 border transition-colors duration-300 tracking-wide ${
                darkMode 
                  ? 'border-red-500 text-red-400 hover:bg-red-500 hover:text-gray-900' 
                  : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
              }`}
            >
              LOGIN
            </button>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="angebote" className={`py-32 px-6 relative z-10 ${darkMode ? 'bg-stone-800' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-serif mb-20 text-center relative">
            <span className="relative">
              Unsere Angebote
              <span className="absolute -bottom-4 left-0 right-0 h-px bg-red-400"></span>
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Basic */}
            <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} border p-16 shadow-sm hover:shadow-md transition-shadow duration-300`}>
              <h4 className="font-serif text-2xl mb-2">Basic</h4>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-light mb-8`}>Für Einsteiger, die mit kleinen Beträgen traden wollen.</p>
              <p className="text-4xl font-serif mb-12">19,99€</p>
              
              <ul className="space-y-3 mb-12 font-light">
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">—</span>
                  1 aktiver Trade
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">—</span>
                  Standard KI-Modell
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">—</span>
                  Basis-Dashboard
                </li>
              </ul>
              
              <button 
                className={`w-full py-3 border transition-colors duration-300 font-light tracking-wide ${
                  darkMode
                    ? 'border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400'
                    : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
                }`}
                onClick={() => router.push('/auth/register?plan=basic')}
              >
                WÄHLEN
              </button>
            </div>
            
            {/* Pro */}
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} border border-red-400 p-16 shadow-md relative`}>
              <div className="absolute -top-3 right-10 bg-red-500 text-white text-xs font-serif tracking-widest py-1 px-3">
                EMPFOHLEN
              </div>
              
              <h4 className="font-serif text-2xl mb-2">Pro</h4>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-light mb-8`}>Ideal für aktive Trader mit erweiterten Bedürfnissen.</p>
              <p className="text-4xl font-serif mb-12">34,99€</p>
              
              <ul className="space-y-3 mb-12 font-light">
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">—</span>
                  Bis zu 3 Trades gleichzeitig
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">—</span>
                  KI mit höherer Präzision
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">—</span>
                  Performance Analytics
                </li>
              </ul>
              
              <button 
                className={`w-full py-3 transition-colors duration-300 font-light tracking-wide ${
                  darkMode
                    ? 'bg-red-500 text-gray-900 hover:bg-red-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
                onClick={() => router.push('/auth/register?plan=pro')}
              >
                WÄHLEN
              </button>
            </div>
            
            {/* Deluxe */}
            <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} border p-16 shadow-sm hover:shadow-md transition-shadow duration-300`}>
              <h4 className="font-serif text-2xl mb-2">Deluxe</h4>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-light mb-8`}>Für Profis & Power-User mit Vollzugriff.</p>
              <p className="text-4xl font-serif mb-12">49,99€</p>
              
              <ul className="space-y-3 mb-12 font-light">
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">—</span>
                  Unlimitierte Trades
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">—</span>
                  Custom KI-Strategien
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">—</span>
                  Priorisierter Support
                </li>
              </ul>
              
              <button 
                className={`w-full py-3 border transition-colors duration-300 font-light tracking-wide ${
                  darkMode
                    ? 'border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400'
                    : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
                }`}
                onClick={() => router.push('/auth/register?plan=deluxe')}
              >
                WÄHLEN
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer mit Dark Mode-Unterstützung */}
      <Footer />
    </main>
  );
}
