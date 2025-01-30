"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { searchWord, getAutocompleteSuggestions, type TDKResponse } from '@/lib/tdk-api';
import WordResult from './WordResult';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TDKResponse[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [checkpoint, setCheckpoint] = useState<string>('');
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  const addToRecentSearches = useCallback((word: string) => {
    setRecentSearches(prev => {
      const updated = [word, ...prev.filter(s => s !== word)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setCheckpoint(query); // Checkpoint'i kaydet

    try {
      const data = await searchWord(query.trim());
      setResults(data);
      
      if (data.length > 0) {
        addToRecentSearches(query.trim());
        setSuggestions([]);
      } else {
        // Sonuç bulunamadığında önerileri göster
        const suggestions = await getAutocompleteSuggestions(query.trim());
        setSuggestions(suggestions);
      }
    } catch (error) {
      setError('Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      setResults([]);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, addToRecentSearches]);

  // Önerileri getir
  const fetchSuggestions = useCallback(async (word: string) => {
    if (!word.trim() || word.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsSuggestionsLoading(true);
    try {
      const suggestions = await getAutocompleteSuggestions(word.trim());
      setSuggestions(suggestions);
    } catch {
      setSuggestions([]);
    } finally {
      setIsSuggestionsLoading(false);
    }
  }, []);

  // Klavye navigasyonu için
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault();
          setQuery(suggestions[selectedIndex]);
          handleSearch();
          setSelectedIndex(-1);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setSelectedIndex(-1);
        break;
    }
  }, [suggestions, selectedIndex, setQuery, handleSearch]);

  // Öneri seçildiğinde
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setQuery(suggestion);
    handleSearch();
    setSuggestions([]);
    setSelectedIndex(-1);
  }, [setQuery, handleSearch]);

  const handleRestore = useCallback(() => {
    if (checkpoint) {
      setQuery(checkpoint);
      handleSearch();
    }
  }, [checkpoint, handleSearch]);

  // Son aramaları localStorage'dan yükle
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Öneriler için
  useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, fetchSuggestions]);

  // Otomatik arama için
  useEffect(() => {
    if (debouncedQuery.trim()) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [debouncedQuery, handleSearch]);

  // Dışa tıklama kontrolü için useEffect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Arama Kutusu */}
      <div className="relative mb-8" ref={searchContainerRef}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Türkçe Sözlük'te Ara..."
            className="w-full px-4 py-4 pl-12 bg-white rounded-2xl border border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 shadow-sm placeholder:text-orange-300 text-gray-700 text-lg"
            autoComplete="off"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg
              className="w-6 h-6 text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {query && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <button
                onClick={handleRestore}
                className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                title="Son aramaya geri dön"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
              </button>
              <div className="w-px h-6 bg-orange-200" />
              <button
                onClick={() => {
                  setQuery('');
                  setResults([]);
                  setSuggestions([]);
                  setError(null);
                }}
                className="p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                title="Aramayı temizle"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Öneriler Dropdown */}
        {suggestions.length > 0 && query && !isLoading && (
          <div className="absolute w-full mt-2 bg-white rounded-xl border border-orange-100 shadow-lg z-[60] overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full text-left px-4 py-3 hover:bg-orange-50 text-gray-700 flex items-center space-x-3 transition-all duration-150
                  ${selectedIndex === index ? 'bg-orange-50' : ''}
                `}
              >
                <svg
                  className={`w-4 h-4 text-orange-400 flex-shrink-0 ${selectedIndex === index ? 'opacity-100' : 'opacity-0'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className={`${selectedIndex === index ? 'text-orange-600 font-medium' : ''}`}>
                  {suggestion}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Aranan Kelime Başlığı */}
      {query && results.length > 0 && (
        <div className="relative z-10 mb-6 pb-6 border-b border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{query}</h2>
              <p className="text-sm text-gray-500">
                Türk Dil Kurumu Sözlüğü'nde bulunan anlamlar
              </p>
            </div>
            <div className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              {results.length} sonuç
            </div>
          </div>
        </div>
      )}

      {/* Son Aramalar */}
      {!query && recentSearches.length > 0 && (
        <div className="relative z-10 mb-8 bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
          <h3 className="text-sm font-medium text-orange-800 mb-3">Son Aramalar</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setQuery(search)}
                className="px-3 py-1.5 text-sm bg-white text-orange-600 rounded-lg border border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 flex items-center space-x-1.5 group"
              >
                <span>{search}</span>
                <svg 
                  className="w-3.5 h-3.5 text-orange-400 group-hover:text-orange-600 transition-colors duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sonuçlar */}
      <div className="relative z-10 space-y-6">
        {isLoading && (
          <div className="text-center text-orange-600 bg-orange-50 py-4 px-6 rounded-xl border border-orange-100">
            <div className="flex items-center justify-center space-x-3">
              <svg className="animate-spin h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sözlükte Aranıyor...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 bg-red-50 py-4 px-6 rounded-xl border border-red-100">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-6">
            {results.map((result) => (
              <WordResult key={result.madde_id} result={result} />
            ))}
          </div>
        )}

        {!isLoading && !error && query && results.length === 0 && !suggestions.length && (
          <div className="text-center py-8 px-6">
            <div className="mb-4">
              <svg className="w-12 h-12 text-orange-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sonuç Bulunamadı</h3>
            <p className="text-gray-500">
              "{query}" için sözlükte bir sonuç bulunamadı.<br />
              Farklı bir kelime aramayı deneyebilirsiniz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 