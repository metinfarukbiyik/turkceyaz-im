"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menü açıkken scroll'u engelle
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Sayfa değiştiğinde menüyü kapat
  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <nav className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-white'}
      `}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="relative z-10">
              <Logo />
            </div>

            {/* Mobil Menü Butonu */}
            <button
              className="md:hidden relative z-10 p-2 hover:bg-orange-50 rounded-lg transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menüyü Aç/Kapat"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-orange-600 transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-orange-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-orange-600 transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>

            {/* Masaüstü Menü */}
            <div className="hidden md:flex space-x-1">
              <NavLink href="/yazim-kurallari">Yazım Kuralları</NavLink>
              <NavLink href="/noktalama-isaretleri">Noktalama İşaretleri</NavLink>
              <NavLink href="/atasozleri">Atasözleri ve Deyimler</NavLink>
              <NavLink href="/yol-haritasi">
                <span className="inline-flex items-center">
                  Yol Haritası
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] font-medium bg-orange-100 text-orange-600 rounded-full">
                    Yeni
                  </span>
                </span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Mobil Menü Overlay */}
        <div 
          className={`
            fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 z-40
            ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobil Menü */}
        <div className={`
          fixed inset-y-0 right-0 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="flex flex-col p-6 h-full overflow-y-auto">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-orange-50 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <MobileNavLink href="/yazim-kurallari" onClick={() => setIsMenuOpen(false)}>
                Yazım Kuralları
              </MobileNavLink>
              <MobileNavLink href="/noktalama-isaretleri" onClick={() => setIsMenuOpen(false)}>
                Noktalama İşaretleri
              </MobileNavLink>
              <MobileNavLink href="/atasozleri" onClick={() => setIsMenuOpen(false)}>
                Atasözleri ve Deyimler
              </MobileNavLink>
              <MobileNavLink href="/yol-haritasi" onClick={() => setIsMenuOpen(false)}>
                <span className="inline-flex items-center">
                  Yol Haritası
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] font-medium bg-orange-100 text-orange-600 rounded-full">
                    Yeni
                  </span>
                </span>
              </MobileNavLink>
            </div>
          </div>
        </div>
      </nav>
      {/* Boşluk bırakıcı div */}
      <div className="h-16" />
    </>
  );
}

// NavLink alt bileşeni
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-gray-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-all duration-200 font-medium relative group"
    >
      {children}
      <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
    </Link>
  );
}

// Mobil NavLink alt bileşeni
function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 