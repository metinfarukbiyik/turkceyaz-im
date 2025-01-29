"use client";

import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center space-x-2">
      <div className="relative">
        <span className="text-xl font-black tracking-tight text-gray-700 transition-colors duration-300 group-hover:text-gray-800">
          Turkce
          <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-orange-500 group-hover:to-orange-600">
            Yaz
          </span>
          <span className="text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
            .im
          </span>
        </span>
        
        {/* Alt çizgi animasyonu */}
        <div className="absolute -bottom-0.5 left-0 w-full h-[2px] overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 transform origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </div>

        {/* Hover glow efekti */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/0 via-orange-300/10 to-orange-400/0 rounded-lg blur opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Beta etiketi */}
      <div className="relative flex items-center transition-transform duration-300 group-hover:scale-105">
        <span className="text-[10px] font-medium bg-gradient-to-r from-orange-100 to-orange-50 text-orange-500 px-2 py-0.5 rounded-full border border-orange-200/30 shadow-sm">
          beta v1.0
        </span>
      </div>
    </Link>
  );
} 