import { useState } from 'react';
import { useFleet } from '../hooks/useFleet';
import { Sidebar } from '../components/Sidebar';
import { MobileBottomNav, MobileHeader } from '../components/MobileNav';

export function Monitoring({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { monitoring: data } = useFleet();
  const [showFleetPanel, setShowFleetPanel] = useState(false);
  const [showEvents, setShowEvents] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <Sidebar activeView="monitoring" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <MobileHeader title="Monitoramento" onNavigate={onNavigate}>
          <button
            onClick={() => setShowFleetPanel(!showFleetPanel)}
            className="p-2 rounded-lg text-slate-400 hover:text-white"
          >
            <span className="material-symbols-outlined">list</span>
          </button>
        </MobileHeader>

        {/* Desktop Top Navigation Bar */}
        <header className="hidden md:flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark px-6 py-3 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold leading-tight tracking-tight">Painel de Monitoramento</h2>
          </div>
          <div className="flex flex-1 justify-end gap-4">
            <label className="flex items-center min-w-40 max-w-xs relative">
              <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
              <input className="w-full h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border-none pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Buscar veículos, motoristas..." />
            </label>
            <div className="flex gap-2">
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/20 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/20 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              JD
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden relative">
          {/* Mobile Fleet Panel Overlay */}
          {showFleetPanel && (
            <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setShowFleetPanel(false)}>
              <div
                className="absolute top-0 left-0 w-80 h-full bg-background-dark border-r border-border-subtle animate-slide-in-right overflow-hidden flex flex-col"
                style={{ animationDirection: 'normal', transform: 'none' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Frota Ativa</h3>
                    <div className="flex items-center gap-2">
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">{data.activeFleet} Online</span>
                      <button onClick={() => setShowFleetPanel(false)} className="p-1 rounded-lg hover:bg-white/5">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 text-xs font-semibold py-2 rounded-lg bg-primary text-white">Todos</button>
                    <button className="flex-1 text-xs font-semibold py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Em Movimento</button>
                    <button className="flex-1 text-xs font-semibold py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Ocioso</button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {data.vehicles.map(v => (
                    <div key={v.id} className={`p-3 rounded-xl border ${v.status === 'Ocioso' ? 'border-primary/40 bg-primary/5' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50'} transition-all cursor-pointer`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-[10px] text-slate-500 font-medium">{v.type}</p>
                          <h4 className="font-bold text-sm">{v.id}</h4>
                        </div>
                        <div className={`flex items-center gap-1 text-${v.color}-500`}>
                          <span className="material-symbols-outlined text-[10px] active-dot">circle</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider">{v.status}</span>
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className={`flex items-center gap-1 text-${v.status === 'Ocioso' ? 'slate-400' : 'primary'}`}>
                          <span className="material-symbols-outlined text-sm">speed</span>
                          <span className="text-sm font-bold">{v.speed} km/h</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar - Vehicle List */}
          <aside className="hidden md:flex w-80 lg:w-96 flex-col border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-background-dark z-10 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Frota Ativa</h3>
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">{data.activeFleet} Online</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 text-xs font-semibold py-2 rounded-lg bg-primary text-white">Todos</button>
                <button className="flex-1 text-xs font-semibold py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">Em Movimento</button>
                <button className="flex-1 text-xs font-semibold py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">Ocioso</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {data.vehicles.map(v => (
                <div key={v.id} className={`p-4 rounded-xl border ${v.status === 'Ocioso' ? 'border-primary/40 bg-primary/5 dark:bg-primary/5' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-primary'} transition-all cursor-pointer group`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{v.type}</p>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">{v.id}</h4>
                    </div>
                    <div className={`flex items-center gap-1 text-${v.color}-500`}>
                      <span className="material-symbols-outlined text-[10px] active-dot">circle</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{v.status}</span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className={`flex items-center gap-2 text-${v.status === 'Ocioso' ? 'slate-400' : 'primary'}`}>
                      <span className="material-symbols-outlined text-sm">speed</span>
                      <span className="text-sm font-bold">{v.speed} km/h</span>
                    </div>
                    <button className="text-xs font-bold text-slate-400 group-hover:text-primary flex items-center gap-1">
                      {v.status === 'Ocioso' ? 'Rastreamento' : 'Detalhes'}
                      <span className="material-symbols-outlined text-sm">{v.status === 'Ocioso' ? 'location_on' : 'chevron_right'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="flex-1 flex flex-col relative overflow-hidden">
            {/* Map View Area */}
            <div className="flex-1 relative bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0c2IAunPH-50bMfK3I0K14jRzkHpJoIyjHwGMPF2QV7BoA7YBPlFTqtG3bHlC6u36hrKIs9oLddUfGOY_D31talTybU7o2STiSzV49Wjq6kQo8Bg1cvZEzZCHsGZ4c7elxtA5GHlLeLFNzYqPLNQvAEDWUnvqVW69q0yuWi5y1hW_SG-6vgjz9CKlLdiZ_SULCEoOQeAlDdoHAHt0iWg90drob9xwAxSMM3TTOo4dQzbOaLGpK3Bhp4tHF-qp4mJnfD0ScIlAOAFp')" }}></div>

              {/* Map Overlays */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-col gap-1.5 md:gap-2">
                <div className="bg-white/90 dark:bg-background-dark/90 backdrop-blur shadow-lg rounded-lg p-1.5 md:p-2 flex flex-col gap-0.5 md:gap-1">
                  <button className="p-1.5 md:p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-700 dark:text-slate-300"><span className="material-symbols-outlined text-lg md:text-2xl">add</span></button>
                  <div className="h-px bg-slate-300 dark:bg-slate-700 mx-1"></div>
                  <button className="p-1.5 md:p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-700 dark:text-slate-300"><span className="material-symbols-outlined text-lg md:text-2xl">remove</span></button>
                </div>
                <button className="bg-white/90 dark:bg-background-dark/90 backdrop-blur shadow-lg rounded-lg p-2 md:p-3 text-slate-700 dark:text-slate-300 hover:text-primary"><span className="material-symbols-outlined text-lg md:text-2xl">my_location</span></button>
              </div>

              <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur shadow-lg rounded-lg px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-3 md:gap-4">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></span><span className="text-[10px] md:text-xs font-bold text-slate-700 dark:text-slate-300">18 Normal</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500"></span><span className="text-[10px] md:text-xs font-bold text-slate-700 dark:text-slate-300">4 Avisos</span></div>
                <div className="hidden sm:flex items-center gap-1.5"><span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></span><span className="text-[10px] md:text-xs font-bold text-slate-700 dark:text-slate-300">2 Crítico</span></div>
              </div>

              {/* Map Pins */}
              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative group cursor-pointer">
                  <div className="bg-primary p-1 md:p-1.5 rounded-full border-2 border-white shadow-xl">
                    <span className="material-symbols-outlined text-white text-sm md:text-base">local_shipping</span>
                  </div>
                </div>
              </div>

              {/* Mobile FAB: Show Events */}
              <button
                onClick={() => setShowEvents(!showEvents)}
                className="md:hidden absolute bottom-20 right-4 size-12 bg-primary rounded-full shadow-xl shadow-primary/30 flex items-center justify-center text-white z-20"
              >
                <span className="material-symbols-outlined">history</span>
              </button>
            </div>

            {/* Event Feed Area - slideable on mobile */}
            <div className={`${showEvents ? 'h-64' : 'h-0 md:h-48'} transition-all duration-300 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col overflow-hidden`}>
              <div className="px-4 md:px-6 py-2 md:py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg md:text-xl">history</span>
                  <h4 className="font-bold text-xs md:text-sm tracking-wide">EVENTOS EM TEMPO REAL</h4>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs font-bold text-primary hover:underline">Limpar Logs</button>
                  <button onClick={() => setShowEvents(false)} className="md:hidden p-1 rounded hover:bg-white/5">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                {data.events.map(event => (
                  <div key={event.id} className={`flex items-center gap-3 md:gap-4 px-3 md:px-4 py-2 rounded-lg bg-${event.color === 'slate' ? 'slate-50 dark:bg-slate-800/50' : event.color + '-500/10'} border-l-4 border-${event.color}-500`}>
                    <span className={`material-symbols-outlined text-${event.color}-500 text-base md:text-lg`}>{event.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm font-medium truncate">{event.message}</p>
                    </div>
                    <span className="text-[10px] md:text-xs text-slate-500 font-medium whitespace-nowrap">{event.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <MobileBottomNav activeView="monitoring" onNavigate={onNavigate} />
    </div>
  );
}
