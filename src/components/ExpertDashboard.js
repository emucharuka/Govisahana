// Expert Dashboard Component for Extension Officers & Consultants
import { useState } from 'react';

export default function ExpertDashboard({ consultations, onAcceptTicket, onSelectConsultation, setActiveView }) {
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState('All');

  const incomingRequests = consultations.filter(c => c.status === 'Requested');
  const activeConsultations = consultations.filter(c => c.status === 'In Progress' || c.status === 'Accepted');

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs bg-amber-800 text-amber-200 font-bold px-2.5 py-0.5 rounded-full border border-amber-700">
                👨‍🌾 Official Extension Officer Desk
              </span>
              <span className="text-xs text-amber-300">✓ Department of Agriculture - Peradeniya</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dr. Nimal Jayasinghe (Senior Agronomist)
            </h1>
            <p className="text-xs text-amber-200 mt-1">
              Specialization: Crop Pest & Disease Control • Operating Area: North Central & Central Provinces
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-center">
            <span className="text-xs text-amber-200 font-semibold block">Total Resolved Cases</span>
            <span className="text-2xl font-black text-amber-300">342 Farmers</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Incoming Farmer Requests Section */}
        <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">Incoming Farmer Help Requests</h2>
                <span className="text-xs font-extrabold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                  {incomingRequests.length} Pending
                </span>
              </div>
              <p className="text-xs text-gray-500">Review tickets submitted by Sri Lankan rural farmers</p>
            </div>
          </div>

          {incomingRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm font-semibold">
              🎉 No pending unassigned requests in queue.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {incomingRequests.map((req) => (
                <div key={req.id} className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 hover:border-amber-400 transition">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                      📍 {req.farmerDistrict} District
                    </span>
                    <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                      Urgency: {req.urgency}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mb-1">{req.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">{req.description}</p>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-amber-200/60">
                    <div>
                      <span className="font-bold text-slate-800">{req.farmerName}</span>
                      <span className="text-[11px] text-gray-500 block">Crop: {req.cropLabel}</span>
                    </div>

                    <button
                      onClick={() => {
                        onAcceptTicket(req.id);
                        onSelectConsultation(req.id);
                        setActiveView('consultation_room');
                      }}
                      className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs rounded-xl shadow transition"
                    >
                      Accept & Join Chat →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Consultations Queue */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-1">Your Active Consultations</h2>
          <p className="text-xs text-gray-500 mb-6">Manage ongoing disease diagnosis sessions</p>

          <div className="space-y-3">
            {activeConsultations.map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {item.ticketId}
                    </span>
                    <span className="text-xs font-semibold text-gray-700">{item.farmerName} ({item.farmerDistrict})</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                </div>

                <button
                  onClick={() => {
                    onSelectConsultation(item.id);
                    setActiveView('consultation_room');
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Open Chat Room →
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
