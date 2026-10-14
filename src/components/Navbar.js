// Navbar Component with Role & Language Switcher
export default function Navbar({ activeView, setActiveView, currentLanguage, setCurrentLanguage, currentRole, setCurrentRole, activeConsultationId }) {
  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('landing')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-emerald-900">GoviSahana</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-300">MVP</span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium">ගොවි සහන • 𑀓𑁄𑀯𑀺 𑀘𑀳𑀦</p>
            </div>
          </div>

          {/* Quick View Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setActiveView('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeView === 'landing' ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-600 hover:text-emerald-800'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveView('farmer_dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeView === 'farmer_dashboard' ? 'bg-emerald-700 text-white shadow-sm' : 'text-gray-600 hover:text-emerald-800'
              }`}
            >
              <span>🌾 Farmer Portal</span>
            </button>
            <button
              onClick={() => setActiveView('consultation_room')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition relative flex items-center gap-1.5 ${
                activeView === 'consultation_room' ? 'bg-emerald-700 text-white shadow-sm' : 'text-gray-600 hover:text-emerald-800'
              }`}
            >
              <span>💬 Chat Room</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </button>
            <button
              onClick={() => setActiveView('expert_dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeView === 'expert_dashboard' ? 'bg-amber-700 text-white shadow-sm' : 'text-gray-600 hover:text-amber-800'
              }`}
            >
              <span>👨‍🌾 Expert Desk</span>
            </button>
          </nav>

          {/* Right Controls: Auth buttons & Language Selector */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 text-xs rounded-lg px-2.5 py-1.5 font-medium focus:ring-2 focus:ring-emerald-600 cursor-pointer shadow-sm"
              >
                <option value="en">🌐 English</option>
                <option value="si">🌐 සිංහල (Sinhala)</option>
                <option value="ta">🌐 தமிழ் (Tamil)</option>
              </select>
            </div>

            {/* Auth Navigation */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200">
              <button
                onClick={() => setActiveView('login')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeView === 'login' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => setActiveView('signup')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition shadow-sm"
              >
                Sign Up
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
