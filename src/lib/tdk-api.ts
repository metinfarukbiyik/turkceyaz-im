const TDK_API_URL = 'https://sozluk.gov.tr/gts';

export interface TDKResponse {
  madde_id: string;
  kac: string;
  kelime: string;
  anlamlarListe: {
    anlam_id: string;
    anlam: string;
    fiil: string;
    tipkes: string;
    orneklerListe?: {
      ornek_id: string;
      ornek: string;
      yazar?: {
        yazar_id: string;
        tam_adi: string;
      };
    }[];
  }[];
}

export async function searchWord(word: string): Promise<TDKResponse[]> {
  try {
    const response = await fetch(`${TDK_API_URL}?ara=${encodeURIComponent(word)}`);
    
    if (!response.ok) {
      throw new Error('TDK API yanıt vermedi');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('TDK API Hatası:', error);
    throw error;
  }
} 