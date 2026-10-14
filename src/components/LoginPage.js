// Login Page Component with Sri Lankan Phone Auth & Quick Demo Shortcuts
import { useState } from 'react';

export default function LoginPage({ setActiveView, setCurrentRole }) {
  const [authMode, setAuthMode] = useState('otp'); // 'otp' or 'password'
  const [phone, setPhone] = useState('77 555 1212');
  const [role, setRole] = useState('farmer'); // 'farmer' or 'expert'
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'otp' && !otpStep) {
      setOtpStep(true);
      return;
    }
    // Set role & redirect to corresponding dashboard
    setCurrentRole(role);
    if (role === 'farmer') {
      setActiveView('farmer_dashboard');
    } else {
      setActiveView('expert_dashboard');
    }
  };

  const handleDemoLogin = (targetRole) => {
    setCurrentRole(targetRole);
    if (targetRole === 'farmer') {
      setActiveView('farmer_dashboard');
    } else {
      setActiveView('expert_dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 flex items-center justify-center p-4 py-10">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 p-6 text-white text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl mx-auto mb-3 border border-white/20">
            🌾
          </div>
          <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-emerald-200 mt-1">GoviSahana Agritech Portal • ගොවි සහන</p>
        </div>

        <div className="p-6 sm:p-8">
          
          {/* Quick Demo Login Bar */}
          <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 mb-6 text-center">
            <p className="text-[11px] font-bold text-emerald-900 mb-2 uppercase tracking-wider">
              ⚡ Quick Demo One-Click Login
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDemoLogin('farmer')}
                className="py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1"
              >
                <span>🌾 Login as Farmer</span>
              </button>
              <button
                onClick={() => handleDemoLogin('expert')}
                className="py-2 px-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1"
              >
                <span>👨‍🌾 Login as Expert</span>
              </button>
            </div>
          </div>

          {/* Role Selection Segmented Control */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-700 mb-2">Select Account Role:</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setRole('farmer')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition ${
                  role === 'farmer' ? 'bg-emerald-700 text-white shadow-sm' : 'text-gray-600 hover:text-emerald-900'
                }`}
              >
                🌾 Farmer (ගොවි)
              </button>
              <button
                type="button"
                onClick={() => setRole('expert')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition ${
                  role === 'expert' ? 'bg-amber-800 text-white shadow-sm' : 'text-gray-600 hover:text-amber-900'
                }`}
              >
                👨‍🌾 Expert (උපදේශක)
              </button>
            </div>
          </div>

          {/* Authentication Mode Switcher */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-5 text-xs font-semibold text-gray-500">
            <button
              onClick={() => { setAuthMode('otp'); setOtpStep(false); }}
              className={`pb-1 ${authMode === 'otp' ? 'text-emerald-800 border-b-2 border-emerald-700 font-bold' : ''}`}
            >
              📱 Mobile OTP (SMS)
            </button>
            <button
              onClick={() => { setAuthMode('password'); setOtpStep(false); }}
              className={`pb-1 ${authMode === 'password' ? 'text-emerald-800 border-b-2 border-emerald-700 font-bold' : ''}`}
            >
              🔑 Password
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {!otpStep ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Sri Lankan Mobile Phone Number
                  </label>
                  <div className="relative flex rounded-xl border border-gray-300 focus-within:ring-2 focus-within:ring-emerald-600 overflow-hidden bg-white shadow-sm">
                    <span className="inline-flex items-center px-3 bg-gray-100 text-gray-600 text-xs font-bold border-r border-gray-300">
                      🇱🇰 +94
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="77 123 4567"
                      required
                      className="w-full px-3 py-2.5 text-sm font-semibold text-gray-800 outline-none"
                    />
                  </div>
                </div>

                {authMode === 'password' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-600 outline-none shadow-sm"
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                <label className="block text-xs font-bold text-emerald-950 mb-1 text-center">
                  Enter 4-Digit Verification Code sent to +94 {phone}
                </label>
                <div className="flex justify-center gap-2 my-3">
                  {[1, 2, 3, 4].map((idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength="1"
                      defaultValue={idx === 1 ? '5' : idx === 2 ? '8' : idx === 3 ? '2' : '9'}
                      className="w-12 h-12 text-center text-xl font-bold bg-white border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none shadow-sm"
                    />
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 text-center">
                  Didn't receive SMS? <button type="button" className="text-emerald-700 font-bold underline">Resend Code</button>
                </p>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-xl text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 ${
                role === 'farmer' ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-amber-800 hover:bg-amber-900'
              }`}
            >
              <span>{otpStep ? 'Verify Code & Sign In' : authMode === 'otp' ? 'Send OTP Verification SMS' : 'Sign In'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

          </form>

          {/* Link to Signup */}
          <div className="mt-6 pt-5 border-t border-gray-200 text-center text-xs">
            <span className="text-gray-600">Don't have a GoviSahana account yet? </span>
            <button
              onClick={() => setActiveView('signup')}
              className="text-emerald-800 font-bold hover:underline"
            >
              Create Account (Sign Up) →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
