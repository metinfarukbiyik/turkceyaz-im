import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/40 via-white to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Görseli */}
        <div className="mb-8 relative">
          <div className="text-[10rem] font-black text-orange-100 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-32 h-32 text-orange-500 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 21a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
          </div>
        </div>

        {/* Hata Mesajı */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Aradığınız Sayfa Bulunamadı
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Üzgünüz, aradığınız sayfaya ulaşılamıyor. Sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir.
          </p>
        </div>

        {/* Ana Sayfa Butonu */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors duration-200 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Ana Sayfaya Dön
        </Link>

        {/* Dekoratif Elementler */}
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-transparent rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-1/3 -right-20 w-64 h-64 bg-gradient-to-bl from-orange-100/20 to-transparent rounded-full blur-2xl -z-10" />
      </div>
    </div>
  );
} 