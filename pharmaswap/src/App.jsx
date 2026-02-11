import React, { useState } from 'react';
import {
  Building2, ShoppingBag, Truck, LayoutDashboard,
  Search, Bell, Plus, UserCircle
} from 'lucide-react';
import Dashboard from './views/Dashboard';
import Marketplace from './views/Marketplace';
import MyStock from './views/MyStock';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'marketplace': return <Marketplace />;
      case 'mystock': return <MyStock />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="swap-app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '8px' }}>
            <Truck color="white" size={24} />
          </div>
          <h1 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--secondary)' }}>PharmaSwap</h1>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <NavItem icon={LayoutDashboard} label="Tableau de Bord" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={ShoppingBag} label="Place de Marché" active={activeTab === 'marketplace'} onClick={() => setActiveTab('marketplace')} badge="12" />
          <NavItem icon={Building2} label="Mes Stocks Clés" active={activeTab === 'mystock'} onClick={() => setActiveTab('mystock')} />
        </nav>

        <div style={{ marginTop: 'auto', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <UserCircle size={32} color="#64748b" />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>Pharmacie Élite</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Dr. Wane</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
            {activeTab === 'dashboard' && 'Vue d\'Ensemble'}
            {activeTab === 'marketplace' && 'Place de Marché (Offres)'}
            {activeTab === 'mystock' && 'Gestion de mes Stocks'}
          </h2>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: 10, top: 10, color: '#94a3b8' }} size={20} />
              <input type="text" placeholder="Rechercher produit..." style={{ padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid var(--border)', width: '300px' }} />
            </div>
            <button style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'white', position: 'relative' }}>
              <Bell size={20} color="#64748b" />
              <span style={{ position: 'absolute', top: -2, right: -2, width: '10px', height: '10px', background: 'var(--danger)', borderRadius: '50%' }}></span>
            </button>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={18} /> PUBLIER OFFRE
            </button>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
      background: active ? '#eff6ff' : 'transparent',
      color: active ? 'var(--primary)' : '#64748b',
      border: 'none', borderRadius: '8px', textAlign: 'left', width: '100%',
      fontWeight: active ? '600' : '500'
    }}>
      <Icon size={20} />
      <span>{label}</span>
      {badge && <span style={{ marginLeft: 'auto', background: 'var(--danger)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '100px' }}>{badge}</span>}
    </button>
  );
}
