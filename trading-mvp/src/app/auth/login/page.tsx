"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext'; // Theme-Hook importieren
import Footer from '@/components/Footer';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { darkMode } = useTheme(); // Dark Mode-Status abrufen

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier würde normalerweise die Login-Logik stehen
    router.push('/depot');
  };

  return (
    <main className={`min-h-screen flex flex-col ${darkMode ? 'bg-stone-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>

      {/* Header mit Logo */}
      <header className="py-8 text-center relative z-10">
        <div className="flex items-center justify-center">
          <Image 
            src={darkMode ? "/stratify-logo-transparent-weiß.png" : "/stratify-logo-transparent-schwarz.png"}
            alt="Stratify Logo" 
            width={40} 
            height={40}
            className="mr-2"
          />
          <span className="text-sm font-light text-red-500 tracking-widest uppercase ml-1">Stratify</span>
        </div>
      </header>
      
      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-serif mb-10 text-center">Anmelden</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className={`block text-sm font-light ${darkMode ? 'text-stone-400' : 'text-gray-600'} mb-2`}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 border focus:ring-1 focus:ring-red-500 focus:outline-none font-light transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-stone-800 text-white border-stone-700' 
                    : 'bg-white text-gray-900 border-gray-300'
                }`}
                required
              />
            </div>
            
            <div>
              <label className={`block text-sm font-light ${darkMode ? 'text-stone-400' : 'text-gray-600'} mb-2`}>Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 border focus:ring-1 focus:ring-red-500 focus:outline-none font-light transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-stone-800 text-white border-stone-700' 
                    : 'bg-white text-gray-900 border-gray-300'
                }`}
                required
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className={`w-full py-3 border text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 font-light tracking-wide ${
                  darkMode 
                    ? 'bg-stone-900 border-red-500' 
                    : 'bg-white border-red-500'
                }`}
              >
                ANMELDEN
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center text-sm font-light">
            <p className={darkMode ? 'text-stone-400' : 'text-gray-600'}>
              Noch kein Konto?{' '}
              <Link href="/auth/register" className="text-red-500 hover:underline">
                Registrieren
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}