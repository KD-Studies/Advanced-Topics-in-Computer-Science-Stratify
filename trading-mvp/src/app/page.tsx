"use client";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white min-h-screen px-6 py-12">
      {/* Blur Background Glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 opacity-20 rounded-full filter blur-3xl z-0 animate-pulse"></div>

      {/* Hero */}
      <div className="z-10 max-w-4xl text-center mx-auto mb-24">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Trade Smarter
          </span>{' '}
          with AI.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Simplify your strategy, amplify your success
        </p>
        <button
          onClick={() => router.push('/auth/login')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg transition transform hover:scale-105"
        >
          Get Started
        </button>
      </div>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 z-10 relative">
        {/* Basic */}
        <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-purple-600/30 transition hover:scale-105">
          <h3 className="text-2xl font-semibold mb-2">Basic</h3>
          <p className="text-gray-400 mb-4">Für Einsteiger, die mit kleinen Beträgen traden wollen.</p>
          <p className="text-4xl font-bold mb-6">19,99€</p>
          <ul className="text-gray-300 space-y-2 mb-6">
            <li>✓ 1 aktiver Trade</li>
            <li>✓ Standard KI-Modell</li>
            <li>✓ Basis-Dashboard</li>
          </ul>
          <button
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
            onClick={() => router.push('/auth/login')}
          >
            Wählen
          </button>
        </div>

        {/* Pro */}
        <div className="bg-gradient-to-br from-purple-700 to-pink-600 rounded-xl p-6 text-white shadow-lg hover:shadow-pink-500/40 transition hover:scale-105 transform scale-105">
          <h3 className="text-2xl font-semibold mb-2">Pro</h3>
          <p className="text-white/80 mb-4">Ideal für aktive Trader mit erweiterten Bedürfnissen.</p>
          <p className="text-4xl font-bold mb-6">34,99€</p>
          <ul className="space-y-2 mb-6">
            <li>✓ Bis zu 3 Trades gleichzeitig</li>
            <li>✓ KI mit höherer Präzision</li>
            <li>✓ Performance Analytics</li>
          </ul>
          <button
            className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition font-semibold"
            onClick={() => router.push('/auth/login')}
          >
            Meist gewählt
          </button>
        </div>

        {/* Deluxe */}
        <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-purple-600/30 transition hover:scale-105">
          <h3 className="text-2xl font-semibold mb-2">Deluxe</h3>
          <p className="text-gray-400 mb-4">Für Profis & Power-User mit Vollzugriff.</p>
          <p className="text-4xl font-bold mb-6">49,99€</p>
          <ul className="text-gray-300 space-y-2 mb-6">
            <li>✓ Unlimitierte Trades</li>
            <li>✓ Custom KI-Strategien</li>
            <li>✓ Priorisierter Support</li>
          </ul>
          <button
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
            onClick={() => router.push('/auth/login')}
          >
            Wählen
          </button>
        </div>
      </section>
    </main>
  );
}
