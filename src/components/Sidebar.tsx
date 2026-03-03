import React from 'react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', icon: 'grid_view', label: 'Dashboard' },
    { id: 'monitoring', icon: 'map', label: 'Mapa em Tempo Real' },
    { id: 'vehicle-details', icon: 'local_shipping', label: 'Veículos' },
    { id: 'alerts', icon: 'report_problem', label: 'Alertas' },
    { id: 'sustainability', icon: 'eco', label: 'Sustentabilidade' },
  ];

  return (
    <aside className="w-64 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark shrink-0 hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
          <span className="material-symbols-outlined">local_shipping</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight">Infleet</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}>
                {item.icon}
              </span>
              <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 mt-auto border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <img
              alt="Avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRf27XlR3SwKSvsojC8ku40bSRsOz4so7o3wZge1EPNIB8AnD7tfqQheGSG9ZURA6wFIgOICWJepAxlEnzG9Y04mC4SlRNhoMEMlhn40wP1ikh2vRd2_oXz0kO1uk8PQCuFaaOa3tosBqCRmmEuiqhMmUPW-VNTfXvDa1HK2p3iUdIQBxQyjXLoEBnAl5BfDY_9KNYq0Ex4Ox22-J0HL4jYG_XV3Ni7u_tBd29o0o2sDQkX9OWxs2peYq3bPZT7ej2vZAXRyiZpr7h"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold">Ricardo S.</span>
            <span className="text-xs text-slate-500">Fleet Manager</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
