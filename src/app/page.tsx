import SearchBox from '@/components/SearchBox';
import YanlisYazimlar from '@/components/YanlisYazimlar';
import GununAtasozu from '@/components/GununAtasozu';

export default function Home() {
  return (
    <main className="flex-1 relative overflow-hidden">
      {/* Ana Gradient Arkaplan */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/40 via-white to-white -z-10" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.2] -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px),
            linear-gradient(to right, rgba(251, 146, 60, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Diagonal Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.1] -z-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(251, 146, 60, 0.05) 0px,
              rgba(251, 146, 60, 0.05) 2px,
              transparent 2px,
              transparent 8px
            )
          `
        }}
      />

      {/* Gradient Circles */}
      <div className="absolute -top-40 -right-40 w-[80rem] h-[80rem] bg-gradient-radial from-orange-200/30 via-orange-100/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-40 -left-40 w-[80rem] h-[80rem] bg-gradient-radial from-orange-100/30 via-orange-50/10 to-transparent rounded-full blur-3xl -z-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/3 left-20 w-72 h-72 bg-gradient-to-br from-orange-200/20 to-transparent rounded-full blur-2xl -z-10 animate-float" />
      <div className="absolute bottom-1/3 right-20 w-64 h-64 bg-gradient-to-bl from-orange-100/20 to-transparent rounded-full blur-2xl -z-10 animate-float-delayed" />

      <div className="container mx-auto px-4 py-12 relative">
        {/* Bilgilendirme */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border border-orange-100 shadow-sm backdrop-blur-sm">
            <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-orange-600">
              Bu proje test aşamasındadır. İçerik ve özellik iyileştirmeleri devam etmektedir.
            </p>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent">
            Doğru Türkçe Kullanımı
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Türkçeyi doğru ve etkili kullanmanın püf noktaları. Dilimizi en doğru şekilde kullanmak için ihtiyacınız olan tüm bilgiler burada.
          </p>
        </div>

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
