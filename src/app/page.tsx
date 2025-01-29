import SearchBox from '@/components/SearchBox';
import YanlisYazimlar from '@/components/YanlisYazimlar';
import GununAtasozu from '@/components/GununAtasozu';

export default function Home() {
  return (
    <main className="flex-1 relative overflow-hidden">
      {/* Arkaplan Desenleri */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/40 via-white to-white -z-10" />
      
      {/* Nokta Pattern */}
      <div className="absolute inset-0 opacity-[0.15] -z-10" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(251, 146, 60, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Üçgen Pattern */}
      <div className="absolute inset-0 opacity-[0.07] -z-10"
        style={{
          backgroundImage: `linear-gradient(60deg, rgba(251, 146, 60, 0.1) 25%, transparent 25%, transparent 75%, rgba(251, 146, 60, 0.1) 75%, rgba(251, 146, 60, 0.1)), 
                           linear-gradient(120deg, rgba(251, 146, 60, 0.1) 25%, transparent 25%, transparent 75%, rgba(251, 146, 60, 0.1) 75%, rgba(251, 146, 60, 0.1))`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Gradient Circles */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-radial from-orange-200/20 via-orange-100/10 to-transparent rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-gradient-radial from-orange-100/20 via-orange-50/10 to-transparent rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/2" />
      
      {/* Floating Shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-200/10 to-transparent rounded-full blur-2xl -z-10 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-bl from-orange-100/10 to-transparent rounded-full blur-2xl -z-10 animate-float-delayed" />

      <div className="container mx-auto px-4 py-12">
        {/* Bilgilendirme */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50/80 px-4 py-2 rounded-full border border-orange-100 shadow-sm backdrop-blur-sm">
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
