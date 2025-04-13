"use client";
import { useRouter } from 'next/navigation';

interface NavbarProps {
  username?: string;
}

const Navbar = ({ username = 'Demo User' }: NavbarProps) => {
  const router = useRouter();

  return (
    <nav className="bg-[#1e1e1e] border-b border-gray-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Stratify</span>
            </div>
            <div className="ml-6 flex items-center space-x-4">
              <button 
                onClick={() => router.push('/depot')} 
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
              >
                Home
              </button>
              <button 
                onClick={() => router.push('/chartsuche')} 
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
              >
                Chartsuche
              </button>
              <button 
                onClick={() => router.push('/backtest')} 
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
              >
                Backtesting
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <span className="bg-purple-900 text-white px-3 py-1 rounded-full text-sm">
                {username}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;