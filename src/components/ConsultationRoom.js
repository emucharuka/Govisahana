// Consultation Room Chat Interface Component with Header, Timeline, Photo Attachment, & Remedies
import { useState, useRef, useEffect } from 'react';

export default function ConsultationRoom({ consultation, messages, onSendMessage, onBackToDashboard }) {
  const [inputText, setInputText] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!consultation) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-xl font-bold text-gray-700">No active consultation selected.</p>
          <button
            onClick={onBackToDashboard}
            className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
          >
            ← Back to Farmer Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedPhoto) return;

    onSendMessage(consultation.id, {
      id: `msg_${Date.now()}`,
      senderId: 'usr_farmer_1',
      senderRole: 'farmer',
      senderName: 'Sunil Rathnayake',
      text: inputText,
      image: selectedPhoto,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'user'
    });

    setInputText('');
    setSelectedPhoto(null);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const expert = consultation.assignedExpert;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-slate-100">
      
      {/* Consultation Room Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back button & Expert info */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDashboard}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition font-bold text-xs flex items-center gap-1"
            >
              <span>←</span>
              <span className="hidden sm:inline">Dashboard</span>
            </button>

            {expert ? (
              <div className="flex items-center gap-3 border-l border-gray-200 pl-3">
                <div className="relative">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-emerald-600 shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{expert.name}</h3>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                      ✓ Verified Expert
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    {expert.specialization} • {expert.department}
                  </p>
                </div>
              </div>
            ) : (
              <div className="border-l border-gray-200 pl-3">
                <h3 className="font-bold text-sm text-slate-900">Consultation Session: {consultation.ticketId}</h3>
                <p className="text-xs text-amber-700">Waiting for agricultural officer assignment...</p>
              </div>
            )}
          </div>

          {/* Ticket Meta & Quick Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:block text-right">
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {consultation.cropLabel} Crop
              </span>
              <p className="text-[10px] text-gray-500 mt-0.5">Channel: {consultation.channel}</p>
            </div>

            <button
              onClick={() => alert("Initiating encrypted Voice Call with Agronomist...")}
              className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
            >
              <span>📞</span>
              <span className="hidden sm:inline">Voice Call</span>
            </button>
            <button
              onClick={() => alert("Initiating HD Video Consultation...")}
              className="p-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
            >
              <span>📹</span>
              <span className="hidden sm:inline">Video</span>
            </button>
          </div>

        </div>
      </div>

      {/* Ticket Details Summary Bar */}
      <div className="bg-emerald-900 text-emerald-100 px-4 py-2 text-xs border-b border-emerald-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="font-extrabold text-amber-300">Ticket #{consultation.ticketId}:</span>
            <span className="font-medium truncate">{consultation.title}</span>
          </div>
          <span className="font-bold bg-emerald-800 px-2 py-0.5 rounded text-[11px]">
            Status: {consultation.status}
          </span>
        </div>
      </div>

      {/* Message Timeline Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 chat-scroll space-y-4">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* System Welcome Badge */}
          <div className="text-center my-4">
            <span className="inline-block bg-white border border-gray-200 shadow-sm text-gray-600 text-xs px-3.5 py-1.5 rounded-full font-medium">
              🔒 Encrypted Agricultural Session Started • Sri Lanka Dept of Agriculture
            </span>
          </div>

          {messages.map((msg) => {
            const isFarmer = msg.senderRole === 'farmer';
            const isPrescription = msg.type === 'prescription';

            if (isPrescription) {
              return (
                <div key={msg.id} className="flex justify-start my-4">
                  <div className="max-w-xl w-full bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 shadow-md">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-amber-200">
                      <span className="text-xl">📜</span>
                      <div>
                        <h4 className="font-black text-amber-950 text-sm">{msg.prescription.title}</h4>
                        <p className="text-[10px] text-amber-800 font-semibold">Issued by {msg.senderName}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-bold text-amber-900">Treatment: </span>
                        <span className="text-gray-800 font-semibold">{msg.prescription.treatment}</span>
                      </div>
                      <div>
                        <span className="font-bold text-amber-900">Dosage Rate: </span>
                        <span className="text-gray-800 font-semibold">{msg.prescription.dosage}</span>
                      </div>
                      <div>
                        <span className="font-bold text-amber-900">Application Timing: </span>
                        <span className="text-gray-800">{msg.prescription.timing}</span>
                      </div>
                      <div className="bg-amber-100 p-2 rounded-lg text-amber-900 text-[11px] font-medium border border-amber-200">
                        ⚠️ <span className="font-bold">Precaution: </span>{msg.prescription.precaution}
                      </div>
                    </div>

                    <div className="mt-3 text-right text-[10px] text-amber-700 font-bold">
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className={`flex ${isFarmer ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md sm:max-w-lg rounded-2xl p-4 shadow-sm ${
                  isFarmer
                    ? 'bg-emerald-700 text-white rounded-tr-none'
                    : 'bg-white border border-gray-200 text-slate-900 rounded-tl-none'
                }`}>
                  
                  <div className="flex items-center justify-between gap-3 mb-1 text-[11px] font-bold opacity-80">
                    <span>{msg.senderName}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {msg.image && (
                    <div className="my-2 cursor-pointer relative group" onClick={() => setZoomImage(msg.image)}>
                      <img
                        src={msg.image}
                        alt="Crop Attachment"
                        className="rounded-xl max-h-56 w-full object-cover border border-emerald-300 shadow"
                      />
                      <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        🔍 Click to Zoom
                      </span>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                    {msg.text}
                  </p>

                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="bg-slate-200/70 border-t border-gray-200 px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-gray-500 font-bold text-[11px] shrink-0">Quick Prompts:</span>
          {[
            "Sent leaf photo",
            "When should I spray?",
            "Can I use organic compost?",
            "Request voice call"
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInputText(prompt)}
              className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-emerald-900 rounded-full border border-gray-300 text-[11px] font-semibold shrink-0 transition"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Preview Strip if selected */}
      {selectedPhoto && (
        <div className="bg-emerald-50 p-2 border-t border-emerald-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img src={selectedPhoto} alt="Selected" className="w-10 h-10 rounded-lg object-cover border border-emerald-400" />
            <span className="text-xs font-bold text-emerald-900">Crop Photo Ready to Send</span>
          </div>
          <button
            onClick={() => setSelectedPhoto(null)}
            className="text-xs text-red-600 font-bold hover:underline"
          >
            Remove
          </button>
        </div>
      )}

      {/* Input Toolbar & Area */}
      <div className="bg-white border-t border-gray-200 p-3 sm:p-4">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-2">
          
          {/* Upload Photo Button (Crucial Requirement) */}
          <label className="p-2.5 rounded-xl bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-900 border border-gray-300 cursor-pointer transition flex items-center justify-center shrink-0">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <span className="text-lg">📷</span>
          </label>

          {/* Text Input */}
          <input
            type="text"
            placeholder="Type your message or crop query here... (මෙහි පණිවිඩය සටහන් කරන්න)"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 outline-none font-medium bg-slate-50"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-1.5 shrink-0"
          >
            <span>Send</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>

        </form>
      </div>

      {/* Full Image Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setZoomImage(null)}
        >
          <div className="max-w-3xl max-h-[90vh] relative">
            <img src={zoomImage} alt="Zoomed Crop" className="max-h-[85vh] rounded-2xl object-contain shadow-2xl mx-auto" />
            <p className="text-center text-white text-xs mt-2 font-bold">Tap anywhere to close zoom</p>
          </div>
        </div>
      )}

    </div>
  );
}
