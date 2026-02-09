import React, { useState } from 'react';
import {
  LayoutDashboard, ShoppingCart, Package, Users,
  FileText, Settings, Activity, Smartphone, Cpu,
  Brain, Shield, Thermometer, Radio, Heart,
  Globe, ShoppingBag, PieChart, Menu, X, ChevronRight,
  LogOut, UserCircle, Lock, GraduationCap // Added Lock and GraduationCap
} from 'lucide-react';

// Structure hiérarchisée des menus
const MENU_SECTIONS = [
  {
    title: 'PÔLE COMMERCIAL',
    items: [
      { id: 'pos', label: 'Point de Vente (POS)', icon: ShoppingCart },
      { id: 'prescriptions', label: 'Ordonnances & Prépa', icon: FileText },
      { id: 'community', label: 'Solidarité Africa', icon: Globe }, // Nouveau
      { id: 'loyalty', label: 'Fidélité & Marketing', icon: Heart },
      { id: 'ecommerce', label: 'Click & Collect', icon: Smartphone },
      { id: 'mutuelles', label: 'Tiers-Payant & Factu.', icon: Shield },
    ]
  },
  {
    title: 'PÔLE GESTION',
    items: [
      { id: 'dashboard', label: 'Vue d\'Ensemble', icon: LayoutDashboard },
      { id: 'inventory', label: 'Stocks & Logistique', icon: Package },
      { id: 'compliance', label: 'Conformité & Police', icon: Lock }, // Nouveau
      { id: 'staff', label: 'Planning & RH', icon: Users },
      { id: 'academy', label: 'Pharma Academy', icon: GraduationCap }, // Nouveau
      { id: 'finances', label: 'Reporting Financier', icon: Activity },
    ]
  },
  {
    title: 'PÔLE INNOVATION',
    items: [
      { id: 'automation', label: 'Robot & Automate', icon: Cpu },
      { id: 'ai', label: 'Assistant IA Pro', icon: Brain },
      { id: 'patients', label: 'Dossier Patient Intel.', icon: Heart },
      { id: 'sanitary', label: 'Sécurité Sanitaire IoT', icon: Thermometer },
    ]
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { id: 'mobile-manager', label: 'Vue Gérant Mobile', icon: Smartphone },
      { id: 'boutique-manager', label: 'Manager Boutique', icon: ShoppingBag },
      { id: 'settings', label: 'Paramètres & Sécu', icon: Settings },
    ]
  }
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

  const handleItemClick = (id) => {
    setActiveTab(id);
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  };

  return (
    <div className="sidebar" style={{
      width: collapsed ? '80px' : '280px',
      height: '100vh',
      backgroundColor: '#0f172a', // Slate-900 pour un look pro sombre
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem',
      position: 'sticky',
      top: 0,
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      overflowY: 'auto',
      overflowX: 'hidden',
      borderRight: '1px solid rgba(255,255,255,0.05)',
      zIndex: 50
    }}>
      {/* Header Logo */}
      <div className="logo" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '2rem',
        padding: '0.5rem',
        cursor: 'pointer'
      }} onClick={() => setCollapsed(!collapsed)}>
        <div style={{
          minWidth: '40px',
          width: '40px',
          height: '40px',
          backgroundColor: 'var(--primary)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
        }}>
          <Activity size={24} color="white" />
        </div>
        {!collapsed && (
          <div className="fade-in">
            <h2 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '800', lineHeight: 1, fontFamily: '"Outfit", sans-serif' }}>PharmaElite</h2>
            <span style={{ fontSize: '0.65rem', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>Pro ERP v2.4</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {MENU_SECTIONS.map((section, idx) => (
          <div key={idx} className="menu-section">
            {!collapsed && (
              <h3 style={{
                fontSize: '0.65rem',
                fontWeight: '800',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '0.75rem',
                paddingLeft: '0.75rem'
              }}>
                {section.title}
              </h3>
            )}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {section.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.id)}
                      title={collapsed ? item.label : ''}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.75rem',
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                        color: isActive ? 'white' : '#94a3b8',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'left',
                        position: 'relative',
                        justifyContent: collapsed ? 'center' : 'flex-start'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                          e.currentTarget.style.color = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#94a3b8';
                        }
                      }}
                    >
                      <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                      {!collapsed && (
                        <span style={{ fontSize: '0.9rem', fontWeight: isActive ? '700' : '500', whiteSpace: 'nowrap' }}>
                          {item.label}
                        </span>
                      )}

                      {/* Active Indicator for collapsed mode */}
                      {collapsed && isActive && (
                        <div style={{
                          position: 'absolute',
                          right: '-1.5rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '4px',
                          height: '24px',
                          backgroundColor: 'white',
                          borderRadius: '4px 0 0 4px'
                        }} />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Profile Footer */}
      <div className="user-profile" style={{
        paddingTop: '1.5rem',
        marginTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        justifyContent: collapsed ? 'center' : 'flex-start'
      }}>
        <div style={{
          minWidth: '40px',
          width: '40px',
          height: '40px',
          borderRadius: '50%', // Circle
          backgroundColor: '#334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(255,255,255,0.1)'
        }}>
          <UserCircle size={24} color="#e2e8f0" />
        </div>
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: '800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'white' }}>Dr. Eliman Wane</p>
            <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Admin • En Ligne</p>
          </div>
        )}
        {!collapsed && (
          <button style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}>
            <LogOut size={18} />
          </button>
        )}
      </div>

      <style>{`
        .sidebar::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
