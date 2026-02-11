import React, { useState } from 'react';
import {
  Users, HeartHandshake, Syringe, Crown,
  PlusCircle, History, AlertTriangle, Play
} from 'lucide-react';
import Dashboard from './views/Dashboard';
import Members from './views/Members';
import SOS from './views/SOS';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock State for the Tontine Group
  const [group, setGroup] = useState({
    name: "Calebasse Liberté 6",
    balance: 850000,
    members: 12,
    president: "Sadio Mané"
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard group={group} setActiveTab={setActiveTab} />;
      case 'members': return <Members group={group} />;
      case 'sos': return <SOS group={group} />;
      default: return <Dashboard group={group} />;
    }
  };

  return (
    <div className="tontine-app">
      {/* Dynamic Header */}
      <header style={{ background: 'var(--primary)', padding: '20px', paddingBottom: '30px', borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px', color: '#fffcc' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: 'white', padding: '8px', borderRadius: '12px' }}>
              <HeartHandshake size={24} color="var(--primary-dark)" />
            </div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#78350f' }}>TontineCare</h1>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '700', color: '#78350f', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Crown size={14} /> Présidente
          </div>
        </div>

        <div style={{ textAlign: 'center', color: '#78350f' }}>
          <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '4px' }}>Solde Communauté</p>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>{group.balance.toLocaleString()} F</h2>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ marginTop: '-20px', padding: '0 20px 100px 20px' }}>
        {renderContent()}
      </main>

      {/* Big Bottom Nav */}
      <nav style={{
        position: 'fixed', bottom: 20, left: 20, right: 20,
        background: '#292524', borderRadius: '24px', padding: '12px',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <NavBtn icon={Users} label="Membres" active={activeTab === 'members'} onClick={() => setActiveTab('members')} />
        <div onClick={() => setActiveTab('dashboard')} style={{
          background: 'var(--primary)', width: '64px', height: '64px',
          borderRadius: '50%', marginTop: '-40px', border: '6px solid white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 5px 15px rgba(245, 158, 11, 0.4)', cursor: 'pointer'
        }}>
          <HeartHandshake size={32} color="white" />
        </div>
        <NavBtn icon={Syringe} label="Urgence" active={activeTab === 'sos'} onClick={() => setActiveTab('sos')} isAlert />
      </nav>
    </div>
  );
}

function NavBtn({ icon: Icon, label, active, onClick, isAlert }) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', color: active ? 'var(--primary)' : '#a8a29e', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
      <Icon size={24} color={isAlert && active ? '#ef4444' : 'currentColor'} />
      <span style={{ fontSize: '0.7rem', fontWeight: '700' }}>{label}</span>
    </button>
  )
}

export default App;
