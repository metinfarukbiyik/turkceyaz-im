"use client";

import { useState, useEffect } from 'react';
import { searchWord } from '@/lib/tdk-api';
import yanlis_yazimlar from '@/data/yanlis-yazilar.json';

// Tip tanımlamaları
interface YanlisYazim {
  yanlis: string;
  dogru: string;
  aciklama: string;
}

interface YanlisYazimlar {
  yanlis_yazimlar: YanlisYazim[];
}

export default function YanlisYazimlar() {
  const [randomItem, setRandomItem] = useState<YanlisYazim | null>(null);
  const [anlam, setAnlam] = useState<string | null>(null);

  const getRandomItem = async () => {
    const randomIndex = Math.floor(Math.random() * yanlis_yazimlar.yanlis_yazimlar.length);
    const item = yanlis_yazimlar.yanlis_yazimlar[randomIndex];
    setRandomItem(item);

    // Doğru kelimenin anlamını TDK API'den al
    try {
      const data = await searchWord(item.dogru.split(" ")[0]); // İlk kelimeyi ara
      if (data && data.length > 0 && data[0].anlamlarListe) {
        setAnlam(data[0].anlamlarListe[0].anlam);
      } else {
        setAnlam(null);
      }
    } catch {
      setAnlam(null);
    }
  };

  useEffect(() => {
    getRandomItem();
  }, []); // Sadece bileşen yüklendiğinde çalışır

  if (!randomItem) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100/50 h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Başlık */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Sık Yapılan Yazım Yanlışı
          </h2>
          <button 
            onClick={getRandomItem}
            className="text-orange-500 hover:text-orange-600 transition-colors p-2 hover:bg-orange-50 rounded-lg"
            title="Yeni kelime göster"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        {/* Kelimeler - Yeni Grid Yapısı */}
        <div className="flex-grow">
          <div className="grid grid-cols-2 gap-4">
            {/* Yanlış Kelime */}
            <div className="p-4 bg-red-50 rounded-xl flex flex-col justify-center items-center border border-red-100">
              <span className="text-sm text-red-400 mb-2">Yanlış Kullanım</span>
              <span className="text-xl text-red-500 line-through font-medium">{randomItem.yanlis}</span>
            </div>
            
            {/* Doğru Kelime */}
            <div className="p-4 bg-green-50 rounded-xl flex flex-col justify-center items-center border border-green-100">
              <span className="text-sm text-green-500 mb-2">Doğru Kullanım</span>
              <span className="text-xl text-green-600 font-medium">{randomItem.dogru}</span>
            </div>
          </div>

          {/* Anlam */}
          {anlam && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-sm text-gray-500 block mb-2">Anlamı</span>
              <p className="text-sm text-gray-600">{anlam}</p>
            </div>
          )}
        </div>

        {/* Açıklama */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed">{randomItem.aciklama}</p>
        </div>
      </div>
    </div>
  );
} 