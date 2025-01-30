"use client";

import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center space-x-3">
      {/* Logo İkonu */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-lg transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110" />
        <span className="relative text-white font-black text-lg">T</span>
      </div>

      {/* Logo Metni */}
      <div className="relative">
        <div className="flex items-center">
          <span className="text-xl font-black tracking-tight">
            <span className="text-gray-800">
              Turkce
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Yaz
              </span>
              {/* Yaz kelimesi üzerindeki parlama efekti */}
              <div className="absolute -inset-2 bg-orange-400/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </span>
            <span className="text-gray-500 group-hover:text-orange-500 transition-colors duration-300">
              .im
            </span>
          </span>
        </div>

        {/* Alt çizgi animasyonu */}
        <div className="absolute -bottom-1 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>
      </div>

      {/* Beta etiketi */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center bg-gradient-to-br from-orange-50 to-white px-2 py-0.5 rounded-full border border-orange-100 shadow-sm transform transition-transform duration-300 group-hover:scale-105">
          <div className="w-1 h-1 rounded-full bg-orange-500 mr-1 animate-pulse" />
          <span className="text-[10px] font-semibold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            beta v1.0
          </span>
        </div>
      </div>
    </Link>
  );
} 