"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { useTheme } from '@/context/ThemeContext'; // Theme-Hook importieren
import ThemeToggle from '@/components/ThemeToggle'; // ThemeToggle importieren

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get('plan') || 'basic';
  const { darkMode } = useTheme(); // Dark Mode-Status abrufen
  
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier würde die Registrierungslogik mit dem ausgewählten Plan implementiert werden
    console.log('Registrierung mit Plan:', selectedPlan);
    router.push('/depot');
  };

  // Planinformationen
  const plans = {
    basic: {
      name: "Basic",
      price: "19,99€",
      features: [
        "1 aktiver Trade",
        "Standard KI-Modell",
        "Basis-Dashboard"
      ],
      recommended: false
    },
    pro: {
      name: "Pro",
      price: "34,99€",
      features: [
        "Bis zu 3 Trades gleichzeitig",
        "KI mit höherer Präzision",
        "Performance Analytics"
      ],
      recommended: true
    },
    deluxe: {
      name: "Deluxe",
      price: "49,99€",
      features: [
        "Unlimitierte Trades",
        "Custom KI-Strategien",
        "Priorisierter Support"
      ],
      recommended: false
    }
  };

  return (
    <main className={`min-h-screen flex flex-col ${darkMode ? 'bg-stone-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>

      {/* Header mit Logo und ThemeToggle */}
      <header className="py-8 text-center relative z-10">
        <div className="flex items-center justify-center">
          <Image 
            src="/stratify-logo-transparent-schwarz.png" 
            alt="Stratify Logo" 
            width={40} 
            height={40}
            className="mr-2"
          />
          <span className="text-sm font-light text-red-500 tracking-widest uppercase ml-1">Stratify</span>
        </div>
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
      </header>
      
      {/* Register Form */}
      <div className="flex-grow flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-3xl">
          <h1 className="text-3xl font-serif mb-8 text-center">Registrieren</h1>
          
          {/* Plan Selection */}
          <div className="mb-16">
            <h2 className="text-xl font-serif mb-6 text-center">Wählen Sie Ihren Plan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(plans).map(([planId, plan]) => (
                <div 
                  key={planId}
                  className={`relative border-t pt-6 cursor-pointer transition-colors
                    ${selectedPlan === planId ? 'border-red-500' : darkMode ? 'border-stone-700' : 'border-gray-100'}
                    ${plan.recommended ? 'pb-10' : 'pb-6'}
                  `}
                  onClick={() => setSelectedPlan(planId)}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 right-0 bg-red-500 text-white text-xs py-1 px-3 font-light tracking-wider">
                      EMPFOHLEN
                    </div>
                  )}
                  
                  <h3 className="text-xl font-serif mb-2">
                    {plan.name}
                  </h3>
                  
                  <p className="text-2xl font-serif mb-4">{plan.price}</p>
                  
                  <ul className="space-y-2 mb-6 text-sm font-light">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-red-500 mr-2">—</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div 
                    className={`absolute bottom-0 left-0 h-1 transition-all duration-300
                      ${selectedPlan === planId ? 'bg-red-500 w-full' : 'bg-transparent w-0'}
                    `}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Personal Information */}
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-xl font-serif mb-6 text-center">Persönliche Informationen</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-light text-gray-600 mb-2">Vorname</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-3 border focus:ring-1 focus:ring-red-500 focus:outline-none font-light transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-stone-800 text-white border-stone-700 placeholder-stone-500' 
                        : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-600 mb-2">Nachname</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full p-3 border focus:ring-1 focus:ring-red-500 focus:outline-none font-light transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-stone-800 text-white border-stone-700 placeholder-stone-500' 
                        : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
                    }`}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-light text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border focus:ring-1 focus:ring-red-500 focus:outline-none font-light transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-stone-800 text-white border-stone-700 placeholder-stone-500' 
                      : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
                  }`}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-light text-gray-600 mb-2">Passwort</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-3 border focus:ring-1 focus:ring-red-500 focus:outline-none font-light transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-stone-800 text-white border-stone-700 placeholder-stone-500' 
                      : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
                  }`}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-light text-gray-600 mb-2">Passwort bestätigen</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full p-3 border focus:ring-1 focus:ring-red-500 focus:outline-none font-light transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-stone-800 text-white border-stone-700 placeholder-stone-500' 
                      : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
                  }`}
                  required
                />
              </div>
              
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-3 bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 font-light tracking-wide"
                >
                  KONTO ERSTELLEN MIT {plans[selectedPlan as keyof typeof plans].name.toUpperCase()}
                </button>
              </div>
            </form>
            
            <div className="mt-8 text-center text-sm text-gray-600 font-light">
              <p>
                Bereits registriert?{' '}
                <Link href="/auth/login" className="text-red-500 hover:underline">
                  Anmelden
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Verwende die Footer-Komponente anstelle des eingebetteten Footers */}
      <Footer />
    </main>
  );
}