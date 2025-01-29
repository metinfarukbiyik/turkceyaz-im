export default function YolHaritasi() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/40 via-white to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Yol Haritası
          </h1>
          <p className="text-gray-600">
            TurkceYaz.im projesinin gelişim süreci ve planları
          </p>
        </div>

        <div className="space-y-16">
          {/* Tamamlanan Özellikler */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Tamamlanan Özellikler
            </h2>
            <div className="grid gap-4">
              {[
                {
                  title: "Ana Sayfa Tasarımı",
                  description: "Modern ve kullanıcı dostu bir arayüz ile ana sayfa tasarımı tamamlandı.",
                  date: "Mart 2024"
                },
                {
                  title: "TDK API Entegrasyonu",
                  description: "Türk Dil Kurumu sözlük API'si entegre edildi ve kelime arama özelliği eklendi.",
                  date: "Mart 2024"
                },
                {
                  title: "Sık Yapılan Yanlışlar",
                  description: "Sık yapılan yazım yanlışları ve doğru kullanımları eklendi.",
                  date: "Mart 2024"
                },
                {
                  title: "Günün Atasözü",
                  description: "Her gün farklı bir atasözü ve anlamı gösteriliyor.",
                  date: "Mart 2024"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-green-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Devam Eden Çalışmalar */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Devam Eden Çalışmalar
            </h2>
            <div className="grid gap-4">
              {[
                {
                  title: "Yazım Kuralları Sayfası",
                  description: "Kapsamlı yazım kuralları rehberi hazırlanıyor.",
                  progress: 30
                },
                {
                  title: "Noktalama İşaretleri",
                  description: "Noktalama işaretlerinin kullanım rehberi hazırlanıyor.",
                  progress: 25
                },
                {
                  title: "Atasözleri ve Deyimler",
                  description: "Atasözleri ve deyimler veritabanı genişletiliyor.",
                  progress: 40
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-orange-100">
                  <h3 className="font-medium text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="w-full bg-orange-100 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Planlanan Özellikler */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Planlanan Özellikler
            </h2>
            <div className="grid gap-4">
              {[
                {
                  title: "Alıştırmalar ve Testler",
                  description: "Yazım ve noktalama kuralları için interaktif alıştırmalar.",
                  eta: "2024 Q2"
                },
                {
                  title: "Dark Mode",
                  description: "Koyu tema desteği.",
                  eta: "2024 Q3"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-blue-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {item.eta}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 