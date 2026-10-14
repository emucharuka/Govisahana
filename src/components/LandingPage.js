// Landing Page Component with Hero, Persona Paths, and Feature Highlights
export default function LandingPage({ setActiveView }) {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4CAF50_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold mb-6">
            <span>🇱🇰 Sri Lanka's Premier Agritech Mentorship MVP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Bridging Farmers with <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-green-200 to-amber-300">
              Verified Agricultural Experts
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-emerald-100 font-normal leading-relaxed mb-10">
            Real-time crop disease diagnosis, soil health guidance, and expert consultation for rural Sri Lankan farmers in <span className="font-semibold text-white">Sinhala, Tamil & English</span>. Connect directly with Department of Agriculture officers & consultants.
          </p>

          {/* Dual Entry Path Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            
            {/* Card 1: Farmer Path */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-emerald-300/30 text-slate-800 shadow-xl hover:shadow-2xl transition group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl shadow-inner">
                    🌾
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    ගොවි ජනතාව සඳහා
                  </span>
                </div>
                <h3 className="text-xl font-bold text-emerald-950 mb-2 group-hover:text-emerald-700 transition">
                  I am a Farmer (ගොවි)
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Need quick help for leaf yellowing, pest damage, or fertilizer rates? Send a photo of your crop and talk with an extension officer.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveView('farmer_dashboard')}
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                >
                  <span>Go to Farmer Dashboard</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveView('signup')}
                  className="w-full py-2 px-4 bg-emerald-50 text-emerald-800 font-semibold rounded-xl text-xs hover:bg-emerald-100 transition text-center"
                >
                  Register as New Farmer →
                </button>
              </div>
            </div>

            {/* Card 2: Expert Path */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-amber-300/30 text-slate-800 shadow-xl hover:shadow-2xl transition group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-3xl shadow-inner">
                    👨‍🌾
                  </div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    උපදේශකවරුන් සඳහා
                  </span>
                </div>
                <h3 className="text-xl font-bold text-amber-950 mb-2 group-hover:text-amber-700 transition">
                  I am an Agricultural Expert
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Extension officers & agronomists can review farmer requests, inspect crop disease photos, and prescribe remote guidance.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveView('expert_dashboard')}
                  className="w-full py-3 px-4 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                >
                  <span>Open Expert Desk</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveView('signup')}
                  className="w-full py-2 px-4 bg-amber-50 text-amber-900 font-semibold rounded-xl text-xs hover:bg-amber-100 transition text-center"
                >
                  Apply as Verified Consultant →
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Designed Specifically for Rural Sri Lankan Agriculture
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Simple, low-data accessible interface supporting all 25 Sri Lankan Districts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-emerald-300 transition">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl text-emerald-800 flex items-center justify-center text-2xl mb-4">
              📷
            </div>
            <h4 className="font-bold text-lg text-slate-900 mb-2">Photo Disease Inspection</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Snap a clear photo of infected leaves or soil. Experts analyze leaf spotting, fungi, or nutrient deficiencies instantly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-emerald-300 transition">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl text-emerald-800 flex items-center justify-center text-2xl mb-4">
              🗣️
            </div>
            <h4 className="font-bold text-lg text-slate-900 mb-2">Multi-Channel Support</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Choose your preferred channel: text chat, voice notes, or direct video consultation with local extension officers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-emerald-300 transition">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl text-emerald-800 flex items-center justify-center text-2xl mb-4">
              📜
            </div>
            <h4 className="font-bold text-lg text-slate-900 mb-2">Digital Remedy Cards</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Receive structured prescription cards with exact dosage, timing, and safety precautions for organic or approved inputs.
            </p>
          </div>

        </div>
      </section>

      {/* Localized Testimonials */}
      <section className="bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8 border-t border-b border-emerald-100">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-center font-bold text-xl text-emerald-950 mb-8">
            Trusted by Farmers Across Sri Lanka
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-sm">
              <p className="text-gray-700 italic text-sm mb-4">
                "During the last Yala season, my paddy plants had severe brown planthopper attack. Through GoviSahana, Dr. Nimal identified it in 15 minutes and saved 2 acres."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                  SR
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900">Sunil Rathnayake</h5>
                  <p className="text-[11px] text-gray-500">Paddy Farmer • Kekirawa, Anuradhapura</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-sm">
              <p className="text-gray-700 italic text-sm mb-4">
                "Connecting with Nuwara Eliya agricultural officers for my carrot crop pest issue saved us time and unnecessary chemical costs."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center">
                  KS
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900">K. Sellathurai</h5>
                  <p className="text-[11px] text-gray-500">Vegetable Cultivator • Nuwara Eliya</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs border-t border-slate-800">
        <p>© 2026 GoviSahana (ගොවි සහන) Agritech MVP Platform. Connecting Sri Lankan Farmers with Expert Mentorship.</p>
      </footer>

    </div>
  );
}
