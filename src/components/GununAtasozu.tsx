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
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-100 p-2 rounded-xl">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-orange-700">
              Günün Atasözü
            </h2>
            <p className="text-sm text-orange-500 mt-0.5">
              Türk Dil Kurumu Sözlüğü&apos;nden
            </p>
          </div>
        </div>

        {/* Atasözü ve Anlam */}
        <div className="flex-grow">
          <div className="bg-orange-50/50 rounded-xl border border-orange-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex flex-col gap-4">
                {/* Tür Etiketi */}
                <div className="text-sm px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-medium self-end">
                  {atasozu.turu || 'Atasözü'}
                </div>

                {/* Atasözü */}
                <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-2 text-orange-600 mb-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">Atasözü</span>
                  </div>
                  <div className="text-orange-600 text-2xl font-medium">
                    {atasozu.soz}
                  </div>
                </div>

                {/* Anlam */}
                <div className="text-base text-gray-600 bg-white/80 p-4 rounded-lg border border-orange-100/50">
                  <span className="font-medium text-orange-700">Anlamı: </span>
                  {atasozu.anlam}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 