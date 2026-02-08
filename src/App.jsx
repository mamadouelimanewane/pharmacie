import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import POS from './components/POS';
import Inventory from './components/Inventory';
import Patients from './components/Patients';
import Prescriptions from './components/Prescriptions';
import Finances from './components/Finances';
import Planning from './components/Planning';
import Configuration from './components/Configuration';
import ClickAndCollect from './components/ClickAndCollect';
import Automation from './components/Automation';
import AIAssistant from './components/AIAssistant';
import Mutuelles from './components/Mutuelles';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'pos':
        return <POS />;
      case 'ecommerce':
        return <ClickAndCollect />;
      case 'inventory':
        return <Inventory />;
      case 'automation':
        return <Automation />;
      case 'ai':
        return <AIAssistant />;
      case 'mutuelles':
        return <Mutuelles />;
      case 'prescriptions':
        return <Prescriptions />;
      case 'patients':
        return <Patients />;
      case 'finances':
        return <Finances />;
      case 'staff':
        return <Planning />;
      case 'settings':
        return <Configuration />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
