"use client";

import { useState, useEffect } from 'react';

const atasozu_listesi = [
  {
    soz: "Damlaya damlaya göl olur.",
    anlam: "Küçük birikimlerin zamanla büyük değerlere ulaşabileceğini anlatır."
  },
  {
    soz: "Bir elin nesi var, iki elin sesi var.",
    anlam: "Birlik ve beraberlik içinde hareket edildiğinde başarıya ulaşmak daha kolaydır."
  },
  {
    soz: "Ak akçe kara gün içindir.",
    anlam: "Para, zor zamanlar için biriktirilmelidir."
  },
  {
    soz: "Sakla samanı, gelir zamanı.",
    anlam: "Gereksiz görülen şeyler bile ilerde işe yarayabilir."
  },
  {
    soz: "Üzüm üzüme baka baka kararır.",
    anlam: "İnsanlar birbirlerinden etkilenir ve zamanla birbirlerine benzerler."
  },
  {
    soz: "Ağaç yaşken eğilir.",
    anlam: "İnsanlara küçük yaşta eğitim vermek daha etkilidir."
  },
  {
    soz: "Dost kara günde belli olur.",
    anlam: "Gerçek dostlar, zor zamanlarda yardıma koşan kişilerdir."
  },
  {
    soz: "Komşu komşunun külüne muhtaçtır.",
    anlam: "İnsanlar her zaman birbirlerinin yardımına ihtiyaç duyarlar."
  },
  {
    soz: "Bakarsan bağ, bakmazsan dağ olur.",
    anlam: "Bir şeyle ilgilenip emek verirsen verimli olur, ilgilenmezsen verimsizleşir."
  },
  {
    soz: "Mart kapıdan baktırır, kazma kürek yaktırır.",
    anlam: "Mart ayı çok soğuk geçer ve insanlara yakacak sıkıntısı çektirir."
  }
];

export default function GununAtasozu() {
  const [atasozu, setAtasozu] = useState<typeof atasozu_listesi[0] | null>(null);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % atasozu_listesi.length;
    setAtasozu(atasozu_listesi[index]);
  }, []);

  if (!atasozu) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100/50 h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Başlık */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Günün Atasözü
          </h2>
          <span className="text-orange-500 p-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </span>
        </div>
        
        {/* Atasözü */}
        <div className="flex-grow grid grid-rows-[auto_1fr] gap-4">
          <div className="p-6 bg-orange-50 rounded-xl text-center border border-orange-100 flex items-center justify-center">
            <p className="text-xl font-medium text-gray-800 italic leading-relaxed">
              &ldquo;{atasozu.soz}&rdquo;
            </p>
          </div>

          {/* Anlam */}
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 flex items-center">
            <div className="space-y-2">
              <span className="text-sm text-gray-500 block">Anlamı</span>
              <p className="text-gray-600 leading-relaxed">{atasozu.anlam}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 