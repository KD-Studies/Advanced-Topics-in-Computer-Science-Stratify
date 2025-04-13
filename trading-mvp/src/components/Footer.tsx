import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  compact?: boolean;
}

const Footer: React.FC<FooterProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <footer className="py-4 text-center text-xs text-gray-500 font-light relative z-10 border-t border-gray-100">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
          <div className="flex items-center">
            <Image 
              src="/stratify-logo-transparent-schwarz.png" 
              alt="Stratify Logo" 
              width={20} 
              height={20}
              className="mr-2"
            />
            <span className="text-red-500 tracking-wider uppercase text-xs">Stratify</span>
          </div>
          <p>© 2025 Stratify</p>
          <div className="flex space-x-4 text-xs">
            <Link href="#" className="hover:text-red-500 transition-colors">Datenschutz</Link>
            <Link href="#" className="hover:text-red-500 transition-colors">AGB</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="py-6 text-center text-sm text-gray-500 font-light relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6 flex justify-center items-center">
          <Image 
            src="/stratify-logo-transparent-schwarz.png" 
            alt="Stratify Logo" 
            width={30} 
            height={30}
            className="mr-2"
          />
          <span className="text-red-500 tracking-wider uppercase text-sm ml-1">Stratify</span>
        </div>
        
        <div className="mb-6">
          <ul className="flex justify-center space-x-8">
            <li>
              <Link href="#" className="hover:text-red-500 transition-colors">
                Über uns
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-red-500 transition-colors">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-red-500 transition-colors">
                Datenschutz
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-red-500 transition-colors">
                AGB
              </Link>
            </li>
          </ul>
        </div>
        
        <p>© 2025 Stratify. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
};

export default Footer;