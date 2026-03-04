import { useFleet } from '../hooks/useFleet';
import { useCopilot } from '../hooks/useCopilot';
import { Sidebar } from '../components/Sidebar';
import { MobileBottomNav, MobileHeader } from '../components/MobileNav';

export function Dashboard({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { data } = useFleet();
  const { insight, isLoading } = useCopilot(data.vehicles, data.alerts);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <Sidebar activeView="dashboard" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <MobileHeader title="Dashboard Infleet" onNavigate={onNavigate}>
          <div className="relative">
            <span className="material-symbols-outlined p-2 text-slate-400">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
          </div>
        </MobileHeader>

        {/* Desktop Header */}
        <header className="hidden md:flex h-16 items-center justify-between px-8 border-b border-border-subtle bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">Dashboard Infleet</h2>
            <div className="h-6 w-px bg-border-subtle mx-2"></div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-xs">calendar_today</span>
              <span>Oct 24, 2023</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined p-2 text-slate-400 hover:text-white cursor-pointer">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
            </div>
            <button className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-surface rounded-full border border-border-subtle">
              <img className="size-7 rounded-full object-cover" alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwxNDr1sZ-SAp1awb7ktoAiQjcLTDug9LFcne0E6btH6MxSdcL-GS1jZ-4zqL9CXQkZFvLeatxreQK-SMDy_iKY3fZl5g5tdwKIF1vVaNDnxDlZJLUWA3XOTcXX5_oOJGtCFuVBEWXLcFbhoAuoageJgeFPy2YOkhVw3d2E2JK_OY0Ic1o3dLH7qi8J67RYrSgQoZEUuOtLnBJyrNIL50c9kCqKFuuNLjHagVqE9cY7D8Oudg6icqaqZS8wNNA8oNUJzBJ99A09PdX" />
              <span className="text-sm font-medium">Alex Rivera</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 custom-scrollbar pb-mobile-nav md:pb-6">
          {/* Metrics Grid - horizontal scroll on mobile */}
          <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-6 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory">
            <div className="p-4 md:p-5 rounded-xl border border-border-subtle bg-surface min-w-[260px] md:min-w-0 snap-center">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 text-xs md:text-sm font-medium">Total de Veículos Online</span>
                <span className="material-symbols-outlined text-primary text-lg md:text-2xl">sensors</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-bold">{data.totalVehicles}</span>
                <span className="text-emerald-500 text-xs md:text-sm font-medium flex items-center"><span className="material-symbols-outlined text-xs md:text-sm">arrow_upward</span>5%</span>
              </div>
            </div>
            <div className="p-4 md:p-5 rounded-xl border border-border-subtle bg-surface min-w-[260px] md:min-w-0 snap-center">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 text-xs md:text-sm font-medium">Alertas Ativos Hoje</span>
                <span className="material-symbols-outlined text-orange-400 text-lg md:text-2xl">notification_important</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-bold">{data.activeAlerts}</span>
                <span className="text-orange-500 text-xs md:text-sm font-medium flex items-center"><span className="material-symbols-outlined text-xs md:text-sm">arrow_downward</span>2%</span>
              </div>
            </div>
            <div className="p-4 md:p-5 rounded-xl border border-border-subtle bg-surface min-w-[260px] md:min-w-0 snap-center">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 text-xs md:text-sm font-medium">Economia de emissão de CO2</span>
                <span className="material-symbols-outlined text-emerald-400 text-lg md:text-2xl">eco</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-bold">{data.co2Saved}t</span>
                <span className="text-emerald-500 text-xs md:text-sm font-medium flex items-center"><span className="material-symbols-outlined text-xs md:text-sm">arrow_upward</span>10%</span>
              </div>
            </div>
          </div>

          {/* Central Area: Map & Side Panels - stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:h-[500px]">
            {/* Large Map Area */}
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-border-subtle bg-slate-800 h-[250px] md:h-[350px] lg:h-full" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDcjKhgML3NM0z9_OC0GLYC8ag2dsBke_Gdi0_4was33bk9Nm0oVkHEeFm8TBsv_Dec96LPowKm0UwDA83dTaSNpTlYmvBVDxdoPsSfNNgS0ww-yVcvFMw-iutm5tP_GFaHr_6FV4BfiH_gkZdLLsEuBk4Rq-W3A763gKcZRW4XshYKPCaGL5bLsZ1lg60upG5mCXReVFCP3FaEyDTTHJs9fEEi5LsJS1mgF3fN1T4SEYqUL-OPr6VgowHfOuLc_-3Xh4Squ7Sxo8yQ')", backgroundSize: 'cover' }}>
              <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
              {/* Vehicle Pins */}
              <div className="absolute top-1/4 left-1/3 size-3 md:size-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg shadow-emerald-500/50"></div>
              <div className="absolute top-1/2 left-1/2 size-3 md:size-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg shadow-emerald-500/50"></div>
              <div className="absolute top-1/3 left-2/3 size-3 md:size-4 bg-red-500 rounded-full border-2 border-white shadow-lg shadow-red-500/50"></div>
              <div className="absolute bottom-1/4 right-1/4 size-3 md:size-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg shadow-emerald-500/50"></div>

              <div className="absolute top-3 right-3 md:top-4 md:right-4 flex flex-col gap-1.5 md:gap-2">
                <button className="size-8 md:size-10 bg-surface rounded-lg border border-border-subtle flex items-center justify-center hover:bg-slate-700"><span className="material-symbols-outlined text-lg md:text-2xl">add</span></button>
                <button className="size-8 md:size-10 bg-surface rounded-lg border border-border-subtle flex items-center justify-center hover:bg-slate-700"><span className="material-symbols-outlined text-lg md:text-2xl">remove</span></button>
                <button className="size-8 md:size-10 bg-surface rounded-lg border border-border-subtle flex items-center justify-center hover:bg-slate-700"><span className="material-symbols-outlined text-lg md:text-2xl">my_location</span></button>
              </div>

              <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 p-2 md:p-3 bg-surface/90 backdrop-blur rounded-lg border border-border-subtle flex gap-3 md:gap-4">
                <div className="flex items-center gap-1.5 text-[10px] md:text-xs"><span className="size-2 rounded-full bg-emerald-500"></span><span>Em Movimento (138)</span></div>
                <div className="flex items-center gap-1.5 text-[10px] md:text-xs"><span className="size-2 rounded-full bg-red-500"></span><span>Alerta (3)</span></div>
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] md:text-xs"><span className="size-2 rounded-full bg-slate-400"></span><span>Estacionado (1)</span></div>
              </div>
            </div>

            {/* Right Sidebar: Alerts & AI - stacked on mobile */}
            <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6 lg:overflow-y-auto custom-scrollbar">
              {/* Copilot Insights - show first on mobile */}
              <div className="p-4 md:p-5 rounded-xl border border-primary/30 bg-primary/5 order-first lg:order-last">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary filled">smart_toy</span>
                  <h3 className="font-bold text-sm md:text-base">Copilot Insights</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    {isLoading ? "Gerando insight..." : `"${insight}"`}
                  </p>
                  <button className="w-full mt-2 py-2.5 md:py-2 bg-primary rounded-lg text-xs font-bold text-white hover:bg-primary/90 transition-colors touch-target flex items-center justify-center">
                    Schedule Maintenance
                  </button>
                </div>
              </div>

              <div className="p-4 md:p-5 rounded-xl border border-border-subtle bg-surface flex-1">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="font-bold text-sm md:text-base flex items-center gap-2">Alertas Recentes</h3>
                  <button className="text-xs text-primary font-medium hover:underline">Ver Todos</button>
                </div>
                <div className="space-y-2 md:space-y-3">
                  {data.alerts.map(alert => (
                    <div key={alert.id} className={`p-2.5 md:p-3 bg-${alert.color}-500/10 border border-${alert.color}-500/20 rounded-lg flex gap-2.5 md:gap-3`}>
                      <span className={`material-symbols-outlined text-${alert.color}-500 text-lg md:text-xl`}>{alert.icon}</span>
                      <div className="min-w-0">
                        <p className="text-xs md:text-sm font-semibold truncate">{alert.vehicle}: {alert.type}</p>
                        <p className="text-[10px] md:text-xs text-slate-400 truncate">{alert.desc}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 md:mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Table - Card layout on mobile */}
          <div className="rounded-xl border border-border-subtle bg-surface overflow-hidden">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-border-subtle flex items-center justify-between bg-white/5">
              <h3 className="font-bold text-sm md:text-base">Lista da Frota de Veículos</h3>
              <div className="flex gap-2">
                <div className="relative hidden sm:block">
                  <input className="bg-background-dark border-border-subtle rounded-lg text-xs pl-8 pr-4 py-1.5 focus:ring-primary focus:border-primary w-48 md:w-64" placeholder="Filtrar veículos..." type="text" />
                  <span className="material-symbols-outlined absolute left-2 top-1.5 text-slate-500 text-sm">search</span>
                </div>
                <button className="sm:hidden p-1.5 border border-border-subtle rounded-lg">
                  <span className="material-symbols-outlined text-sm">search</span>
                </button>
                <button className="px-2 md:px-3 py-1.5 border border-border-subtle rounded-lg text-xs font-medium hover:bg-white/5 flex items-center gap-1"><span className="material-symbols-outlined text-xs">filter_list</span><span className="hidden sm:inline"> Filtrar</span></button>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden p-3 space-y-3">
              {data.vehicles.map(v => (
                <div key={v.id} className="p-3 rounded-xl border border-border-subtle bg-background-dark/50 active:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{v.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-${v.statusColor}-500/20 text-${v.statusColor}-500`}>{v.status}</span>
                    </div>
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">chevron_right</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">person</span>
                      <span>{v.driver}</span>
                    </div>
                    <span>{v.lastSync}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-subtle">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-primary">speed</span>
                        <span className={`text-xs font-bold ${v.statusColor === 'red' ? 'text-red-400' : ''}`}>{v.speed} km/h</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className={`bg-${v.fuel < 20 ? 'red' : 'emerald'}-500 h-full`} style={{ width: `${v.fuel}%` }}></div>
                      </div>
                      <span className={`text-xs font-medium ${v.fuel < 20 ? 'text-red-500' : 'text-slate-400'}`}>{v.fuel}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider bg-white/5">
                    <th className="px-6 py-4">ID do Veículo</th>
                    <th className="px-6 py-4">Nome do Motorista</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Velocidade (km/h)</th>
                    <th className="px-6 py-4">Nível de Combustível</th>
                    <th className="px-6 py-4">Última Sincronização</th>
                    <th className="px-6 py-4">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {data.vehicles.map(v => (
                    <tr key={v.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">{v.id}</td>
                      <td className="px-6 py-4 text-sm">{v.driver}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-${v.statusColor}-500/20 text-${v.statusColor}-500`}>{v.status}</span>
                      </td>
                      <td className={`px-6 py-4 text-sm ${v.statusColor === 'red' ? 'font-bold text-red-400' : ''}`}>{v.speed}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div className={`bg-${v.fuel < 20 ? 'red' : 'emerald'}-500 h-full`} style={{ width: `${v.fuel}%` }}></div>
                          </div>
                          <span className={`text-xs ${v.fuel < 20 ? 'text-red-500' : ''}`}>{v.fuel}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">{v.lastSync}</td>
                      <td className="px-6 py-4">
                        <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <MobileBottomNav activeView="dashboard" onNavigate={onNavigate} />
    </div>
  );
}
