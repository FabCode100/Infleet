import { useFleet } from '../hooks/useFleet';
import { Sidebar } from '../components/Sidebar';

export function Monitoring({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { monitoring: data } = useFleet();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <Sidebar activeView="monitoring" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark px-6 py-3 z-10">
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

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Vehicle List */}
          <aside className="w-80 lg:w-96 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-background-dark z-10 overflow-hidden">
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
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="bg-white/90 dark:bg-background-dark/90 backdrop-blur shadow-lg rounded-lg p-2 flex flex-col gap-1">
                  <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-700 dark:text-slate-300"><span className="material-symbols-outlined">add</span></button>
                  <div className="h-px bg-slate-300 dark:bg-slate-700 mx-1"></div>
                  <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-700 dark:text-slate-300"><span className="material-symbols-outlined">remove</span></button>
                </div>
                <button className="bg-white/90 dark:bg-background-dark/90 backdrop-blur shadow-lg rounded-lg p-3 text-slate-700 dark:text-slate-300 hover:text-primary"><span className="material-symbols-outlined">my_location</span></button>
              </div>

              <div className="absolute top-4 right-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur shadow-lg rounded-lg px-4 py-2 flex items-center gap-4">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span><span className="text-xs font-bold text-slate-700 dark:text-slate-300">18 Normal</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span><span className="text-xs font-bold text-slate-700 dark:text-slate-300">4 Avisos</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span><span className="text-xs font-bold text-slate-700 dark:text-slate-300">2 Crítico</span></div>
              </div>

              {/* Map Pins */}
              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative group cursor-pointer">
                  <div className="bg-primary p-1.5 rounded-full border-2 border-white shadow-xl">
                    <span className="material-symbols-outlined text-white text-base">local_shipping</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Feed Area */}
            <div className="h-48 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col overflow-hidden">
              <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">history</span>
                  <h4 className="font-bold text-sm tracking-wide">EVENTOS EM TEMPO REAL</h4>
                </div>
                <button className="text-xs font-bold text-primary hover:underline">Limpar Logs</button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                {data.events.map(event => (
                  <div key={event.id} className={`flex items-center gap-4 px-4 py-2 rounded-lg bg-${event.color === 'slate' ? 'slate-50 dark:bg-slate-800/50' : event.color + '-500/10'} border-l-4 border-${event.color}-500`}>
                    <span className={`material-symbols-outlined text-${event.color}-500 text-lg`}>{event.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.message}</p>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{event.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
