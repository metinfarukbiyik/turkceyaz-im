import { TDK_ENDPOINTS, API_PARAMS, TDKResponse, AtasozuDeyimResponse } from './tdk-endpoints';
import { load } from 'cheerio';

// Yazım yanlışları için tip tanımlaması
export type { YanlisKullanimResponse } from './tdk-endpoints';

// Türkçe karakterleri normalize etme fonksiyonu
function normalizeText(text: string): string {
  const charMap: { [key: string]: string } = {
    'ı': 'i', 'İ': 'i', 'ğ': 'g', 'Ğ': 'g',
    'ü': 'u', 'Ü': 'u', 'ş': 's', 'Ş': 's',
    'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c'
  };
  return text.toLowerCase().replace(/[ıİğĞüÜşŞöÖçÇ]/g, letter => charMap[letter] || letter);
}

// Levenshtein mesafesi hesaplama
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
}

// Benzerlik skoru hesaplama
function calculateSimilarity(input: string, suggestion: string): number {
  const normalizedInput = normalizeText(input);
  const normalizedSuggestion = normalizeText(suggestion);
  
  // Tam eşleşme kontrolü
  if (normalizedInput === normalizedSuggestion) return 1;
  
  // Levenshtein mesafesi
  const distance = levenshteinDistance(normalizedInput, normalizedSuggestion);
  const maxLength = Math.max(input.length, suggestion.length);
  const levenshteinScore = 1 - (distance / maxLength);
  
  // Prefix kontrolü (kelimenin başlangıcı)
  const prefixScore = normalizedSuggestion.startsWith(normalizedInput) ? 0.3 : 0;
  
  // Toplam skor
  return levenshteinScore + prefixScore;
}

export interface AutocompleteResponse {
  madde: string;
}

