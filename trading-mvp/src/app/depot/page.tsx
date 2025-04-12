"use client";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import Navbar from '@/components/Navbar'; // Importiere die Navbar
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

// Chart.js Setup
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Depot = () => {
  const router = useRouter();
  const chartRef = useRef(null);

  // Statische Kryptowährungs-Daten
  const [cryptos] = useState([
    { name: 'Bitcoin', symbol: 'BTC', amount: 1.2, price: 50000 },
    { name: 'Ethereum', symbol: 'ETH', amount: 5.3, price: 1800 },
    { name: 'Litecoin', symbol: 'LTC', amount: 10.8, price: 250 },
  ]);

  // Vermögen berechnen
  const totalWealth = cryptos.reduce((acc, crypto) => acc + crypto.amount * crypto.price, 0);

  // Chart-Daten (Dummy-Daten für Chart)
  const [chartData] = useState({
    labels: ['01', '02', '03', '04', '05', '06', '07'],
    datasets: [
      {
        label: 'Depot Wert',
        data: [45000, 46000, 48000, 50000, 51000, 52000, 53000],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  });

  return (
    <main className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white min-h-screen">
      <Navbar username="John Doe" /> {/* Ersetze mit dem tatsächlichen Benutzernamen */}
      
      <div className="px-6 py-12">
        {/* Blur Background Glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 opacity-20 rounded-full filter blur-3xl z-0 animate-pulse"></div>

        {/* Depot Overview */}
        <div className="z-10 max-w-4xl text-center mx-auto mb-24">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Dein Depot
            </span>{' '}
            Überblick
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10">
            Dein aktuelles Vermögen: <span className="font-semibold">{totalWealth.toFixed(2)} €</span>
          </p>
        </div>

        {/* Chart Section */}
        <div className="mb-10 z-10">
          <h3 className="text-xl font-semibold mb-4 text-center">Vermögensentwicklung</h3>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg" style={{ height: "300px" }}>
            <Line ref={chartRef} data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Kryptoliste */}
        <div className="z-10 max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Deine Kryptowährungen</h3>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700">
                <tr>
                  <th className="px-6 py-3">Krypto</th>
                  <th className="px-6 py-3">Menge</th>
                  <th className="px-6 py-3">Preis pro Einheit (€)</th>
                  <th className="px-6 py-3">Gesamtwert (€)</th>
                </tr>
              </thead>
              <tbody>
                {cryptos.map((crypto, idx) => (
                  <tr key={idx} className="border-b border-gray-700">
                    <td className="px-6 py-4">{crypto.name} ({crypto.symbol})</td>
                    <td className="px-6 py-4">{crypto.amount}</td>
                    <td className="px-6 py-4">{crypto.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{(crypto.amount * crypto.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Depot;
