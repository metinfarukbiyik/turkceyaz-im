"use client";

import type { TDKResponse } from '@/lib/tdk-api';

interface WordResultProps {
  result: TDKResponse;
}

export default function WordResult({ result }: WordResultProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100/50">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {result.kelime}
      </h3>
      
      {result.anlamlarListe && result.anlamlarListe.length > 0 ? (
        <div className="space-y-4">
          {result.anlamlarListe.map((anlam, index) => (
            <div key={anlam.anlam_id} className="pl-4 border-l-2 border-orange-200">
              <p className="text-gray-900 mb-2">
                <span className="text-orange-600 font-medium mr-2">{index + 1}.</span>
                {anlam.anlam}
              </p>
              
              {anlam.orneklerListe && anlam.orneklerListe.length > 0 && (
                <div className="pl-4 mt-2 space-y-2">
                  {anlam.orneklerListe.map((ornek) => (
                    <div key={ornek.ornek_id} className="text-gray-600 text-sm italic">
                      &ldquo;{ornek.ornek}&rdquo;
                      {ornek.yazar && (
                        <span className="text-gray-500 not-italic ml-2">
                          — {ornek.yazar.tam_adi}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Sonuç bulunamadı. &ldquo;{result.kelime}&rdquo; için başka bir arama yapmak ister misiniz?
        </p>
      )}
    </div>
  );
} 