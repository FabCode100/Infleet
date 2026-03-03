import { useFleet } from '../hooks/useFleet';
import { Sidebar } from '../components/Sidebar';

export function Alerts({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { alerts: data, downloadReport } = useFleet();

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Sidebar activeView="alerts" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-background-dark">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 shrink-0">
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

        {/* Dashboard Content */}
        <div className="flex-1 flex gap-6 p-6 overflow-hidden">
          {/* Critical Event Queue */}
          <section className="w-[400px] flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-bold text-slate-700 dark:text-slate-300">Eventos em Aberto</h3>
              <div className="flex gap-2">
                <span className="text-xs font-medium px-2 py-1 rounded bg-slate-200 dark:bg-slate-800">Prioridade</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3">
              {data.map((alert, index) => (
                <div key={alert.id} className={`p-4 rounded-xl border-l-4 border-${alert.color} bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 hover:ring-primary transition-all cursor-pointer ${index === 1 ? 'ring-2 ring-primary' : ''} ${alert.priority === 'low' ? 'opacity-80' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest text-${alert.color}`}>{alert.type}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{alert.time}</span>
                  </div>
                  <h4 className="font-bold text-sm mb-1">{alert.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">local_shipping</span> {alert.vehicle}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">person</span> {alert.driver}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed View / Timeline */}
          <section className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            {/* Event Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="size-14 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                    <span className="material-symbols-outlined scale-125">speed</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Frenagem Brusca Detectada</h2>
                    <p className="text-slate-500 flex items-center gap-2 mt-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Veículo FLT-8890</span>
                      • Ocorrido às 12:45:12 em São Paulo, SP
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                    <span className="material-symbols-outlined text-lg">call</span> Ligar para Motorista
                  </button>
                  <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                    Ignorar
                  </button>
                  <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                    <span className="material-symbols-outlined text-lg leading-none">more_vert</span>
                  </button>
                </div>
              </div>

              {/* Map Preview */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 border border-slate-200 dark:border-slate-800">
                <img className="w-full h-full object-cover grayscale opacity-50" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpSPGxZNovpbVmBB6SFKMSuhu2teJxfuyn8kV6K8BzOw1U1U8KNCQbLO6OvNRI7KUG1BpZ1s9ndub4Ijc3KRWK4epLBYX3UTOR45Anedzp44IxuswS0HchOujcOIyvdeED3Z7SOPl-AhrU3w8dVdoTSmlIRqhrEkiiNZS4ZBw6DYynVUtY7_GcqiARSjdcBas_grDz8_YLJZM8hTOXEHHnCTugobbC9wadhKO3ejW5u0sqB5D8uMXBH9XLzxGo10DkWhyi93cTNGG8" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-safety-red rounded-full animate-ping opacity-50"></div>
                    <div className="size-4 bg-safety-red rounded-full border-2 border-white relative z-10 shadow-xl"></div>
                  </div>
                </div>
              </div>

              {/* Telemetry Chart Placeholder */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Linha do Tempo (Telemetria)</h3>
                <div className="h-64 bg-slate-50 dark:bg-background-dark/50 rounded-xl relative p-6 border border-slate-100 dark:border-slate-800 overflow-hidden">
                  <div className="absolute inset-x-6 top-6 bottom-12 border-b border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                    <div className="w-full border-t border-slate-200/50 dark:border-slate-800/50"></div>
                    <div className="w-full border-t border-slate-200/50 dark:border-slate-800/50"></div>
                    <div className="w-full border-t border-slate-200/50 dark:border-slate-800/50"></div>
                    <div className="w-full border-t border-slate-200/50 dark:border-slate-800/50"></div>
                  </div>
                  <svg className="absolute inset-x-6 top-6 bottom-12 w-[calc(100%-48px)] h-[calc(100%-72px)] overflow-visible">
                    <path d="M0 160 L50 155 L100 158 L150 150 L200 145 L250 140 L300 40 L310 35 L320 180 L350 190 L400 195 L500 195" fill="none" stroke="#197fe6" strokeLinejoin="round" strokeWidth="3"></path>
                    <circle cx="310" cy="35" fill="#ef4444" r="5" stroke="white" strokeWidth="2"></circle>
                  </svg>
                  <div className="absolute bottom-4 inset-x-6 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    <span>-1 min</span>
                    <span>-30s</span>
                    <span className="text-safety-red">Evento (12:45:12)</span>
                    <span>+30s</span>
                    <span>+1 min</span>
                  </div>
                  <div className="absolute left-1 top-6 bottom-12 flex flex-col justify-between text-[10px] font-bold text-slate-400 pr-2">
                    <span>120 km/h</span>
                    <span>80 km/h</span>
                    <span>40 km/h</span>
                    <span>0 km/h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="flex justify-between items-center bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex gap-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Velocidade Pico</p>
                  <p className="text-lg font-bold">110 km/h</p>
                </div>
                <div className="h-10 w-px bg-slate-200 dark:border-slate-800"></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">G-Force Máx</p>
                  <p className="text-lg font-bold">4.2 G</p>
                </div>
                <div className="h-10 w-px bg-slate-200 dark:border-slate-800"></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Duração Frenagem</p>
                  <p className="text-lg font-bold">1.8s</p>
                </div>
              </div>
              <button onClick={() => downloadReport('incidents')} className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold text-sm hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">description</span> Gerar Relatório de Incidente
              </button>
            </div>
          </section>

          {/* Sidebar Details (Driver/Vehicle) */}
          <aside className="w-72 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
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
        </div>
      </main>
    </div>
  );
}
