"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { searchWord, getAutocompleteSuggestions, type TDKResponse } from '@/lib/tdk-api';
import WordResult from './WordResult';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<TDKResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(searchTerm, 300);

  // Dışa tıklanma kontrolü
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchWord(searchTerm);
      setSearchResults(results);
    } finally {
      setIsLoading(false);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Önerileri getir
  const fetchSuggestions = useCallback(async (word: string) => {
    if (!word.trim() || word.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const suggestions = await getAutocompleteSuggestions(word.trim());
      setSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } catch {
      setSuggestions([]);
      setShowSuggestions(false);
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
          setSearchTerm(suggestions[selectedIndex]);
          handleSearch();
          setSelectedIndex(-1);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setSelectedIndex(-1);
        setShowSuggestions(false);
        break;
    }
  }, [suggestions, selectedIndex, setSearchTerm, handleSearch]);

  // Öneri seçildiğinde
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setSearchTerm(suggestion);
    handleSearch();
    setSuggestions([]);
    setSelectedIndex(-1);
    setShowSuggestions(false);
  }, [setSearchTerm, handleSearch]);

  // Öneriler için
  useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedQuery, fetchSuggestions]);

  // Otomatik arama için
  useEffect(() => {
    if (debouncedQuery.trim()) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [debouncedQuery, handleSearch]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100/50 h-full" ref={searchBoxRef}>
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-100 p-2 rounded-xl">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-orange-700">
              Türkçe Sözlük
            </h2>
            <p className="text-sm text-orange-500 mt-0.5">
              Türk Dil Kurumu Sözlüğü&apos;nden
            </p>
          </div>
        </div>

        {/* Arama Kutusu */}
        <div className="relative mb-8">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              placeholder="Türkçe Sözlük&apos;te Ara..."
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
            {searchTerm && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <button
                  onClick={handleSearch}
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
                    setSearchTerm('');
                    setSearchResults([]);
                    setSuggestions([]);
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
          {showSuggestions && suggestions.length > 0 && !isLoading && (
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
        {searchTerm && searchResults.length > 0 && (
          <div className="relative z-10 mb-6 pb-6 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{searchTerm}</h2>
                <p className="text-sm text-gray-500">
                  Türk Dil Kurumu Sözlüğü&apos;nde bulunan anlamlar
                </p>
              </div>
              <div className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                {searchResults.length} sonuç
              </div>
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

          {searchResults.length > 0 && (
            <div className="space-y-6">
              {searchResults.map((result) => (
                <WordResult key={result.madde_id} result={result} />
              ))}
            </div>
          )}

          {!isLoading && searchTerm && searchResults.length === 0 && !suggestions.length && (
            <div className="text-center py-8 px-6">
              <div className="mb-4">
                <svg className="w-12 h-12 text-orange-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sonuç Bulunamadı</h3>
              <p className="text-gray-500">
                &quot;{searchTerm}&quot; için sözlükte bir sonuç bulunamadı.<br />
                Farklı bir kelime aramayı deneyebilirsiniz.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 