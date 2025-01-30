// TDK API Endpoint'leri
export const TDK_ENDPOINTS = {
  // Ana sözlük API'si
  SOZLUK: 'https://sozluk.gov.tr/gts',
  
  // Otomatik tamamlama API'si
  AUTOCOMPLETE: 'https://sozluk.gov.tr/autocomplete.json',
  
  // Atasözleri ve Deyimler API'si
  ATASOZU_DEYIM: 'https://sozluk.gov.tr/atasozu',
  
  // Yazım Kılavuzu API'si
  YAZIM_KILAVUZU: 'https://sozluk.gov.tr/yazim',

  // Sıkça Yapılan Yanlışlar API'si
  SIKCA_YANLIS: 'https://sozluk.gov.tr/yanlislar.json',
};

// API İstek Parametreleri
export const API_PARAMS = {
  // Arama parametresi
  SEARCH: 'ara',
  
  // Kelime ID parametresi
  WORD_ID: 'id'
};

// Örnek Kullanımlar:
/*
1. Kelime Arama:
   ${TDK_ENDPOINTS.SOZLUK}?${API_PARAMS.SEARCH}=kelime

2. Atasözü Arama:
   ${TDK_ENDPOINTS.ATASOZU_DEYIM}?${API_PARAMS.SEARCH}=atasözü

3. Yazım Kılavuzu:
   ${TDK_ENDPOINTS.YAZIM_KILAVUZU}?${API_PARAMS.SEARCH}=kelime

4. Otomatik Tamamlama:
   ${TDK_ENDPOINTS.AUTOCOMPLETE}?q=kelime
*/

// API Yanıt Tipleri
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

export interface AtasozuDeyimResponse {
  madde: string;
  anlam: string;
}

export interface YazimKilavuzuResponse {
  kelime: string;
  yazilis: string;
  kural?: string;
}

// Sıkça Yapılan Yanlışlar için tip tanımlaması
export interface YanlisKullanimResponse {
  id: string;
  yanlis: string;
  dogru: string;
  aciklama?: string;
}

// Not: Bu endpoint'ler ve parametreler TDK'nın resmi API'sine aittir.
// Kullanım için TDK'nın kullanım şartları ve politikaları geçerlidir.
// Son güncelleme: 30.01.2024 