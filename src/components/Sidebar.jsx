import React from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  FileText,
  Settings,
  Bell,
  LogOut,
  Activity,
  UserCircle,
  Smartphone,
  Cpu,
  Brain,
  Shield,
  Lock,
  Thermometer,
  Zap,
  Radio,
  Heart,
  Globe,
  ShoppingBag
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', id: 'dashboard' },
  { icon: ShoppingCart, label: 'Ventes / Comptoir', id: 'pos' },
  { icon: Smartphone, label: 'Click & Collect', id: 'ecommerce' },
  { icon: ShoppingBag, label: 'Manager Boutique Publique', id: 'boutique-manager' },
  { icon: Globe, label: 'Voir Site Client', id: 'boutique-preview' },
  { icon: Package, label: 'Gestion des Stocks', id: 'inventory' },
  { icon: Cpu, label: 'Automate / Robot', id: 'automation' },
  { icon: Radio, label: 'Centre d\'AI Automation', id: 'automation-center' },
  { icon: Brain, label: 'Intelligence Artificielle', id: 'ai' },
  { icon: Heart, label: 'Patients & Observance', id: 'patients' },
  { icon: Shield, label: 'Mutuelles / Tiers-Payant', id: 'mutuelles' },
  { icon: FileText, label: 'Ordonnances', id: 'prescriptions' },
  { icon: Activity, label: 'Finances / Reporting', id: 'finances' },
  { icon: Users, label: 'RH & Planning', id: 'staff' },
  { icon: Thermometer, label: 'Sécurité Sanitaire (IoT)', id: 'sanitary-security' },
  { icon: Lock, label: 'Sécurité Informatique', id: 'security' },
  { icon: Settings, label: 'Paramètres', id: 'settings' },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sidebar" style={{
      width: '300px',
      height: '100vh',
      backgroundColor: 'var(--secondary)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem',
      position: 'sticky',
      top: 0,
      overflowY: 'auto'
    }}>
      <div className="logo" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '2.5rem',
        padding: '0.5rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'var(--primary)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
        }}>
          <Activity size={24} color="white" />
        </div>
        <div>
          <h2 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '-4px' }}>PharmaElite</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pro Management ERP</span>
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: activeTab === item.id ? 'var(--primary)' : 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  fontWeight: activeTab === item.id ? '900' : '400'
                }}
              >
                <item.icon size={18} opacity={activeTab === item.id ? 1 : 0.7} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="user-profile" style={{
        paddingTop: '1.5rem',
        marginTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <UserCircle size={24} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '0.8rem', fontWeight: '900', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Dr. Mamadou Elimane Wane</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pharmacien Titulaire</p>
        </div>
      </div>
    </div>
  );
}
