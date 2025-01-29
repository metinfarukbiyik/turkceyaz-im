export default function YapimAsamasinda({ baslik }: { baslik: string }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100/50 p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-6">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {baslik}
            </h2>
            
            <div className="bg-orange-50 rounded-xl p-4 mt-6 border border-orange-100">
              <p className="text-orange-800">
                Bu sayfa yapım aşamasındadır. Çok yakında hizmetinizde olacaktır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 