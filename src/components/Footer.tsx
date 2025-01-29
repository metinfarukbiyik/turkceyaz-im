"use client";

import Logo from './Logo';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          {/* Sol Kısım - Logo ve Telif Hakkı */}
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="scale-[0.85] origin-left">
              <Logo />
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()}
            </div>
          </div>

          {/* Sağ Kısım - Yapımcı Bilgisi */}
          <div className="text-right flex items-center justify-end space-x-2">
            <p className="text-gray-600 text-sm">
              <span className="text-gray-500">Proje </span>
              <Link 
                href="https://biyik.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-1 text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                <span>Metin Faruk Bıyık</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-orange-100 group-hover:bg-orange-200 transition-colors">
                  <svg 
                    className="w-3.5 h-3.5 text-orange-600" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </span>
              </Link>
              <span className="text-gray-500"> tarafından geliştirilmiştir</span>
            </p>
          </div>
        </div>

        {/* Alt Kısım - Teknolojiler */}
        <div className="mt-4 pt-4 border-t border-gray-50">
          <div className="flex items-center justify-center space-x-4 text-gray-400 text-xs">
            <Link 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              Next.js
            </Link>
            <span>•</span>
            <Link 
              href="https://tailwindcss.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              Tailwind CSS
            </Link>
            <span>•</span>
            <Link 
              href="https://www.typescriptlang.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              TypeScript
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 