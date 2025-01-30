"use client";

import { useState } from 'react';

export default function YolHaritasi() {
  const [activeTab, setActiveTab] = useState<'tamamlanan' | 'devam-eden' | 'planlanan'>('tamamlanan');

  const tamamlananOzellikler = [
    {
      title: "Ana Sayfa Tasarımı",
      description: "Modern ve kullanıcı dostu bir arayüz ile ana sayfa tasarımı tamamlandı.",
      date: "Ocak 2025",
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: "TDK API Entegrasyonu",
      description: "Türk Dil Kurumu sözlük API'si entegre edildi ve kelime arama özelliği eklendi.",
      date: "Ocak 2025",
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Sık Yapılan Yanlışlar",
      description: "Sık yapılan yazım yanlışları ve doğru kullanımları eklendi.",
      date: "Ocak 2025",
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: "Günün Atasözü",
      description: "Her gün farklı bir atasözü ve anlamı gösteriliyor.",
      date: "Ocak 2025",
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Arama Önerileri",
      description: "Kelime arama sırasında otomatik tamamlama önerileri eklendi.",
      date: "Ocak 2025",
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const devamEdenCalismalar = [
    {
      title: "Yazım Kuralları Sayfası",
      description: "Kapsamlı yazım kuralları rehberi hazırlanıyor. TDK kuralları ve örneklerle zenginleştirilecek.",
      progress: 45,
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Noktalama İşaretleri",
      description: "Noktalama işaretlerinin kullanım rehberi ve interaktif örnekler hazırlanıyor.",
      progress: 35,
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },
    {
      title: "Atasözleri ve Deyimler",
      description: "Atasözleri ve deyimler veritabanı genişletiliyor, kategorilendirme ve arama özellikleri ekleniyor.",
      progress: 50,
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Mobil Uyumluluk",
      description: "Tüm sayfaların mobil cihazlarda daha iyi görüntülenmesi için optimizasyonlar yapılıyor.",
      progress: 65,
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const planlananOzellikler = [
    {
      title: "Alıştırmalar ve Testler",
      description: "Yazım ve noktalama kuralları için interaktif alıştırmalar, çoktan seçmeli testler ve ilerleme takibi.",
      eta: "2025 Q1",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: "Dark Mode",
      description: "Koyu tema desteği ve tema tercihi kaydetme özelliği.",
      eta: "2025 Q1",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
    },
    {
      title: "Kelime Oyunları",
      description: "Türkçe kelime hazinesini geliştirmek için eğlenceli oyunlar ve bulmacalar.",
      eta: "2025 Q1",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
   
  
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/40 via-white to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Yol Haritası
          </h1>
          <p className="text-gray-600 text-lg">
            TurkceYaz.im ile Türkçenin Doğru ve Etkili Kullanımı İçin Geliştirme Planlarımız
          </p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <div className="text-2xl font-bold text-green-600 mb-1">{tamamlananOzellikler.length}</div>
            <div className="text-sm text-green-800">Tamamlanan Özellik</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <div className="text-2xl font-bold text-orange-600 mb-1">{devamEdenCalismalar.length}</div>
            <div className="text-sm text-orange-800">Devam Eden Çalışma</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div className="text-2xl font-bold text-blue-600 mb-1">{planlananOzellikler.length}</div>
            <div className="text-sm text-blue-800">Planlanan Özellik</div>
          </div>
        </div>

        {/* Tab Menü */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-orange-50 rounded-xl">
            <button
              onClick={() => setActiveTab('tamamlanan')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'tamamlanan'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Tamamlanan
            </button>
            <button
              onClick={() => setActiveTab('devam-eden')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'devam-eden'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Devam Eden
            </button>
            <button
              onClick={() => setActiveTab('planlanan')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'planlanan'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Planlanan
            </button>
          </div>
        </div>

        {/* İçerik */}
        <div className="grid gap-6">
          {activeTab === 'tamamlanan' && tamamlananOzellikler.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-3 rounded-xl">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'devam-eden' && devamEdenCalismalar.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-orange-50 p-3 rounded-xl">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <span className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      %{item.progress}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="w-full bg-orange-100 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'planlanan' && planlananOzellikler.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-xl">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {item.eta}
                    </span>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 