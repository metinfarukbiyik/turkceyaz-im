"use client";

import Logo from './Logo';
import Link from 'next/link';

interface MenuLink {
  label: string;
  href: string;
  external?: boolean;
}

interface MenuItem {
  title: string;
  links: MenuLink[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export default function Footer() {
  const menuItems: MenuItem[] = [
    {
      title: 'Keşfet',
      links: [
        { label: 'Yazım Kuralları', href: '/yazim-kurallari' },
        { label: 'Noktalama İşaretleri', href: '/noktalama-isaretleri' },
        { label: 'Atasözleri', href: '/atasozleri' },
        { label: 'Yol Haritası', href: '/yol-haritasi' },
      ]
    },
    {
      title: 'Kaynaklar',
      links: [
        { label: 'TDK Sözlük', href: 'https://sozluk.gov.tr', external: true },
        { label: 'Yazım Kılavuzu', href: 'https://www.tdk.gov.tr/tdk/kurumsal/yazim-kilavuzu/', external: true },
      ]
    }
  ];

  const socialLinks: SocialLink[] = [
    {
      label: 'GitHub',
      href: 'https://github.com/metinfarukbiyik/turkceyaz-im',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      )
    },
    {
      label: 'X (Twitter)',
      href: 'https://twitter.com/_metinbiyik',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      label: 'E-posta',
      href: 'mailto:mb.metinbiyik@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-orange-50/30">
      <div className="container mx-auto">
        <div className="px-6 py-12">
          {/* Üst Kısım */}
          <div className="flex flex-col lg:flex-row justify-between gap-12 pb-10 border-b border-orange-100">
            {/* Logo ve Açıklama */}
            <div className="lg:w-1/3">
              <div className="mb-6">
                <Logo />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Türkçe dil bilgisi kurallarını, yazım kurallarını ve noktalama işaretlerini öğrenmek için kapsamlı bir kaynak. 
                Dilimizi doğru kullanmak için ihtiyacınız olan her şey burada.
              </p>
            </div>

            {/* Menü Bağlantıları */}
            <div className="grid grid-cols-2 gap-8 lg:gap-16">
              {menuItems.map((menu) => (
                <div key={menu.title}>
                  <h3 className="font-medium text-gray-900 mb-4">{menu.title}</h3>
                  <ul className="space-y-3">
                    {menu.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="text-gray-500 hover:text-orange-600 transition-colors text-sm inline-flex items-center gap-1 group"
                        >
                          {link.label}
                          {link.external && (
                            <svg 
                              className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-colors" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Alt Kısım */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Telif Hakkı */}
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Türkçe Yazım. Tüm hakları saklıdır.
            </div>

            {/* Sosyal Medya ve Yapımcı */}
            <div className="flex items-center gap-6">
              {/* Sosyal Medya */}
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-600 transition-colors p-2 hover:bg-orange-50 rounded-lg"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>

              {/* Yapımcı */}
              <Link
                href="https://biyik.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-orange-600 transition-colors flex items-center gap-2 group bg-gray-50 hover:bg-orange-50/50 px-3 py-2 rounded-lg"
              >
                <div className="flex items-center gap-1.5">
                  <div className="p-1 bg-gradient-to-br from-orange-100 to-orange-50 rounded-md">
                    <svg 
                      className="w-4 h-4 text-orange-500 group-hover:text-orange-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
                      />
                    </svg>
                  </div>
                 
                </div>
                <span>
                  Bu proje <span className="font-medium text-gray-900 group-hover:text-orange-600">Metin Faruk Bıyık</span> tarafından geliştirilmiştir
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 