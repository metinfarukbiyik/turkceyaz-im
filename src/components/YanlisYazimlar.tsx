"use client";

import { useState, useEffect } from 'react';
import { 
  getSikcaYapilanYanlislar,
  getKategori,
  type YanlisKullanimResponse 
} from '@/lib/tdk-api';

export default function YanlisYazimlar() {
  const [rastgeleYanlis, setRastgeleYanlis] = useState<YanlisKullanimResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    yeniYanlisGetir();
  }, []);

  const yeniYanlisGetir = async () => {
    setIsLoading(true);
    try {
      const tumYanlislar = await getSikcaYapilanYanlislar();
      const rastgeleIndex = Math.floor(Math.random() * tumYanlislar.length);
      setRastgeleYanlis(tumYanlislar[rastgeleIndex]);
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100/50 h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Başlık ve Yenileme Butonu */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-xl">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-orange-700">
                Sıkça Yapılan Yazım Yanlışları
              </h2>
              <p className="text-sm text-orange-500 mt-0.5">
                Türk Dil Kurumu Sözlüğü&apos;nden
              </p>
            </div>
          </div>
          
          {/* Yenileme Butonu */}
          <button
            onClick={yeniYanlisGetir}
            className="p-2 hover:bg-orange-50 text-orange-600 rounded-xl border border-orange-200 transition-colors"
            title="Yeni Yazım Yanlışı Göster"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Yazım Yanlışı Kartı */}
        {isLoading ? (
          <div className="flex-grow flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : rastgeleYanlis ? (
          <div className="flex-grow">
            <div className="bg-orange-50/50 rounded-xl border border-orange-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="text-sm px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-medium self-end">
                    {getKategori(rastgeleYanlis.id)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {/* Yanlış Kullanım */}
                    <div className="flex flex-col gap-2 bg-red-50/50 p-4 rounded-xl border border-red-100">
                      <div className="flex items-center gap-2 text-red-600 mb-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-sm font-medium">Yanlış Kullanım</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-red-500 text-2xl font-medium">
                          {rastgeleYanlis.yanlis}
                        </div>
                        <button
                          onClick={() => handleCopy(rastgeleYanlis.yanlis)}
                          className="text-red-400 hover:text-red-600 transition-colors hover:bg-red-100/50 p-1 rounded-lg"
                          title="Kopyala"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Doğru Kullanım */}
                    <div className="flex flex-col gap-2 bg-green-50/50 p-4 rounded-xl border border-green-100">
                      <div className="flex items-center gap-2 text-green-600 mb-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium">Doğru Kullanım</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-green-600 text-2xl font-medium">
                          {rastgeleYanlis.dogru}
                        </div>
                        <button
                          onClick={() => handleCopy(rastgeleYanlis.dogru)}
                          className="text-green-400 hover:text-green-600 transition-colors hover:bg-green-100/50 p-1 rounded-lg"
                          title="Kopyala"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {rastgeleYanlis.aciklama && (
                    <div className="text-base text-gray-600 bg-white/80 p-4 rounded-lg border border-orange-100/50">
                      <span className="font-medium text-orange-700">Açıklama: </span>
                      {rastgeleYanlis.aciklama}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-orange-500 font-medium">
              Yazım yanlışı bulunamadı.
            </div>
          </div>
        )}

        {/* Kopyalandı Bildirimi */}
        {showCopied && (
          <div className="fixed bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up">
            Kopyalandı!
          </div>
        )}
      </div>
    </div>
  );
} 