export async function getAutocompleteSuggestions(word: string): Promise<string[]> {
  try {
    const response = await fetch(`${TDK_ENDPOINTS.AUTOCOMPLETE}?q=${encodeURIComponent(word)}`);
    
    if (!response.ok) {
      throw new Error('Öneri sistemi yanıt vermedi');
    }

    const data: AutocompleteResponse[] = await response.json();
    const suggestions = data.map(item => item.madde);

    return suggestions
      .map(suggestion => ({
        text: suggestion,
        score: calculateSimilarity(word, suggestion)
      }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.text)
      .slice(0, 5);

  } catch (error) {
    console.error('Öneri sistemi hatası:', error);
    return [];
  }
}

export async function searchWord(word: string): Promise<TDKResponse[]> {
  try {
    const response = await fetch(`${TDK_ENDPOINTS.SOZLUK}?${API_PARAMS.SEARCH}=${encodeURIComponent(word)}`);
    
    if (!response.ok) {
      throw new Error('TDK API yanıt vermedi');
    }

    const data = await response.json();

    if ('error' in data || 'message' in data) {
      return [];
    }
    
    if (Array.isArray(data)) {
      return data;
    } else if (data && typeof data === 'object') {
      return [data];
    }
    
    return [];
  } catch (error) {
    console.error('TDK API Hatası:', error);
    return [];
  }
}

export interface AtasozuDeyim {
  madde: string;
  anlam: string;
  turu?: string;
}

export async function getRandomAtasozuDeyim(): Promise<AtasozuDeyim | null> {
  try {
    const response = await fetch(TDK_ENDPOINTS.ATASOZU_DEYIM);
    if (!response.ok) {
      throw new Error('TDK API yanıt vermedi');
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('API geçerli veri döndürmedi');
    }

    if (data.length === 0) {
      throw new Error('API boş veri döndürdü');
    }

    // Geçerli atasözü/deyimleri filtrele
    const validItems = data.filter(item => 
      item && 
      typeof item === 'object' && 
      'sozum' in item && 
      'anlami' in item &&
      typeof item.sozum === 'string' &&
      typeof item.anlami === 'string' &&
      item.sozum.trim() !== '' &&
      item.anlami.trim() !== ''
    );

    if (validItems.length === 0) {
      throw new Error('Geçerli atasözü/deyim bulunamadı');
    }

    const randomIndex = Math.floor(Math.random() * validItems.length);
    const item = validItems[randomIndex];

    // Madde içeriğini temizle
    const cleanMadde = item.sozum
      .split('(')[0] // Parantez içini kaldır
      .replace(/"/g, '') // Tırnak işaretlerini kaldır
      .replace(/'/g, '') // Tek tırnak işaretlerini kaldır
      .replace(/[[\]]/g, '') // Köşeli parantezleri kaldır
      .replace(/veya.*$/, '') // "veya" ile başlayan kısımları kaldır
      .trim();
    
    const cleanAnlam = item.anlami
      .replace(/"/g, '') // Tırnak işaretlerini kaldır
      .replace(/'/g, '') // Tek tırnak işaretlerini kaldır
      .replace(/[[\]]/g, '') // Köşeli parantezleri kaldır
      .replace(/<i>.*?<\/i>/g, '') // HTML etiketlerini kaldır
      .trim();

    return {
      madde: cleanMadde,
      anlam: cleanAnlam,
      turu: item.turu2 || 'Atasözü'
    };
  } catch (error) {
    console.error('Atasözü getirme hatası:', error);
    return null;
  }
}

// Sıkça yapılan yanlışlar listesi
const SIKCA_YAPILAN_YANLISLAR: YanlisKullanimResponse[] = [
  // Bitişik/Ayrı Yazım Yanlışları
  {
    id: "1",
    yanlis: "herşey",
    dogru: "her şey",
    aciklama: "Ayrı yazılması gereken bir sözcüktür."
  },
  {
    id: "2",
    yanlis: "hiçbirşey",
    dogru: "hiçbir şey",
    aciklama: "Ayrı yazılması gereken bir sözcüktür."
  },
  {
    id: "3",
    yanlis: "birşey",
    dogru: "bir şey",
    aciklama: "Ayrı yazılması gereken bir sözcüktür."
  },
  {
    id: "4",
    yanlis: "farketmek",
    dogru: "fark etmek",
    aciklama: "Ayrı yazılması gereken bir fiildir."
  },
  {
    id: "5",
    yanlis: "varetmek",
    dogru: "var etmek",
    aciklama: "Ayrı yazılması gereken bir fiildir."
  },

  // Ses/Harf Yanlışları
  {
    id: "6",
    yanlis: "yalnış",
    dogru: "yanlış",
    aciklama: "Doğru yazımı 'yanlış' şeklindedir."
  },
  {
    id: "7",
    yanlis: "yanlız",
    dogru: "yalnız",
    aciklama: "'Yanlız' şeklinde yazılması yanlıştır."
  },
  {
    id: "8",
    yanlis: "dinazor",
    dogru: "dinozor",
    aciklama: "'z' ile yazılır."
  },

  // Konuşma Dili Yanlışları
  {
    id: "9",
    yanlis: "bi",
    dogru: "bir",
    aciklama: "Konuşma dilindeki kısaltma yazı dilinde kullanılmaz."
  },
  {
    id: "10",
    yanlis: "gelicek",
    dogru: "gelecek",
    aciklama: "Konuşma dilindeki söyleyiş yazı dilinde kullanılmaz."
  },
  {
    id: "11",
    yanlis: "gidicek",
    dogru: "gidecek",
    aciklama: "Konuşma dilindeki söyleyiş yazı dilinde kullanılmaz."
  },

  // Yabancı Kelime Yanlışları
  {
    id: "12",
    yanlis: "supriz",
    dogru: "sürpriz",
    aciklama: "Fransızca 'surprise' kelimesinden gelir."
  },
  {
    id: "13",
    yanlis: "makina",
    dogru: "makine",
    aciklama: "İtalyanca 'macchina' kelimesinden gelir."
  },
  {
    id: "14",
    yanlis: "orjinal",
    dogru: "orijinal",
    aciklama: "Fransızca 'original' kelimesinden gelir."
  },

  // Noktalama/İmla Yanlışları
  {
    id: "15",
    yanlis: "herzaman",
    dogru: "her zaman",
    aciklama: "Ayrı yazılması gereken bir zaman zarfıdır."
  },
  {
    id: "16",
    yanlis: "hiçbir zaman",
    dogru: "hiçbir zaman",
    aciklama: "Bitişik yazılması gereken 'hiçbir' ile 'zaman' kelimesi ayrı yazılır."
  },
  {
    id: "17",
    yanlis: "rağmen",
    dogru: "rağmen",
    aciklama: "'-e' ekiyle kullanılır: 'buna rağmen', 'ona rağmen'"
  },

  // Ek Yazım Yanlışları
  {
    id: "18",
    yanlis: "klavye de",
    dogru: "klavyede",
    aciklama: "Bulunma hali eki bitişik yazılır."
  },
  {
    id: "19",
    yanlis: "evde ki",
    dogru: "evdeki",
    aciklama: "Sıfat yapan '-ki' eki bitişik yazılır."
  },
  {
    id: "20",
    yanlis: "onada",
    dogru: "ona da",
    aciklama: "'da' bağlacı ayrı yazılır."
  }
];

// Yazım yanlışları kategorileri
export enum YazimYanlisiKategori {
  BITISIK_AYRI = "Bitişik/Ayrı Yazım Yanlışları",
  SES_HARF = "Ses/Harf Yanlışları",
  KONUSMA_DILI = "Konuşma Dili Yanlışları",
  YABANCI_KELIME = "Yabancı Kelime Yanlışları",
  NOKTALAMA_IMLA = "Noktalama/İmla Yanlışları",
  EK_YAZIM = "Ek Yazım Yanlışları"
}

// Yazım yanlışı kategorisini belirle
export function getKategori(id: string): YazimYanlisiKategori {
  const idNum = parseInt(id);
  if (idNum <= 5) return YazimYanlisiKategori.BITISIK_AYRI;
  if (idNum <= 8) return YazimYanlisiKategori.SES_HARF;
  if (idNum <= 11) return YazimYanlisiKategori.KONUSMA_DILI;
  if (idNum <= 14) return YazimYanlisiKategori.YABANCI_KELIME;
  if (idNum <= 17) return YazimYanlisiKategori.NOKTALAMA_IMLA;
  return YazimYanlisiKategori.EK_YAZIM;
}

// Kategoriye göre yazım yanlışlarını getir
export function getYazimYanlislariByKategori(kategori: YazimYanlisiKategori): YanlisKullanimResponse[] {
  return SIKCA_YAPILAN_YANLISLAR.filter(item => getKategori(item.id) === kategori);
}

// Tüm kategorileri ve içerdikleri yazım yanlışı sayılarını getir
export function getKategoriIstatistikleri(): { kategori: YazimYanlisiKategori; sayi: number }[] {
  const istatistikler = Object.values(YazimYanlisiKategori).map(kategori => ({
    kategori,
    sayi: getYazimYanlislariByKategori(kategori).length
  }));

  return istatistikler.sort((a, b) => b.sayi - a.sayi);
}

// Kelimeyi kontrol et ve varsa doğrusunu bul
export function kelimeyiKontrolEt(kelime: string): YanlisKullanimResponse | null {
  const normalizedKelime = normalizeText(kelime);
  
  return SIKCA_YAPILAN_YANLISLAR.find(item => 
    normalizeText(item.yanlis) === normalizedKelime
  ) || null;
}

// Sıkça yapılan yanlışları getir (önce web'den çekmeyi dene, hata olursa varsayılan listeyi kullan)
export async function getSikcaYapilanYanlislar(kategori?: YazimYanlisiKategori): Promise<YanlisKullanimResponse[]> {
  try {
    // Statik veriyi kullan
    const yanlislar = SIKCA_YAPILAN_YANLISLAR;
    
    if (kategori) {
      return yanlislar.filter(yanlis => getKategori(yanlis.id) === kategori);
    }
    
    return yanlislar;
  } catch (error) {
    console.error('Yazım yanlışları getirme hatası:', error);
    return [];
  }
} 