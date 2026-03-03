import { useFleet } from '../hooks/useFleet';
import { useCopilot } from '../hooks/useCopilot';
import { Sidebar } from '../components/Sidebar';
import { vehicleDetailsData as initialData } from '../data/mockData';

export function VehicleDetails({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { data: fleetData } = useFleet();

  // Mix static details with real-time telemetry from the first vehicle
  const realTimeVehicle = fleetData.vehicles[0];
  const { insight, isLoading } = useCopilot(fleetData.vehicles, fleetData.alerts);

  const data = {
    ...initialData,
    fuelLevel: realTimeVehicle?.fuel || initialData.fuelLevel,
    speedAvg: realTimeVehicle?.speed || initialData.speedAvg
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <Sidebar activeView="vehicle-details" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
        {/* Top Navigation */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Detalhes do Veículo {data.id}</h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider">Sessão Ativa</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <button className="ml-2 flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">download</span> Gerar Relatório
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8">
            <button className="pb-4 border-b-2 border-primary text-primary font-bold text-sm tracking-wide">Telemetria ao Vivo</button>
            <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium text-sm transition-colors">Insights de Segurança</button>
            <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium text-sm transition-colors">Manutenção</button>
            <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium text-sm transition-colors">Histórico</button>
          </div>

          {/* Stats & Copilot Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Copilot Card */}
            <div className="lg:col-span-1 bg-primary/10 border border-primary/20 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary">psychology</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                <h3 className="text-primary font-bold tracking-tight uppercase text-xs">Insight do Copiloto</h3>
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {isLoading ? "Gerando insight..." : `"${insight}"`}
              </p>
              <button className="mt-6 text-primary text-sm font-bold flex items-center gap-1 hover:underline underline-offset-4">Revisar perfil detalhado <span className="material-symbols-outlined text-[16px]">arrow_forward</span></button>
            </div>

            {/* Metrics Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Gauge - Fuel/Battery */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <p className="text-slate-500 text-sm font-medium mb-4 self-start">Nível de Combustível/Bateria</p>
                <div className="relative flex items-center justify-center w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-slate-100 dark:text-slate-800" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                    <circle className="text-primary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * data.fuelLevel) / 100} strokeWidth="8"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{data.fuelLevel}%</span>
                    <span className="text-[10px] text-slate-500 uppercase">Ideal</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-400">Aprox. {data.range} restante</p>
              </div>

              {/* Safety Checklist */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-slate-500 text-sm font-medium">Checklist de Segurança</p>
                  <span className="text-xs text-slate-400">Viagem Atual</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      </div>
                      <span className="text-sm font-semibold">Frenagem Brusca</span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">{data.incidents.harshBraking} Incidentes</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">warning</span>
                      </div>
                      <span className="text-sm font-semibold">Curvas Acentuadas</span>
                    </div>
                    <span className="text-xs text-amber-500 font-mono font-bold">{data.incidents.sharpTurns} Detectadas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Análise de Velocidade (km/h)</p>
                <h4 className="text-3xl font-bold tracking-tight">{data.speedAvg} <span className="text-lg font-normal text-slate-400 italic">média</span></h4>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300"><div className="size-2 rounded-full bg-primary animate-pulse"></div> Dados ao Vivo</span>
                <select className="bg-transparent border-none text-xs font-bold text-slate-500 focus:ring-0 cursor-pointer">
                  <option>Últimas 2 Horas</option>
                  <option>Últimas 24 Horas</option>
                </select>
              </div>
            </div>
            <div className="relative h-[300px] w-full mt-4">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#197fe6" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="#197fe6" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <line className="text-slate-200 dark:text-slate-800" stroke="currentColor" strokeDasharray="4" strokeWidth="1" x1="0" x2="1000" y1="50" y2="50"></line>
                <line className="text-slate-200 dark:text-slate-800" stroke="currentColor" strokeDasharray="4" strokeWidth="1" x1="0" x2="1000" y1="150" y2="150"></line>
                <line className="text-slate-200 dark:text-slate-800" stroke="currentColor" strokeDasharray="4" strokeWidth="1" x1="0" x2="1000" y1="250" y2="250"></line>
                <path d="M0,300 L0,220 C100,210 200,80 300,100 C400,120 500,240 600,220 C700,200 800,40 900,60 L1000,80 L1000,300 Z" fill="url(#chartGradient)"></path>
                <path d="M0,220 C100,210 200,80 300,100 C400,120 500,240 600,220 C700,200 800,40 900,60 L1000,80" fill="none" stroke="#197fe6" strokeLinecap="round" strokeWidth="3"></path>
                <circle cx="900" cy="60" fill="#197fe6" r="6"></circle>
                <circle cx="900" cy="60" fill="#197fe6" fillOpacity="0.3" r="10"></circle>
              </svg>
              <div className="flex justify-between mt-4 text-[11px] font-bold text-slate-400 tracking-wider">
                <span>14:00</span>
                <span>14:30</span>
                <span>15:00</span>
                <span>15:30</span>
                <span>16:00</span>
              </div>
            </div>
          </div>

          {/* Footer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Modelo</p>
              <p className="font-bold">{data.model}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Odômetro</p>
              <p className="font-bold">{data.odometer}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Localização</p>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                <p className="font-bold">{data.location}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Motorista</p>
              <p className="font-bold">{data.driver}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
