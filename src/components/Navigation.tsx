"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
  }, [pathname]);

  const menuItems = [
    {
      href: '/yazim-kurallari',
      label: 'Yazım Kuralları',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      href: '/noktalama-isaretleri',
      label: 'Noktalama İşaretleri',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },
    {
      href: '/atasozleri',
      label: 'Atasözleri ve Deyimler',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      href: '/yol-haritasi',
      label: 'Yol Haritası',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      isNew: true
    }
  ];

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
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <NavLink 
                  key={item.href} 
                  href={item.href}
                  isActive={pathname === item.href}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                    {item.isNew && (
                      <span className="ml-1 px-1.5 py-0.5 text-[10px] font-medium bg-orange-100 text-orange-600 rounded-full">
                        Yeni
                      </span>
                    )}
                  </span>
                </NavLink>
              ))}
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
          fixed inset-y-0 right-0 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="flex flex-col p-6 h-full">
            <div className="flex justify-between items-center mb-8">
              <Logo />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-orange-50 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <MobileNavLink 
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  isActive={pathname === item.href}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                    {item.isNew && (
                      <span className="ml-1 px-1.5 py-0.5 text-[10px] font-medium bg-orange-100 text-orange-600 rounded-full">
                        Yeni
                      </span>
                    )}
                  </span>
                </MobileNavLink>
              ))}
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
function NavLink({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`
        px-4 py-2 rounded-lg transition-all duration-200 font-medium relative group
        ${isActive 
          ? 'text-orange-600 bg-orange-50' 
          : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
        }
      `}
    >
      {children}
      {!isActive && (
        <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
      )}
    </Link>
  );
}

// Mobil NavLink alt bileşeni
function MobileNavLink({ href, children, onClick, isActive }: { href: string; children: React.ReactNode; onClick?: () => void; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`
        px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center
        ${isActive 
          ? 'text-orange-600 bg-orange-50' 
          : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
        }
      `}
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 