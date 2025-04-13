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
          <div className="flex justify-end">
            <button type="button" className="text-xs text-purple-400 hover:text-purple-300">
              Passwort vergessen?
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 rounded bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold transition transform hover:scale-105"
          >
            Einloggen
          </button>
        </form>
        
        <div className="mt-6 text-center border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400 mb-2">
            Noch kein Konto? 
          </p>
          <button
            onClick={() => router.push('/auth/register')}
            className="w-full py-2 rounded border border-purple-500 text-purple-400 hover:bg-purple-500/10 font-medium transition"
          >
            Jetzt registrieren
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-gray-400 hover:text-gray-200 transition"
          >
            Zurück zur Startseite
          </button>
        </div>
      </div>
    </main>
  );
}