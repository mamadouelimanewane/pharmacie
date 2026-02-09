import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard'; // Vue d'ensemble
import POS from './components/POS'; // Point de Vente
import Inventory from './components/Inventory'; // Stocks & Logistique
import Patients from './components/Patients'; // Dossier Patient Intel.
import Prescriptions from './components/Prescriptions'; // Ordonnances & Prépa
import Finances from './components/Finances'; // Reporting Financier
import Planning from './components/Planning'; // Planning & RH
import Configuration from './components/Configuration'; // Paramètres & Sécu
import ClickAndCollect from './components/ClickAndCollect'; // Click & Collect
import Automation from './components/Automation'; // Robot & Automate
import AIAssistant from './components/AIAssistant'; // Assistant IA Pro
import Mutuelles from './components/Mutuelles'; // Tiers-Payant
import SanitarySecurity from './components/SanitarySecurity'; // Sécurité Sanitaire IoT
import BoutiqueBackoffice from './boutique/BoutiqueBackoffice'; // Manager Boutique
import MobileManager from './components/MobileManager'; // Vue Mobile Gérant

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      // PÔLE COMMERCIAL
      case 'pos':
        return <POS />;
      case 'prescriptions':
        return <Prescriptions />;
      case 'ecommerce': // Click & Collect
        return <ClickAndCollect />;
      case 'mutuelles':
        return <Mutuelles />;

      // PÔLE GESTION
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'staff': // Planning & RH
        return <Planning />;
      case 'finances':
        return <Finances />;

      // PÔLE INNOVATION
      case 'automation':
        return <Automation />;
      case 'ai':
        return <AIAssistant />;
      case 'patients':
        return <Patients />;
      case 'sanitary': // Sécurité Sanitaire IoT
        return <SanitarySecurity />;

      // ADMINISTRATION
      case 'boutique-manager':
        return <BoutiqueBackoffice />;
      case 'settings':
        return <Configuration />;
      case 'mobile-manager':
        return <MobileManager />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content" style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
