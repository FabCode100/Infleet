import React, { useState } from 'react';
import { Dashboard } from './views/Dashboard';
import { Monitoring } from './views/Monitoring';
import { VehicleDetails } from './views/VehicleDetails';
import { Alerts } from './views/Alerts';
import { Sustainability } from './views/Sustainability';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'monitoring':
        return <Monitoring onNavigate={setCurrentView} />;
      case 'vehicle-details':
        return <VehicleDetails onNavigate={setCurrentView} />;
      case 'alerts':
        return <Alerts onNavigate={setCurrentView} />;
      case 'sustainability':
        return <Sustainability onNavigate={setCurrentView} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-background-dark">
      {renderView()}
    </div>
  );
}
