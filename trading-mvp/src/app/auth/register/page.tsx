"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<string>('pro'); // Default to Pro
  
  useEffect(() => {
    // Überprüfe, ob ein Plan in den URL-Parametern vorhanden ist
    const planParam = searchParams.get('plan');
    if (planParam && ['basic', 'pro', 'deluxe'].includes(planParam)) {
      setSelectedPlan(planParam);
    }
  }, [searchParams]);

  return (
    <main className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] min-h-screen flex flex-col items-center p-6">
      {/* Blur Background Glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 opacity-20 rounded-full filter blur-3xl z-0 animate-pulse"></div>
      
      <div className="w-full max-w-4xl bg-[#1e1e1e] border border-gray-700 rounded-xl p-8 shadow-lg text-white mt-10 z-10">
        <h1 className="text-3xl font-extrabold mb-6 text-center">Registrieren</h1>
        
        {/* Plan Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Wähle deinen Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Basic Plan */}
            <div 
              className={`border ${selectedPlan === 'basic' 
                ? 'border-purple-500 bg-[#2a2a2a]' 
                : 'border-gray-700 bg-[#1e1e1e]'} 
                rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition`}
              onClick={() => setSelectedPlan('basic')}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Basic</h3>
                <span className="text-sm bg-gray-800 px-2 py-1 rounded">19,99€</span>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>✓ 1 aktiver Trade</li>
                <li>✓ Standard KI-Modell</li>
                <li>✓ Basis-Dashboard</li>
              </ul>
              {selectedPlan === 'basic' && (
                <div className="mt-3 text-xs text-center text-white py-1 rounded">
                  Aktuell ausgewählt
                </div>
              )}
            </div>
            
            {/* Pro Plan */}
            <div 
              className={`border ${selectedPlan === 'pro' 
                ? 'border-purple-500 bg-gradient-to-br from-purple-700/40 to-pink-600/40' 
                : 'border-gray-700 bg-[#1e1e1e]'} 
                rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition relative`}
              onClick={() => setSelectedPlan('pro')}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">Pro</h3>
                  <span className="ml-2 text-xs bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-0.5 rounded">
                    Meist gewählt
                  </span>
                </div>
                <span className="text-sm bg-gray-800 px-2 py-1 rounded">34,99€</span>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>✓ Bis zu 3 Trades gleichzeitig</li>
                <li>✓ KI mit höherer Präzision</li>
                <li>✓ Performance Analytics</li>
              </ul>
              {selectedPlan === 'pro' && (
                <div className="mt-3 text-xs text-center text-white py-1 rounded">
                  Aktuell ausgewählt
                </div>
              )}
            </div>
            
            {/* Deluxe Plan */}
            <div 
              className={`border ${selectedPlan === 'deluxe' 
                ? 'border-purple-500 bg-[#2a2a2a]' 
                : 'border-gray-700 bg-[#1e1e1e]'} 
                rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition`}
              onClick={() => setSelectedPlan('deluxe')}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Deluxe</h3>
                <span className="text-sm bg-gray-800 px-2 py-1 rounded">49,99€</span>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>✓ Unlimitierte Trades</li>
                <li>✓ Custom KI-Strategien</li>
                <li>✓ Priorisierter Support</li>
              </ul>
              {selectedPlan === 'deluxe' && (
                <div className="mt-3 text-xs text-center text-white py-1 rounded">
                  Aktuell ausgewählt
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Registration Form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            // Hier würde die Registrierungslogik implementiert werden
            router.push('/depot');
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Vorname</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Nachname</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-1 font-semibold">E-Mail</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 font-semibold">Passwort</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 font-semibold">Passwort bestätigen</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-300">
              Ich akzeptiere die <a href="#" className="text-purple-400 hover:underline">AGB</a> und <a href="#" className="text-purple-400 hover:underline">Datenschutzbestimmungen</a>
            </label>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold transition transform hover:scale-105"
          >
            Konto erstellen
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Bereits registriert? {' '}
            <button
              onClick={() => router.push('/auth/login')}
              className="text-purple-400 hover:underline"
            >
              Hier einloggen
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}