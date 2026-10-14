// Main GoviSahana Application Root with Mandatory Auth Guard
import { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import FarmerDashboard from './components/FarmerDashboard';
import NewTicketModal from './components/NewTicketModal';
import ConsultationRoom from './components/ConsultationRoom';
import ExpertDashboard from './components/ExpertDashboard';

import { INITIAL_CONSULTATIONS, INITIAL_MESSAGES, EXPERT_PROFILES } from './data/mockData';

export default function App() {
  // currentUser: null when unauthenticated
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState('landing'); // Starts at landing page
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const [consultations, setConsultations] = useState(INITIAL_CONSULTATIONS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [activeConsultationId, setActiveConsultationId] = useState('con_101');
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Handle Authentication Success (Login or Signup)
  const handleAuthSuccess = (userObj) => {
    setCurrentUser(userObj);
    if (userObj.role === 'farmer') {
      setActiveView('farmer_dashboard');
    } else {
      setActiveView('expert_dashboard');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('landing');
  };

  const handleCreateTicket = (newTicket) => {
    setConsultations([newTicket, ...consultations]);
    setMessages({
      ...messages,
      [newTicket.id]: [
        {
          id: `msg_init_${Date.now()}`,
          senderId: currentUser?.id || 'usr_farmer_1',
          senderRole: 'farmer',
          senderName: newTicket.farmerName,
          text: `Ticket Created: ${newTicket.description}`,
          image: newTicket.sampleImage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'user'
        }
      ]
    });
    setActiveConsultationId(newTicket.id);
    setActiveView('farmer_dashboard');
  };

  const handleSendMessage = (consultationId, newMessage) => {
    const existing = messages[consultationId] || [];
    setMessages({
      ...messages,
      [consultationId]: [...existing, newMessage]
    });
  };

  const activeConsultation = consultations.find(c => c.id === activeConsultationId) || consultations[0];
  const activeChatMessages = messages[activeConsultationId] || [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main View Router with Auth Guards */}
      <main className="flex-1">
        {activeView === 'landing' && (
          <LandingPage setActiveView={setActiveView} />
        )}

        {activeView === 'login' && (
          <LoginPage setActiveView={setActiveView} onLoginSuccess={handleAuthSuccess} />
        )}

        {activeView === 'signup' && (
          <SignupPage setActiveView={setActiveView} onSignupSuccess={handleAuthSuccess} />
        )}

        {/* Protected Farmer Dashboard */}
        {activeView === 'farmer_dashboard' && (
          currentUser ? (
            <FarmerDashboard
              currentUser={currentUser}
              consultations={consultations}
              onOpenNewTicketModal={() => setIsTicketModalOpen(true)}
              onSelectConsultation={(id) => setActiveConsultationId(id)}
              setActiveView={setActiveView}
            />
          ) : (
            <LoginPage setActiveView={setActiveView} onLoginSuccess={handleAuthSuccess} />
          )
        )}

        {/* Protected Consultation Room */}
        {activeView === 'consultation_room' && (
          currentUser ? (
            <ConsultationRoom
              currentUser={currentUser}
              consultation={activeConsultation}
              messages={activeChatMessages}
              onSendMessage={handleSendMessage}
              onBackToDashboard={() => setActiveView(currentUser.role === 'farmer' ? 'farmer_dashboard' : 'expert_dashboard')}
            />
          ) : (
            <LoginPage setActiveView={setActiveView} onLoginSuccess={handleAuthSuccess} />
          )
        )}

        {/* Protected Expert Desk */}
        {activeView === 'expert_dashboard' && (
          currentUser ? (
            <ExpertDashboard
              currentUser={currentUser}
              consultations={consultations}
              onSelectConsultation={(id) => setActiveConsultationId(id)}
              setActiveView={setActiveView}
            />
          ) : (
            <LoginPage setActiveView={setActiveView} onLoginSuccess={handleAuthSuccess} />
          )
        )}
      </main>

      {/* New Consultation Ticket Modal */}
      <NewTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        onSubmitTicket={handleCreateTicket}
        currentUser={currentUser}
      />

    </div>
  );
}
