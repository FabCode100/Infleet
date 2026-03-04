import React, { useState } from 'react';

interface MobileNavProps {
    activeView: string;
    onNavigate: (view: string) => void;
}

export function MobileBottomNav({ activeView, onNavigate }: MobileNavProps) {
    const navItems = [
        { id: 'dashboard', icon: 'grid_view', label: 'Home' },
        { id: 'monitoring', icon: 'map', label: 'Mapa' },
        { id: 'vehicle-details', icon: 'local_shipping', label: 'Veículos' },
        { id: 'alerts', icon: 'report_problem', label: 'Alertas' },
        { id: 'sustainability', icon: 'eco', label: 'ESG' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background-dark/95 backdrop-blur-xl border-t border-border-subtle safe-area-bottom">
            <div className="flex items-center justify-around px-2 py-1">
                {navItems.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 min-w-[56px] ${isActive
                                    ? 'text-primary'
                                    : 'text-slate-500 active:scale-95'
                                }`}
                        >
                            <div className={`relative ${isActive ? 'mb-0.5' : ''}`}>
                                {isActive && (
                                    <div className="absolute -inset-2 bg-primary/10 rounded-full"></div>
                                )}
                                <span className={`material-symbols-outlined text-[22px] relative z-10 ${isActive ? 'filled' : ''}`}>
                                    {item.icon}
                                </span>
                            </div>
                            <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

export function MobileHeader({ title, onNavigate, children }: { title: string; onNavigate: (view: string) => void; children?: React.ReactNode }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="md:hidden sticky top-0 z-40 bg-background-dark/95 backdrop-blur-xl border-b border-border-subtle">
                <div className="flex items-center justify-between px-4 h-14">
                    <div className="flex items-center gap-3">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-lg">local_shipping</span>
                        </div>
                        <h1 className="text-base font-bold tracking-tight truncate max-w-[200px]">{title}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        {children}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                        >
                            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'more_vert'}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)}>
                    <div
                        className="absolute top-0 right-0 w-72 h-full bg-background-dark border-l border-border-subtle shadow-2xl animate-slide-in-right"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-border-subtle">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold">Menu</h2>
                                <button onClick={() => setMenuOpen(false)} className="p-1 rounded-lg hover:bg-white/5">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
                                <div className="size-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                                    <span className="text-sm font-bold text-primary">RS</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Ricardo S.</p>
                                    <p className="text-xs text-slate-500">Fleet Manager</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 space-y-1">
                            <button
                                onClick={() => { onNavigate('dashboard'); setMenuOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                            >
                                <span className="material-symbols-outlined">settings</span>
                                <span className="text-sm font-medium">Configurações</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                                <span className="material-symbols-outlined">help</span>
                                <span className="text-sm font-medium">Ajuda & Suporte</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                                <span className="material-symbols-outlined">logout</span>
                                <span className="text-sm font-medium">Sair</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
