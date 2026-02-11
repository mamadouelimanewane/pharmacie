import React, { useState } from 'react';
import {
  Home, Send, Activity, User,
  MapPin, Bell, Plus, Search
} from 'lucide-react';
import HomeView from './views/HomeView';
import SendView from './views/SendView';
import ActivityView from './views/ActivityView';
import ProfileView from './views/ProfileView';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeView setActiveTab={setActiveTab} />;
      case 'send': return <SendView />;
      case 'activity': return <ActivityView />;
      case 'profile': return <ProfileView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="app-container">
      {/* Top Bar (simulated) */}
      <div className="glass" style={{
        position: 'sticky', top: 0, zIndex: 50, padding: '16px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '1.2rem' }}>D</span>
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--secondary)' }}>DiasPharma</span>
        </div>
        <button style={{ background: 'none', border: 'none', position: 'relative' }}>
          <Bell size={24} color="var(--secondary)" />
          <span style={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', background: 'var(--danger)', borderRadius: '50%', border: '2px solid white' }}></span>
        </button>
      </div>

      {/* Main Content Area */}
      <main style={{ paddingBottom: '80px', minHeight: '100vh' }}>
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="glass" style={{
        position: 'fixed', bottom: 0,
        width: '100%', maxWidth: '480px', // Matches max-width of container
        display: 'flex', justifyContent: 'space-around', padding: '16px 0',
        borderTop: '1px solid var(--border)', background: 'white'
      }}>
        <NavButton icon={Home} label="Accueil" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavButton icon={Send} label="Envoyer" active={activeTab === 'send'} onClick={() => setActiveTab('send')} highlight />
        <NavButton icon={Activity} label="Activités" active={activeTab === 'activity'} onClick={() => setActiveTab('activity')} />
        <NavButton icon={User} label="Profil" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </nav>
    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick, highlight }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
        border: 'none', background: 'none', cursor: 'pointer',
        color: active ? 'var(--primary)' : 'var(--text-muted)'
      }}
    >
      {highlight && active ? (
        <div style={{ background: 'var(--primary)', padding: '10px', borderRadius: '50%', marginTop: '-30px', boxShadow: '0 10px 20px rgba(5, 150, 105, 0.3)' }}>
          <Icon size={24} color="white" />
        </div>
      ) : (
        <Icon size={24} strokeWidth={active ? 2.5 : 2} />
      )}
      <span style={{ fontSize: '0.7rem', fontWeight: active ? '700' : '500' }}>{label}</span>
    </button>
  );
}

export default App;
