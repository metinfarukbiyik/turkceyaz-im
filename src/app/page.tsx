import SearchBox from '@/components/SearchBox';
import YanlisYazimlar from '@/components/YanlisYazimlar';
import GununAtasozu from '@/components/GununAtasozu';

export default function Home() {
  return (
    <main className="flex-1 bg-gradient-to-b from-white via-white to-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 text-center">
          Doğru Türkçe Kullanımı
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Türkçeyi doğru ve etkili kullanmanın püf noktaları. Dilimizi en doğru şekilde kullanmak için ihtiyacınız olan tüm bilgiler burada.
        </p>

        {/* Arama Kutusu */}
        <div className="mb-16">
          <SearchBox />
        </div>

        {/* Bilgi Kutuları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <YanlisYazimlar />
          <GununAtasozu />
        </div>
      </div>
    </main>
  );
}
