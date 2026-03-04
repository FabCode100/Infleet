import React, { useState, useEffect, useCallback } from 'react';
import { Dashboard } from './views/Dashboard';
import { Monitoring } from './views/Monitoring';
import { VehicleDetails } from './views/VehicleDetails';
import { Alerts } from './views/Alerts';
import { Sustainability } from './views/Sustainability';
import { PushToastContainer } from './components/PushToast';
import { NotificationCenter } from './components/NotificationCenter';
import { useNotifications } from './hooks/useNotifications';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const notif = useNotifications();

  // Simulate critical fleet notifications for demo purposes
  useEffect(() => {
    const criticalAlerts = [
      {
        title: 'Excesso de Velocidade Detectado',
        message: 'Veículo V-402 atingiu 105km/h em zona de 80km/h na I-95 Sul. Ação imediata necessária.',
        priority: 'critical' as const,
        category: 'speed' as const,
        vehicle: 'V-402',
        driver: 'Marcus Thompson',
        actionLabel: 'Ligar para Motorista',
      },
      {
        title: 'Combustível Criticamente Baixo',
        message: 'Veículo V-188 com apenas 5% de combustível restante. Posto mais próximo a 12km.',
        priority: 'high' as const,
        category: 'fuel' as const,
        vehicle: 'V-188',
        driver: 'Jordan Lee',
      },
      {
        title: 'Frenagem Brusca Detectada',
        message: 'G-Force de 4.2G registrado no veículo FLT-8890. Telemetria indica possível colisão.',
        priority: 'critical' as const,
        category: 'brake' as const,
        vehicle: 'FLT-8890',
        driver: 'João Silva',
        actionLabel: 'Ver Detalhes',
      },
      {
        title: 'Saída de Perímetro',
        message: 'Veículo GHT-4451 saiu da cerca eletrônica autorizada na região metropolitana.',
        priority: 'medium' as const,
        category: 'geofence' as const,
        vehicle: 'GHT-4451',
        driver: 'Ana Costa',
      },
      {
        title: 'Check Engine - Pressão de Óleo',
        message: 'Sensor de pressão de óleo no veículo KML-1029 reportando valores anormais.',
        priority: 'low' as const,
        category: 'maintenance' as const,
        vehicle: 'KML-1029',
        driver: 'Lucas Lima',
      },
    ];

    // Stagger initial notifications
    const timers: ReturnType<typeof setTimeout>[] = [];

    criticalAlerts.forEach((alert, i) => {
      const timer = setTimeout(() => {
        notif.pushNotification(alert);
      }, 2000 + i * 4000);
      timers.push(timer);
    });

    // Simulate periodic alerts
    const periodicTimer = setInterval(() => {
      const randomAlerts = [
        {
          title: 'Limite de Jornada Próximo',
          message: 'Motorista João Silva com 9h45min de jornada. Limite de 10h em 15 minutos.',
          priority: 'high' as const,
          category: 'system' as const,
          vehicle: 'FLT-8890',
          driver: 'João Silva',
        },
        {
          title: 'Manutenção Preventiva',
          message: 'Veículo V-501 atingiu 50.000km. Revisão programada necessária.',
          priority: 'medium' as const,
          category: 'maintenance' as const,
          vehicle: 'V-501',
          driver: 'Sarah Chen',
        },
        {
          title: 'Botão de Pânico Ativado',
          message: 'URGENTE: Botão de pânico pressionado no veículo ABC-1234. Verificar imediatamente.',
          priority: 'critical' as const,
          category: 'panic' as const,
          vehicle: 'ABC-1234',
          driver: 'Marcos Pereira',
          actionLabel: 'Acionar Emergência',
        },
      ];

      const randomIdx = Math.floor(Math.random() * randomAlerts.length);
      notif.pushNotification(randomAlerts[randomIdx]);
    }, 30000);

    return () => {
      timers.forEach(t => clearTimeout(t));
      clearInterval(periodicTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} notificationProps={notif} />;
      case 'monitoring':
        return <Monitoring onNavigate={setCurrentView} />;
      case 'vehicle-details':
        return <VehicleDetails onNavigate={setCurrentView} />;
      case 'alerts':
        return <Alerts onNavigate={setCurrentView} />;
      case 'sustainability':
        return <Sustainability onNavigate={setCurrentView} />;
      default:
        return <Dashboard onNavigate={setCurrentView} notificationProps={notif} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-background-dark">
      {renderView()}

      {/* Global Push Toast Notifications */}
      <PushToastContainer
        notifications={notif.toasts}
        onDismiss={notif.dismissToast}
        onMarkRead={notif.markAsRead}
        onOpenCenter={() => notif.setIsOpen(true)}
      />

      {/* Notification Center Slide-out Panel */}
      <NotificationCenter
        isOpen={notif.isOpen}
        onClose={() => notif.setIsOpen(false)}
        notifications={notif.notifications}
        onMarkRead={notif.markAsRead}
        onMarkAllRead={notif.markAllAsRead}
        onClearAll={notif.clearAll}
        unreadCount={notif.unreadCount}
        criticalCount={notif.criticalCount}
        settings={notif.settings}
        onSettingsChange={notif.setSettings}
        onRequestPermission={notif.requestPermission}
      />
    </div>
  );
}
