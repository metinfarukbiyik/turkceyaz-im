const TDK_API_URL = 'https://sozluk.gov.tr/gts';
const TDK_AUTOCOMPLETE_URL = 'https://sozluk.gov.tr/autocomplete.json';

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

export interface AutocompleteResponse {
  madde: string;
}

export async function getAutocompleteSuggestions(word: string): Promise<string[]> {
  try {
    const response = await fetch(`${TDK_AUTOCOMPLETE_URL}?q=${encodeURIComponent(word)}`);
    
    if (!response.ok) {
      throw new Error('Öneri sistemi yanıt vermedi');
    }

    const data: AutocompleteResponse[] = await response.json();
    const suggestions = data.map(item => item.madde);

    // Önerileri benzerlik skoruna göre sırala
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
    const response = await fetch(`${TDK_API_URL}?ara=${encodeURIComponent(word)}`);
    
    if (!response.ok) {
      throw new Error('TDK API yanıt vermedi');
    }

    const data = await response.json();

    // TDK API'si sonuç bulunamadığında boş array yerine error objesi dönüyor
    if ('error' in data || 'message' in data) {
      return [];
    }
    
    // API bazen tek bir sonuç için obje, birden fazla sonuç için array dönüyor
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