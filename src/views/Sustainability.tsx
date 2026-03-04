import { useFleet } from '../hooks/useFleet';
import { Sidebar } from '../components/Sidebar';
import { MobileBottomNav, MobileHeader } from '../components/MobileNav';
import { sustainabilityData as initialData } from '../data/mockData';

export function Sustainability({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { downloadReport, downloadSustainabilityPDF } = useFleet();
  const data = initialData;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Sidebar activeView="sustainability" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile Header */}
        <MobileHeader title="Infleet ESG" onNavigate={onNavigate}>
          <button onClick={downloadSustainabilityPDF} className="p-2 rounded-lg text-primary">
            <span className="material-symbols-outlined">download</span>
          </button>
        </MobileHeader>

        {/* Desktop Top Navigation Bar */}
        <header className="hidden md:flex items-center justify-between border-b border-border-dark px-6 py-4 lg:px-10 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">eco</span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight">Infleet <span className="text-primary">ESG</span></h2>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6">
              <button onClick={() => onNavigate('dashboard')} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">dashboard</span> Dashboard
              </button>
              <button onClick={() => onNavigate('monitoring')} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">local_shipping</span> Fleet
              </button>
              <button className="text-primary font-semibold flex items-center gap-2 border-b-2 border-primary pb-1">
                <span className="material-symbols-outlined text-sm">analytics</span> Sustainability
              </button>
            </nav>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-border-dark hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-white">notifications</span>
            </button>
            <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-cover" alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAupyOjjyKsopi5-o3d4rZ1R98L0kmUcaU-8EXqTNY4AAMC6y6PfPAJM5JTtSGRnALLdzOM6gXtv64sx1cOCERWOO2qxYdPgeFj3G-1OIyJ-pF5l3uSLlceOHJiyQ3ka28BGc7iEqXo3d-qWRHu0jEVdlmxZCMZxxggiqgNLa2Qwau2lCcPc4TVshS7QghQjbAWSR2vdd7ptZwmje82pfi0JOYyOQV-wkcTR6ENVpbbmS4NW6ws27_rSdexcyGV-Gd0AUoYpIMiTVSF" />
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-4 md:py-8 pb-mobile-nav md:pb-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-1 md:mb-2">Relatório de Sustentabilidade</h1>
              <p className="text-slate-400 text-sm md:text-lg">Métricas de impacto ambiental e eficiência de recursos em tempo real.</p>
            </div>
            <div className="hidden md:flex flex-wrap gap-3">
              <button onClick={downloadSustainabilityPDF} className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary text-white px-4 font-bold hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined">download</span> Exportar PDF
              </button>
            </div>
          </div>

          {/* Filters Section - simplified on mobile */}
          <div className="bg-card-dark border border-border-dark rounded-xl p-3 md:p-4 mb-6 md:mb-8 flex flex-col md:flex-row flex-wrap gap-3 md:gap-4 items-stretch md:items-center">
            <div className="flex gap-3 flex-1 min-w-0">
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Início</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_today</span>
                  <input className="w-full bg-background-dark border-border-dark rounded-lg pl-8 md:pl-10 text-xs md:text-sm text-slate-200 focus:ring-primary focus:border-primary" type="date" />
                </div>
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Término</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_month</span>
                  <input className="w-full bg-background-dark border-border-dark rounded-lg pl-8 md:pl-10 text-xs md:text-sm text-slate-200 focus:ring-primary focus:border-primary" type="date" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 flex-1 min-w-0">
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Grupo</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">category</span>
                  <select className="w-full bg-background-dark border-border-dark rounded-lg pl-8 md:pl-10 text-xs md:text-sm text-slate-200 appearance-none focus:ring-primary focus:border-primary">
                    <option>Todos os Veículos</option>
                    <option>Electric Fleet</option>
                    <option>Long Haul Heavy</option>
                    <option>Last Mile Delivery</option>
                  </select>
                </div>
              </div>
              <div className="flex items-end">
                <button className="h-[38px] px-4 md:px-6 rounded-lg bg-border-dark hover:bg-slate-700 text-white text-xs md:text-sm font-medium transition-colors whitespace-nowrap">Aplicar</button>
              </div>
            </div>
          </div>

          {/* Impact Cards Grid - horizontal scroll on mobile, grid on desktop */}
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory">
            <div className="bg-card-dark border border-border-dark rounded-xl p-4 md:p-6 relative overflow-hidden group min-w-[220px] md:min-w-0 snap-center shrink-0">
              <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl md:text-6xl text-primary">co2</span>
              </div>
              <p className="text-slate-400 text-xs md:text-sm font-medium mb-1">Total de CO2 Emitido</p>
              <h3 className="text-2xl md:text-3xl font-bold">{data.co2Emitted} <span className="text-[10px] md:text-sm font-normal text-slate-500">toneladas</span></h3>
              <div className="mt-3 md:mt-4 flex items-center gap-1 text-red-400 text-xs md:text-sm">
                <span className="material-symbols-outlined text-xs md:text-sm">trending_up</span>
                <span>4.2% vs mês anterior</span>
              </div>
            </div>
            <div className="bg-card-dark border border-border-dark rounded-xl p-4 md:p-6 relative overflow-hidden group min-w-[220px] md:min-w-0 snap-center shrink-0">
              <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl md:text-6xl text-green-400">route</span>
              </div>
              <p className="text-slate-400 text-xs md:text-sm font-medium mb-1">Economia de Combustível</p>
              <h3 className="text-2xl md:text-3xl font-bold">{data.fuelSaved.toLocaleString()} <span className="text-[10px] md:text-sm font-normal text-slate-500">litros</span></h3>
              <div className="mt-3 md:mt-4 flex items-center gap-1 text-green-400 text-xs md:text-sm">
                <span className="material-symbols-outlined text-xs md:text-sm">trending_down</span>
                <span>Rotas otimizadas</span>
              </div>
            </div>
            <div className="bg-card-dark border border-border-dark rounded-xl p-4 md:p-6 relative overflow-hidden group min-w-[220px] md:min-w-0 snap-center shrink-0">
              <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl md:text-6xl text-primary">electric_car</span>
              </div>
              <p className="text-slate-400 text-xs md:text-sm font-medium mb-1">Taxa de Uso de VE</p>
              <h3 className="text-2xl md:text-3xl font-bold">{data.evUsage}%</h3>
              <div className="mt-3 md:mt-4 w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: `${data.evUsage}%` }}></div>
              </div>
            </div>
            <div className="bg-card-dark border border-border-dark rounded-xl p-4 md:p-6 relative overflow-hidden group min-w-[220px] md:min-w-0 snap-center shrink-0">
              <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl md:text-6xl text-blue-400">payments</span>
              </div>
              <p className="text-slate-400 text-xs md:text-sm font-medium mb-1">Economia de Custos</p>
              <h3 className="text-2xl md:text-3xl font-bold">${data.costSaved.toLocaleString()}</h3>
              <div className="mt-3 md:mt-4 flex items-center gap-1 text-green-400 text-xs md:text-sm">
                <span className="material-symbols-outlined text-xs md:text-sm">check_circle</span>
                <span>Metas atingidas</span>
              </div>
            </div>
          </div>

          {/* Ranking Table: Most Sustainable Drivers */}
          <div className="bg-card-dark border border-border-dark rounded-xl overflow-hidden shadow-2xl">
            <div className="px-4 md:px-6 py-3 md:py-5 border-b border-border-dark flex justify-between items-center bg-slate-800/30">
              <h3 className="text-base md:text-xl font-bold flex items-center gap-2"><span className="material-symbols-outlined text-primary">emoji_events</span> <span className="hidden sm:inline">Motoristas mais</span> Sustentáveis</h3>
              <span className="text-[10px] md:text-xs font-bold bg-primary/10 text-primary px-2 md:px-3 py-1 rounded-full uppercase tracking-tighter">Ranking ao Vivo</span>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden p-3 space-y-3">
              {data.drivers.map(driver => (
                <div key={driver.rank} className="p-3 rounded-xl border border-border-dark bg-background-dark/50 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${driver.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                    driver.rank === 2 ? 'bg-slate-400/20 text-slate-400' :
                      driver.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                        'bg-slate-800 text-slate-500'
                    }`}>{driver.rank}</div>
                  <div className="w-9 h-9 rounded-full bg-slate-700 overflow-hidden shrink-0">
                    <img className="w-full h-full rounded-full object-cover" alt={driver.name} src={driver.avatar} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{driver.name}</p>
                    <p className="text-[10px] text-slate-400">{driver.vehicle} • {driver.consumption}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-10 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className={`${driver.score >= 90 ? 'bg-green-500' : 'bg-primary'} h-full`} style={{ width: `${driver.score}%` }}></div>
                      </div>
                      <span className="text-xs font-bold w-6 text-right">{driver.score}</span>
                    </div>
                    <span className={`material-symbols-outlined text-sm ${driver.trend === 'up' ? 'text-green-400' : driver.trend === 'down' ? 'text-red-400' : 'text-slate-400'}`}>
                      {driver.trend === 'up' ? 'trending_up' : driver.trend === 'down' ? 'trending_down' : 'horizontal_rule'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-border-dark bg-slate-800/10">
                    <th className="px-6 py-4">Posição</th>
                    <th className="px-6 py-4">Motorista</th>
                    <th className="px-6 py-4">ID do Veículo</th>
                    <th className="px-6 py-4">Consumo Médio</th>
                    <th className="px-6 py-4">Pontuação de Eficiência</th>
                    <th className="px-6 py-4 text-right">Tendência</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark">
                  {data.drivers.map(driver => (
                    <tr key={driver.rank} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${driver.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                          driver.rank === 2 ? 'bg-slate-400/20 text-slate-400' :
                            driver.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                              'bg-slate-800 text-slate-500'
                          }`}>{driver.rank}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0">
                            <img className="w-full h-full rounded-full object-cover" alt={driver.name} src={driver.avatar} />
                          </div>
                          <span className="font-medium">{driver.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{driver.vehicle}</td>
                      <td className="px-6 py-4 font-mono">{driver.consumption}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden max-w-[100px]">
                            <div className={`${driver.score >= 90 ? 'bg-green-500' : 'bg-primary'} h-full`} style={{ width: `${driver.score}%` }}></div>
                          </div>
                          <span className="text-sm font-bold">{driver.score}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-right ${driver.trend === 'up' ? 'text-green-400' : driver.trend === 'down' ? 'text-red-400' : 'text-slate-400'}`}>
                        <span className="material-symbols-outlined">
                          {driver.trend === 'up' ? 'trending_up' : driver.trend === 'down' ? 'trending_down' : 'horizontal_rule'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 md:px-6 py-3 md:py-4 bg-slate-800/20 border-t border-border-dark flex items-center justify-between">
              <p className="text-xs md:text-sm text-slate-400">Economia de Custos Estimada</p>
              <div className="flex gap-2">
                <button className="px-2 md:px-3 py-1 rounded border border-border-dark text-slate-400 hover:text-white transition-colors text-xs md:text-sm">Anterior</button>
                <button className="px-2 md:px-3 py-1 rounded border border-border-dark text-slate-400 hover:text-white transition-colors text-xs md:text-sm">Próximo</button>
              </div>
            </div>
          </div>

          {/* Mobile Export Button */}
          <div className="md:hidden mt-4">
            <button onClick={downloadSustainabilityPDF} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 touch-target">
              <span className="material-symbols-outlined">download</span> Exportar Relatório PDF
            </button>
          </div>
        </div>
      </main>

      <MobileBottomNav activeView="sustainability" onNavigate={onNavigate} />
    </div>
  );
}
