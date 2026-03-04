import { useState } from 'react';
import { useFleet } from '../hooks/useFleet';
import { Sidebar } from '../components/Sidebar';
import { MobileBottomNav, MobileHeader } from '../components/MobileNav';

export function Alerts({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { alerts: data, downloadReport } = useFleet();
  const [selectedAlert, setSelectedAlert] = useState<number | null>(1); // second alert selected by default

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Sidebar activeView="alerts" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-background-dark">
        {/* Mobile Header */}
        <MobileHeader title="Central de Alertas" onNavigate={onNavigate}>
          <span className="px-2 py-0.5 rounded bg-safety-red/20 text-safety-red text-[10px] font-bold uppercase animate-pulse">4 Críticos</span>
        </MobileHeader>

        {/* Desktop Top Navbar */}
        <header className="hidden md:flex h-16 items-center justify-between px-8 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold">Central de Alertas e Incidentes</h2>
            <span className="px-2 py-0.5 rounded bg-safety-red/20 text-safety-red text-xs font-bold uppercase tracking-wider animate-pulse">4 Críticos</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
              <input className="pl-10 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64" placeholder="Filtrar placa ou motorista..." type="text" />
            </div>
            <button className="flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </header>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 py-2 bg-background-dark border-b border-border-subtle">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border-subtle rounded-xl text-sm focus:ring-2 focus:ring-primary" placeholder="Filtrar placa ou motorista..." type="text" />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 overflow-hidden pb-mobile-nav md:pb-6">
          {/* Critical Event Queue - full width on mobile */}
          <section className="md:w-[400px] flex flex-col gap-3 md:gap-4 md:shrink-0">
            <div className="flex items-center justify-between px-1 md:px-2">
              <h3 className="font-bold text-sm md:text-base text-slate-700 dark:text-slate-300">Eventos em Aberto</h3>
              <div className="flex gap-2">
                <span className="text-[10px] md:text-xs font-medium px-2 py-1 rounded bg-slate-200 dark:bg-slate-800">Prioridade</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2 md:gap-3 max-h-[200px] md:max-h-none">
              {data.map((alert, index) => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(index)}
                  className={`p-3 md:p-4 rounded-xl border-l-4 border-${alert.color} bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 hover:ring-primary transition-all cursor-pointer active:scale-[0.98] ${selectedAlert === index ? 'ring-2 ring-primary' : ''} ${alert.priority === 'low' ? 'opacity-80' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1.5 md:mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest text-${alert.color}`}>{alert.type}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{alert.time}</span>
                  </div>
                  <h4 className="font-bold text-xs md:text-sm mb-1">{alert.title}</h4>
                  <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs text-slate-500">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs md:text-sm">local_shipping</span> {alert.vehicle}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs md:text-sm">person</span> {alert.driver}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed View / Timeline */}
          <section className="flex-1 flex flex-col gap-4 md:gap-6 overflow-y-auto custom-scrollbar">
            {/* Event Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4 md:mb-6">
                <div className="flex gap-3 md:gap-4">
                  <div className="size-10 md:size-14 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 shrink-0">
                    <span className="material-symbols-outlined md:scale-125">speed</span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg md:text-2xl font-extrabold tracking-tight">Frenagem Brusca Detectada</h2>
                    <p className="text-slate-500 flex flex-wrap items-center gap-1 md:gap-2 mt-1 text-xs md:text-base">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Veículo FLT-8890</span>
                      <span className="hidden sm:inline">•</span>
                      <span>Ocorrido às 12:45:12 em São Paulo, SP</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button className="flex-1 md:flex-initial px-3 md:px-4 py-2 bg-primary text-white rounded-lg font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 md:gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all touch-target">
                    <span className="material-symbols-outlined text-base md:text-lg">call</span> <span className="hidden sm:inline">Ligar para</span> Motorista
                  </button>
                  <button className="px-3 md:px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold text-xs md:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all touch-target">
                    Ignorar
                  </button>
                  <button className="px-2 md:px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all touch-target">
                    <span className="material-symbols-outlined text-base md:text-lg leading-none">more_vert</span>
                  </button>
                </div>
              </div>

              {/* Map Preview */}
              <div className="relative w-full h-36 md:h-48 rounded-xl overflow-hidden mb-4 md:mb-6 border border-slate-200 dark:border-slate-800">
                <img className="w-full h-full object-cover grayscale opacity-50" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpSPGxZNovpbVmBB6SFKMSuhu2teJxfuyn8kV6K8BzOw1U1U8KNCQbLO6OvNRI7KUG1BpZ1s9ndub4Ijc3KRWK4epLBYX3UTOR45Anedzp44IxuswS0HchOujcOIyvdeED3Z7SOPl-AhrU3w8dVdoTSmlIRqhrEkiiNZS4ZBw6DYynVUtY7_GcqiARSjdcBas_grDz8_YLJZM8hTOXEHHnCTugobbC9wadhKO3ejW5u0sqB5D8uMXBH9XLzxGo10DkWhyi93cTNGG8" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-safety-red rounded-full animate-ping opacity-50"></div>
                    <div className="size-4 bg-safety-red rounded-full border-2 border-white relative z-10 shadow-xl"></div>
                  </div>
                </div>
              </div>

              {/* Telemetry Chart */}
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-slate-500">Linha do Tempo (Telemetria)</h3>
                <div className="h-48 md:h-64 bg-slate-50 dark:bg-background-dark/50 rounded-xl relative p-4 md:p-6 border border-slate-100 dark:border-slate-800 overflow-hidden">
                  <div className="absolute inset-x-4 md:inset-x-6 top-4 md:top-6 bottom-10 md:bottom-12 border-b border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                    <div className="w-full border-t border-slate-200/50 dark:border-slate-800/50"></div>
                    <div className="w-full border-t border-slate-200/50 dark:border-slate-800/50"></div>
                    <div className="w-full border-t border-slate-200/50 dark:border-slate-800/50"></div>
                    <div className="w-full border-t border-slate-200/50 dark:border-slate-800/50"></div>
                  </div>
                  <svg className="absolute inset-x-4 md:inset-x-6 top-4 md:top-6 bottom-10 md:bottom-12 w-[calc(100%-32px)] md:w-[calc(100%-48px)] h-[calc(100%-56px)] md:h-[calc(100%-72px)] overflow-visible">
                    <path d="M0 160 L50 155 L100 158 L150 150 L200 145 L250 140 L300 40 L310 35 L320 180 L350 190 L400 195 L500 195" fill="none" stroke="#197fe6" strokeLinejoin="round" strokeWidth="2"></path>
                    <circle cx="310" cy="35" fill="#ef4444" r="4" stroke="white" strokeWidth="2"></circle>
                  </svg>
                  <div className="absolute bottom-2 md:bottom-4 inset-x-4 md:inset-x-6 flex justify-between text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    <span>-1 min</span>
                    <span>-30s</span>
                    <span className="text-safety-red">Evento</span>
                    <span>+30s</span>
                    <span>+1 min</span>
                  </div>
                  <div className="absolute left-0.5 md:left-1 top-4 md:top-6 bottom-10 md:bottom-12 flex flex-col justify-between text-[8px] md:text-[10px] font-bold text-slate-400 pr-1 md:pr-2">
                    <span>120</span>
                    <span>80</span>
                    <span>40</span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar w-full sm:w-auto">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Velocidade Pico</p>
                  <p className="text-base md:text-lg font-bold">110 km/h</p>
                </div>
                <div className="h-8 md:h-10 w-px bg-slate-200 dark:border-slate-800 shrink-0"></div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">G-Force Máx</p>
                  <p className="text-base md:text-lg font-bold">4.2 G</p>
                </div>
                <div className="h-8 md:h-10 w-px bg-slate-200 dark:border-slate-800 shrink-0"></div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Duração</p>
                  <p className="text-base md:text-lg font-bold">1.8s</p>
                </div>
              </div>
              <button onClick={() => downloadReport('incidents')} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold text-xs md:text-sm hover:bg-primary hover:text-white transition-all touch-target whitespace-nowrap">
                <span className="material-symbols-outlined text-lg">description</span> Gerar Relatório
              </button>
            </div>
          </section>

          {/* Sidebar Details (Driver/Vehicle) - hidden on mobile, shown inline */}
          <aside className="hidden lg:flex w-72 flex-col gap-4 md:gap-6 shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 md:p-5 shadow-sm border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Motorista</h4>
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-full overflow-hidden">
                  <img alt="João" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4ixnx-wwfXOYOz_OZ-JElUUW6obfVn2Hc4Fgyd0Os8UA6JLP81e_ID7HZyGTc4t1gZlCZOeXhg67mk35oQkUtoFZE2TxVovoKrqc4c65MCR5nRmD4piU9LBerl1sGbfr-8cLNFPYnmWBUD-ETxbXw1fSps1rmCpeST-CE9ZEukYYyqFB7gfse0P6gK2HfWKFEHERar5TCg6KCPBHtH1V6RVOK4R5x7PMMCKQy-xA-2sv2DfPlHncyDDsdNl12_mdwOYTps4l8JrWb" />
                </div>
                <div>
                  <p className="font-bold">João Silva</p>
                  <p className="text-xs text-slate-500 italic">Score: 68/100</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">CNH</span>
                  <span className="font-medium">123456789-0</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Tempo de Rota</span>
                  <span className="font-medium">06h 45m</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[80%]"></div>
                </div>
                <p className="text-[10px] text-slate-400 text-center uppercase font-bold">Próximo ao limite de jornada</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Histórico Recente (Veículo)</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-px bg-slate-200 dark:bg-slate-800 relative">
                    <div className="absolute -left-1 top-0 size-2 rounded-full bg-slate-400"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-xs font-bold">Ignição Ligada</p>
                    <p className="text-[10px] text-slate-500">12:10 - Garagem SP</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-px bg-slate-200 dark:bg-slate-800 relative">
                    <div className="absolute -left-1 top-0 size-2 rounded-full bg-slate-400"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-xs font-bold">Ponto de Referência</p>
                    <p className="text-[10px] text-slate-500">12:35 - Rodoanel Sul</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-px bg-safety-red relative">
                    <div className="absolute -left-1 top-0 size-2 rounded-full bg-safety-red animate-ping"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-safety-red">Incidente Detectado</p>
                    <p className="text-[10px] text-slate-500">12:45 - Frenagem Brusca</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Driver & History - shown as horizontal cards */}
          <div className="lg:hidden flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 min-w-[260px] shrink-0">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Motorista</h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full overflow-hidden shrink-0">
                  <img alt="João" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4ixnx-wwfXOYOz_OZ-JElUUW6obfVn2Hc4Fgyd0Os8UA6JLP81e_ID7HZyGTc4t1gZlCZOeXhg67mk35oQkUtoFZE2TxVovoKrqc4c65MCR5nRmD4piU9LBerl1sGbfr-8cLNFPYnmWBUD-ETxbXw1fSps1rmCpeST-CE9ZEukYYyqFB7gfse0P6gK2HfWKFEHERar5TCg6KCPBHtH1V6RVOK4R5x7PMMCKQy-xA-2sv2DfPlHncyDDsdNl12_mdwOYTps4l8JrWb" />
                </div>
                <div>
                  <p className="font-bold text-sm">João Silva</p>
                  <p className="text-[10px] text-slate-500">Score: 68/100</p>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[80%]"></div>
              </div>
              <p className="text-[9px] text-slate-400 text-center uppercase font-bold mt-1">Próximo ao limite de jornada</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 min-w-[220px] shrink-0">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Histórico</h4>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="w-0.5 bg-slate-300 dark:bg-slate-700 relative">
                    <div className="absolute -left-[3px] top-0 size-2 rounded-full bg-slate-400"></div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold">Ignição Ligada</p>
                    <p className="text-[9px] text-slate-500">12:10</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-0.5 bg-safety-red relative">
                    <div className="absolute -left-[3px] top-0 size-2 rounded-full bg-safety-red"></div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-safety-red">Incidente</p>
                    <p className="text-[9px] text-slate-500">12:45</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileBottomNav activeView="alerts" onNavigate={onNavigate} />
    </div>
  );
}
