"use client";
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AssetSidebar from '@/components/AssetSidebar';

// Define news article interface
interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
  category: 'market' | 'crypto' | 'stocks' | 'economy';
  sentiment: 'positive' | 'negative' | 'neutral';
  relatedAssets?: string[];
}

export default function NewsPage() {
  const { darkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Sample news data
  const newsArticles: NewsArticle[] = [
    {
      id: 'news1',
      title: 'Bitcoin Hits New All-Time High as Institutional Adoption Grows',
      summary: 'Bitcoin reached a new all-time high today, surpassing $72,000 as institutional investors continue to pour capital into the leading cryptocurrency. Major financial institutions announced new Bitcoin treasury allocations.',
      source: 'CryptoNews',
      publishedAt: '2025-04-15T09:30:00Z',
      url: '#',
      imageUrl: '/images/bitcoin-news.jpg',
      category: 'crypto',
      sentiment: 'positive',
      relatedAssets: ['bitcoin', 'ethereum']
    },
    {
      id: 'news2',
      title: 'Federal Reserve Signals Potential Rate Cut in June Meeting',
      summary: 'The Federal Reserve hinted at a possible interest rate cut during its upcoming June meeting, citing moderating inflation data and concerns about labor market cooling.',
      source: 'Financial Times',
      publishedAt: '2025-04-14T16:45:00Z',
      url: '#',
      category: 'economy',
      sentiment: 'positive',
      relatedAssets: ['aapl', 'tsla']
    },
    {
      id: 'news3',
      title: 'Tesla Exceeds Q1 Delivery Expectations, Shares Jump 8%',
      summary: 'Tesla reported stronger-than-expected vehicle deliveries for Q1 2025, shipping 492,000 vehicles versus analyst expectations of 460,000. The company\'s shares rose 8% in early trading.',
      source: 'Wall Street Journal',
      publishedAt: '2025-04-13T13:20:00Z',
      url: '#',
      imageUrl: '/images/tesla-news.jpg',
      category: 'stocks',
      sentiment: 'positive',
      relatedAssets: ['tsla']
    },
    {
      id: 'news4',
      title: 'Ethereum Completes Major Network Upgrade, Gas Fees Drop 40%',
      summary: 'Ethereum successfully implemented its latest network upgrade, resulting in a 40% reduction in gas fees and improved transaction throughput. Developers praised the smooth transition.',
      source: 'Decrypt',
      publishedAt: '2025-04-12T10:15:00Z',
      url: '#',
      category: 'crypto',
      sentiment: 'positive',
      relatedAssets: ['ethereum']
    },
    {
      id: 'news5',
      title: 'Global Markets Retreat Amid Geopolitical Tensions',
      summary: 'Global stock markets faced significant selling pressure today as geopolitical tensions in Eastern Europe and the South China Sea escalated. Safe-haven assets like gold and government bonds rallied.',
      source: 'Bloomberg',
      publishedAt: '2025-04-11T19:40:00Z',
      url: '#',
      category: 'market',
      sentiment: 'negative'
    },
    {
      id: 'news6',
      title: 'Apple Delays AI Features in Latest iOS Update',
      summary: 'Apple announced it would delay several anticipated AI features in its upcoming iOS update, citing the need for additional testing and refinement. The news sent shares down 2.5%.',
      source: 'CNBC',
      publishedAt: '2025-04-10T14:55:00Z',
      url: '#',
      imageUrl: '/images/apple-news.jpg',
      category: 'stocks',
      sentiment: 'negative',
      relatedAssets: ['aapl']
    },
    {
      id: 'news7',
      title: 'Solana Network Activity Reaches All-Time High',
      summary: 'The Solana blockchain reported record-breaking network activity with over 2 million daily active addresses and 65 million transactions in a 24-hour period, showcasing growing adoption.',
      source: 'CoinDesk',
      publishedAt: '2025-04-09T11:10:00Z',
      url: '#',
      category: 'crypto',
      sentiment: 'positive',
      relatedAssets: ['solana']
    },
    {
      id: 'news8',
      title: 'U.S. Manufacturing Output Shows Strong Recovery in Q1',
      summary: 'U.S. manufacturing output grew at its fastest pace in nearly two years during Q1 2025, according to new data from the Federal Reserve, suggesting a robust economic recovery.',
      source: 'Reuters',
      publishedAt: '2025-04-08T15:30:00Z',
      url: '#',
      category: 'economy',
      sentiment: 'positive'
    }
  ];
  
  // Sample asset data for the sidebar (same as in chart page)
  const allAssets = {
    bitcoin: { name: 'Bitcoin', symbol: 'BTC', price: 50000, change24h: 2.5, assetType: 'crypto' as 'crypto', marketCap: '950B', volume: '32B' },
    ethereum: { name: 'Ethereum', symbol: 'ETH', price: 1800, change24h: -1.2, assetType: 'crypto' as 'crypto', marketCap: '225B', volume: '15B' },
    litecoin: { name: 'Litecoin', symbol: 'LTC', price: 250, change24h: 0.8, assetType: 'crypto' as 'crypto', marketCap: '15B', volume: '2B' },
    ripple: { name: 'Ripple', symbol: 'XRP', price: 0.85, change24h: 1.3, assetType: 'crypto' as 'crypto', marketCap: '41B', volume: '3B' },
    cardano: { name: 'Cardano', symbol: 'ADA', price: 1.20, change24h: -0.5, assetType: 'crypto' as 'crypto', marketCap: '38B', volume: '2.5B' },
    polkadot: { name: 'Polkadot', symbol: 'DOT', price: 15.30, change24h: 3.2, assetType: 'crypto' as 'crypto', marketCap: '16B', volume: '1.2B' },
    solana: { name: 'Solana', symbol: 'SOL', price: 120.50, change24h: 5.1, assetType: 'crypto' as 'crypto', marketCap: '45B', volume: '5B' },
    dogecoin: { name: 'Dogecoin', symbol: 'DOGE', price: 0.15, change24h: -2.7, assetType: 'crypto' as 'crypto', marketCap: '20B', volume: '1.8B' },
    aapl: { name: 'Apple Inc.', symbol: 'AAPL', price: 182.66, change24h: 1.3, assetType: 'stock' as 'stock', marketCap: '2.9T', sector: 'Technology' },
    tsla: { name: 'Tesla, Inc.', symbol: 'TSLA', price: 260.52, change24h: -2.1, assetType: 'stock' as 'stock', marketCap: '827B', sector: 'Automotive' },
  };
  
  // Filter articles based on active category
  const filteredArticles = activeCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === activeCategory);
    
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('de-DE', options);
  };
  
  // Get sentiment badge styling
  const getSentimentBadge = (sentiment: string) => {
    switch(sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className={`min-h-screen ${darkMode ? 'bg-stone-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <Navbar username="John Doe" />
      <AssetSidebar assets={allAssets} activeAssetId="" />
      
      <div className="ml-0 md:ml-64 flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-serif mb-2">Finanzwelt News</h1>
            <p className={`${darkMode ? 'text-stone-400' : 'text-gray-600'} text-sm font-light`}>
              Die neuesten Nachrichten und Entwicklungen aus der Finanzwelt
            </p>
          </div>
          
          {/* Category Tabs */}
          <div className={`border-b ${darkMode ? 'border-stone-800' : 'border-gray-100'} transition-colors duration-300 mb-8`}>
            <div className="flex space-x-8 overflow-x-auto">
              {['all', 'market', 'crypto', 'stocks', 'economy'].map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`pb-4 text-sm font-light whitespace-nowrap ${
                    activeCategory === category 
                      ? 'border-b border-red-500 text-red-500' 
                      : `${darkMode ? 'text-stone-400' : 'text-gray-500'}`
                  }`}
                >
                  {category === 'all' ? 'Alle News' : 
                   category === 'market' ? 'Marktübersicht' : 
                   category === 'crypto' ? 'Kryptowährungen' : 
                   category === 'stocks' ? 'Aktien' : 'Wirtschaft'}
                </button>
              ))}
            </div>
          </div>
          
          {/* News Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <div 
                key={article.id} 
                className={`rounded-lg overflow-hidden border transition-shadow hover:shadow-lg ${
                  darkMode ? 'border-stone-800 hover:shadow-stone-800/30' : 'border-gray-200 hover:shadow-gray-200/70'
                }`}
              >
                {article.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <div 
                      className="h-full w-full bg-gray-300" 
                      style={{
                        backgroundImage: `url(${article.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  </div>
                )}
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getSentimentBadge(article.sentiment)}`}>
                      {article.sentiment === 'positive' ? 'Positiv' : 
                       article.sentiment === 'negative' ? 'Negativ' : 'Neutral'}
                    </span>
                    <span className={`text-xs ${darkMode ? 'text-stone-400' : 'text-gray-500'}`}>
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-lg mb-2">{article.title}</h3>
                  <p className={`text-sm font-light mb-4 ${darkMode ? 'text-stone-300' : 'text-gray-600'}`}>
                    {article.summary}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-medium ${darkMode ? 'text-stone-400' : 'text-gray-500'}`}>
                      {article.source}
                    </span>
                    
                    <a 
                      href={article.url} 
                      className="text-red-500 text-sm hover:text-red-600 transition-colors"
                    >
                      Weiterlesen →
                    </a>
                  </div>
                  
                  {article.relatedAssets && article.relatedAssets.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-dashed border-opacity-40 border-gray-300">
                      <div className="flex flex-wrap gap-2">
                        {article.relatedAssets.map(assetId => (
                          allAssets[assetId as keyof typeof allAssets] && (
                            <a 
                              href={`/chart/${assetId}`}
                              key={assetId}
                              className={`text-xs px-2 py-1 rounded-full transition-colors ${
                                darkMode 
                                  ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {allAssets[assetId as keyof typeof allAssets].symbol}
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer compact={true} />
    </main>
  );
}