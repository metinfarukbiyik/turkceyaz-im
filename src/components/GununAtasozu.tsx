"use client";

import { useState, useEffect } from 'react';
import { getRandomAtasozuDeyim } from '@/lib/tdk-api';

interface Atasozu {
  soz: string;
  anlam: string;
  turu?: string;
}

export default function GununAtasozu() {
  const [atasozu, setAtasozu] = useState<Atasozu | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomItem = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRandomAtasozuDeyim();
      if (data) {
        setAtasozu({
          soz: data.madde,
          anlam: data.anlam,
          turu: data.turu
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRandomItem();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100/50 h-full">
        <div className="p-6 flex flex-col h-full items-center justify-center">
          <svg className="w-6 h-6 text-orange-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <p className="text-orange-600 mt-2">Atasözü yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100/50 h-full">
        <div className="p-6 flex flex-col h-full items-center justify-center">
          <div className="text-red-500 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={getRandomItem}
            className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  if (!atasozu) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100/50 h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Başlık */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-xl">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-orange-700">
                Günün Atasözü ve/ya Deyimi
              </h2>
              <p className="text-sm text-orange-500 mt-0.5">
                Türk Dil Kurumu Sözlüğü'nden
              </p>
            </div>
          </div>
          <button 
            onClick={getRandomItem}
            disabled={isLoading}
            className="text-orange-600 hover:text-orange-700 transition-colors p-2 hover:bg-orange-50 rounded-xl disabled:opacity-50"
            title="Yeni atasözü göster"
          >
            <svg className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        {/* Atasözü ve Anlam */}
        <div className="flex-grow">
          {/* Atasözü */}
          <div className="p-6 bg-orange-50 rounded-xl border border-orange-100 mb-4 text-center">
            <p className="text-2xl text-orange-600 font-medium leading-relaxed">
              "{atasozu.soz}"
            </p>
          </div>

          {/* Anlam */}
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-blue-600">Anlamı</span>
            </div>
            <p className="text-blue-700 leading-relaxed">
              {atasozu.anlam}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 