// Signup Page Component with Farmer & Expert Multi-Role Registration
import { useState } from 'react';
import { SRI_LANKAN_DISTRICTS, CROP_TYPES } from '../data/mockData';

export default function SignupPage({ setActiveView, setCurrentRole }) {
  const [role, setRole] = useState('farmer'); // 'farmer' or 'expert'
  
  // Farmer State
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [farmerDistrict, setFarmerDistrict] = useState('Anuradhapura');
  const [farmerDivisional, setFarmerDivisional] = useState('');
  const [selectedCrops, setSelectedCrops] = useState(['paddy', 'vegetables']);
  const [farmerLang, setFarmerLang] = useState('si');

  // Expert State
  const [expertName, setExpertName] = useState('');
  const [expertEmail, setExpertEmail] = useState('');
  const [expertPhone, setExpertPhone] = useState('');
  const [expertNIC, setExpertNIC] = useState('');
  const [expertDept, setExpertDept] = useState('Department of Agriculture - Peradeniya');
  const [expertSpecialization, setExpertSpecialization] = useState('Crop Pest & Disease Control');

  const toggleCrop = (cropId) => {
    if (selectedCrops.includes(cropId)) {
      setSelectedCrops(selectedCrops.filter(c => c !== cropId));
    } else {
      setSelectedCrops([...selectedCrops, cropId]);
    }
  };

  const handleFarmerSubmit = (e) => {
    e.preventDefault();
    setCurrentRole('farmer');
    setActiveView('farmer_dashboard');
  };

  const handleExpertSubmit = (e) => {
    e.preventDefault();
    setCurrentRole('expert');
    setActiveView('expert_dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 flex items-center justify-center p-4 py-10">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 p-6 text-white text-center">
          <h2 className="text-2xl font-extrabold">Create GoviSahana Account</h2>
          <p className="text-xs text-emerald-200 mt-1">Join Sri Lanka's direct farmer-to-expert network</p>
        </div>

        {/* Persona Tabs */}
        <div className="p-6 border-b border-gray-100 bg-emerald-50/50">
          <label className="block text-xs font-bold text-gray-700 mb-2 text-center">Registering As:</label>
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            
            <button
              onClick={() => setRole('farmer')}
              className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                role === 'farmer'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-600/30'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300'
              }`}
            >
              <div className="text-2xl">🌾</div>
              <div>
                <h4 className="font-bold text-sm">Farmer (ගොවි)</h4>
                <p className={`text-[10px] ${role === 'farmer' ? 'text-emerald-100' : 'text-gray-500'}`}>Seek Advice & Crop Care</p>
              </div>
            </button>

            <button
              onClick={() => setRole('expert')}
              className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                role === 'expert'
                  ? 'bg-amber-800 text-white border-amber-800 shadow-md ring-2 ring-amber-600/30'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300'
              }`}
            >
              <div className="text-2xl">👨‍🌾</div>
              <div>
                <h4 className="font-bold text-sm">Agri Expert (උපදේශක)</h4>
                <p className={`text-[10px] ${role === 'expert' ? 'text-amber-100' : 'text-gray-500'}`}>Consultant & Extension</p>
              </div>
            </button>

          </div>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8">
          
          {role === 'farmer' ? (
            /* FARMER SIGNUP FORM */
            <form onSubmit={handleFarmerSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name (සම්පූර්ණ නම)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunil Rathnayake"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Phone (+94)</label>
                  <div className="relative flex rounded-xl border border-gray-300 focus-within:ring-2 focus-within:ring-emerald-600 overflow-hidden bg-white">
                    <span className="inline-flex items-center px-2.5 bg-gray-100 text-gray-600 text-xs font-bold border-r border-gray-300">
                      +94
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="77 123 4567"
                      value={farmerPhone}
                      onChange={(e) => setFarmerPhone(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">District (දිස්ත්‍රික්කය)</label>
                  <select
                    value={farmerDistrict}
                    onChange={(e) => setFarmerDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-600 outline-none bg-white font-medium"
                  >
                    {SRI_LANKAN_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Divisional Secretariat / GN Division</label>
                  <input
                    type="text"
                    placeholder="e.g. Kekirawa / Palugaswewa"
                    value={farmerDivisional}
                    onChange={(e) => setFarmerDivisional(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Language</label>
                  <select
                    value={farmerLang}
                    onChange={(e) => setFarmerLang(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-600 outline-none bg-white font-medium"
                  >
                    <option value="si">සිංහල (Sinhala)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              {/* Primary Crops Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Primary Crops You Cultivate (Select all that apply):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CROP_TYPES.map((crop) => {
                    const isSelected = selectedCrops.includes(crop.id);
                    return (
                      <button
                        key={crop.id}
                        type="button"
                        onClick={() => toggleCrop(crop.id)}
                        className={`p-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
                          isSelected
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <span>{crop.icon}</span>
                        <span className="truncate">{crop.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition text-sm flex items-center justify-center gap-2"
              >
                <span>Register & Open Farmer Dashboard</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

            </form>
          ) : (
            /* EXPERT SIGNUP FORM */
            <form onSubmit={handleExpertSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name with Titles</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Nimal Jayasinghe"
                  value={expertName}
                  onChange={(e) => setExpertName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    placeholder="nimal@agri.gov.lk"
                    value={expertEmail}
                    onChange={(e) => setExpertEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Phone (+94)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+94 77 123 4567"
                    value={expertPhone}
                    onChange={(e) => setExpertPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Govt ID / NIC Number / Reg No.</label>
                  <input
                    type="text"
                    required
                    placeholder="198234509822V"
                    value={expertNIC}
                    onChange={(e) => setExpertNIC(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Primary Specialization</label>
                  <select
                    value={expertSpecialization}
                    onChange={(e) => setExpertSpecialization(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-600 outline-none bg-white font-medium"
                  >
                    <option value="Crop Pest & Disease Control">Crop Pest & Disease Control</option>
                    <option value="Soil Health & Fertilizer Management">Soil Health & Fertilizer Management</option>
                    <option value="Horticulture & Vegetable Crops">Horticulture & Vegetable Crops</option>
                    <option value="Organic Farming & IPM">Organic Farming & IPM</option>
                    <option value="Hydroponics & Precision Farming">Hydroponics & Precision Farming</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Department / Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Department of Agriculture - Peradeniya"
                  value={expertDept}
                  onChange={(e) => setExpertDept(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-600 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 px-4 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl shadow-md transition text-sm flex items-center justify-center gap-2"
              >
                <span>Submit Application & Open Expert Desk</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

            </form>
          )}

          {/* Already registered */}
          <div className="mt-6 pt-5 border-t border-gray-200 text-center text-xs">
            <span className="text-gray-600">Already have an account? </span>
            <button
              onClick={() => setActiveView('login')}
              className="text-emerald-800 font-bold hover:underline"
            >
              Sign In Here →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
