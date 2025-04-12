"use client";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-[#1e1e1e] border border-gray-700 rounded-xl p-8 shadow-lg text-white">
        <h1 className="text-3xl font-extrabold mb-6 text-center">Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Optional: Login-Logik hier
            router.push('/depot');
          }}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 font-semibold">E-Mail</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Passwort</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 rounded bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold transition transform hover:scale-105"
          >
            Einloggen
          </button>
        </form>
        <button
          onClick={() => router.push('/')}
          className="mt-4 text-sm text-gray-400 hover:text-gray-200 transition"
        >
          Zurück zur Startseite
        </button>
      </div>
    </main>
  );
}