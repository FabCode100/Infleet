import React, { useState } from 'react';
import type { PushNotification, NotificationPriority } from '../hooks/useNotifications';

interface NotificationCenterProps {
    isOpen: boolean;
    onClose: () => void;
    notifications: PushNotification[];
    onMarkRead: (id: string) => void;
    onMarkAllRead: () => void;
    onClearAll: () => void;
    unreadCount: number;
    criticalCount: number;
    settings: {
        soundEnabled: boolean;
        browserNotificationsEnabled: boolean;
        criticalOnly: boolean;
        autoDismissSeconds: number;
    };
    onSettingsChange: (settings: any) => void;
    onRequestPermission: () => void;
}

const PRIORITY_STYLES: Record<string, { border: string; bg: string; dot: string; icon: string; badge: string }> = {
    critical: {
        border: 'border-l-red-500',
        bg: 'bg-red-500/5',
        dot: 'bg-red-500',
        icon: 'text-red-500',
        badge: 'bg-red-500/20 text-red-400',
    },
    high: {
        border: 'border-l-orange-500',
        bg: 'bg-orange-500/5',
        dot: 'bg-orange-500',
        icon: 'text-orange-500',
        badge: 'bg-orange-500/20 text-orange-400',
    },
    medium: {
        border: 'border-l-yellow-500',
        bg: 'bg-yellow-500/5',
        dot: 'bg-yellow-500',
        icon: 'text-yellow-500',
        badge: 'bg-yellow-500/20 text-yellow-400',
    },
    low: {
        border: 'border-l-indigo-500',
        bg: 'bg-indigo-500/5',
        dot: 'bg-indigo-400',
        icon: 'text-indigo-400',
        badge: 'bg-indigo-500/20 text-indigo-400',
    },
    info: {
        border: 'border-l-primary',
        bg: 'bg-primary/5',
        dot: 'bg-primary',
        icon: 'text-primary',
        badge: 'bg-primary/20 text-primary',
    },
};

const PRIORITY_LABELS: Record<string, string> = {
    critical: 'CRÍTICO',
    high: 'ALTO',
    medium: 'MÉDIO',
    low: 'BAIXO',
    info: 'INFO',
};

const CATEGORY_LABELS: Record<string, string> = {
    speed: 'Velocidade',
    brake: 'Frenagem',
    geofence: 'Cerca Eletrônica',
    fuel: 'Combustível',
    maintenance: 'Manutenção',
    panic: 'Pânico',
    system: 'Sistema',
};

function formatTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `Há ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Há ${hours}h`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

type FilterType = 'all' | 'critical' | 'high' | 'medium' | 'unread';

export function NotificationCenter({
    isOpen,
    onClose,
    notifications,
    onMarkRead,
    onMarkAllRead,
    onClearAll,
    unreadCount,
    criticalCount,
    settings,
    onSettingsChange,
    onRequestPermission,
}: NotificationCenterProps) {
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [showSettings, setShowSettings] = useState(false);

    const filteredNotifications = notifications.filter(n => {
        switch (activeFilter) {
            case 'critical': return n.priority === 'critical';
            case 'high': return n.priority === 'high';
            case 'medium': return n.priority === 'medium';
            case 'unread': return !n.read;
            default: return true;
        }
    });

    const filters: { id: FilterType; label: string; count?: number }[] = [
        { id: 'all', label: 'Todos', count: notifications.length },
        { id: 'critical', label: 'Críticos', count: notifications.filter(n => n.priority === 'critical').length },
        { id: 'high', label: 'Altos', count: notifications.filter(n => n.priority === 'high').length },
        { id: 'unread', label: 'Não Lidos', count: unreadCount },
    ];

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed top-0 right-0 z-[95] h-full w-full sm:w-[420px] bg-background-dark border-l border-border-subtle shadow-2xl shadow-black/50 animate-slide-in-right flex flex-col" id="notification-center">

                {/* Header */}
                <div className="p-5 border-b border-border-subtle bg-white/5 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary filled text-xl">notifications_active</span>
                                </div>
                                {criticalCount > 0 && (
                                    <span className="absolute -top-1 -right-1 size-5 bg-red-500 rounded-full text-[10px] font-black text-white flex items-center justify-center border-2 border-background-dark animate-pulse">
                                        {criticalCount}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h2 className="text-lg font-extrabold tracking-tight">Central de Notificações</h2>
                                <p className="text-xs text-slate-500">{unreadCount} não lida{unreadCount !== 1 ? 's' : ''}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className={`size-9 rounded-lg flex items-center justify-center transition-all ${showSettings ? 'bg-primary/20 text-primary' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                            >
                                <span className="material-symbols-outlined text-lg">tune</span>
                            </button>
                            <button
                                onClick={onClose}
                                className="size-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>
                    </div>

                    {/* Settings Panel */}
                    {showSettings && (
                        <div className="mb-4 p-4 bg-surface rounded-xl border border-border-subtle space-y-3 animate-fade-in">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Configurações</h3>

                            <label className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-white transition-colors">volume_up</span>
                                    <span className="text-sm text-slate-300">Sons de alerta</span>
                                </div>
                                <button
                                    onClick={() => onSettingsChange({ ...settings, soundEnabled: !settings.soundEnabled })}
                                    className={`w-10 h-5 rounded-full transition-all duration-300 relative ${settings.soundEnabled ? 'bg-primary' : 'bg-slate-700'}`}
                                >
                                    <div className={`size-4 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow ${settings.soundEnabled ? 'left-5.5' : 'left-0.5'}`} />
                                </button>
                            </label>

                            <label className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-white transition-colors">web</span>
                                    <span className="text-sm text-slate-300">Notificações do navegador</span>
                                </div>
                                <button
                                    onClick={() => {
                                        if (!settings.browserNotificationsEnabled) {
                                            onRequestPermission();
                                        }
                                        onSettingsChange({ ...settings, browserNotificationsEnabled: !settings.browserNotificationsEnabled });
                                    }}
                                    className={`w-10 h-5 rounded-full transition-all duration-300 relative ${settings.browserNotificationsEnabled ? 'bg-primary' : 'bg-slate-700'}`}
                                >
                                    <div className={`size-4 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow ${settings.browserNotificationsEnabled ? 'left-5.5' : 'left-0.5'}`} />
                                </button>
                            </label>

                            <label className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-white transition-colors">priority_high</span>
                                    <span className="text-sm text-slate-300">Somente críticos</span>
                                </div>
                                <button
                                    onClick={() => onSettingsChange({ ...settings, criticalOnly: !settings.criticalOnly })}
                                    className={`w-10 h-5 rounded-full transition-all duration-300 relative ${settings.criticalOnly ? 'bg-primary' : 'bg-slate-700'}`}
                                >
                                    <div className={`size-4 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow ${settings.criticalOnly ? 'left-5.5' : 'left-0.5'}`} />
                                </button>
                            </label>
                        </div>
                    )}

                    {/* Filter Tabs */}
                    <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                        {filters.map(f => (
                            <button
                                key={f.id}
                                onClick={() => setActiveFilter(f.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${activeFilter === f.id
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {f.label}
                                {f.count !== undefined && f.count > 0 && (
                                    <span className={`ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${activeFilter === f.id ? 'bg-white/20' : 'bg-white/5'
                                        }`}>
                                        {f.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions Bar */}
                {notifications.length > 0 && (
                    <div className="px-5 py-2.5 flex items-center justify-between border-b border-border-subtle bg-white/[0.02]">
                        <button
                            onClick={onMarkAllRead}
                            className="text-xs text-primary font-semibold hover:text-primary/80 transition-colors flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-sm">done_all</span>
                            Marcar todas como lidas
                        </button>
                        <button
                            onClick={onClearAll}
                            className="text-xs text-slate-500 font-medium hover:text-red-400 transition-colors flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-sm">delete_sweep</span>
                            Limpar
                        </button>
                    </div>
                )}

                {/* Notification List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {filteredNotifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center px-8">
                            <div className="size-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-4xl text-slate-600">notifications_off</span>
                            </div>
                            <h3 className="text-sm font-bold text-slate-400 mb-1">Nenhuma notificação</h3>
                            <p className="text-xs text-slate-600">
                                {activeFilter !== 'all'
                                    ? 'Nenhuma notificação nesta categoria'
                                    : 'Quando houver alertas, eles aparecerão aqui'}
                            </p>
                        </div>
                    ) : (
                        <div className="py-2">
                            {filteredNotifications.map((notif, index) => {
                                const style = PRIORITY_STYLES[notif.priority] || PRIORITY_STYLES.info;
                                return (
                                    <div
                                        key={notif.id}
                                        onClick={() => onMarkRead(notif.id)}
                                        className={`px-5 py-3.5 border-l-[3px] ${style.border} cursor-pointer transition-all duration-200 hover:bg-white/5 ${!notif.read ? style.bg : 'border-opacity-30'
                                            }`}
                                        style={{
                                            animationDelay: `${index * 50}ms`,
                                        }}
                                    >
                                        <div className="flex items-start gap-3">
                                            {/* Icon */}
                                            <div className={`size-9 rounded-xl ${style.bg} border border-white/5 flex items-center justify-center shrink-0 mt-0.5`}>
                                                <span className={`material-symbols-outlined ${style.icon} filled text-lg`}>{notif.icon}</span>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${style.badge}`}>
                                                        {PRIORITY_LABELS[notif.priority]}
                                                    </span>
                                                    <span className="text-[10px] text-slate-600">{CATEGORY_LABELS[notif.category]}</span>
                                                    {!notif.read && (
                                                        <span className={`size-2 rounded-full ${style.dot} shrink-0 ml-auto`} />
                                                    )}
                                                </div>
                                                <h4 className={`text-sm font-semibold truncate ${notif.read ? 'text-slate-400' : 'text-slate-100'}`}>
                                                    {notif.title}
                                                </h4>
                                                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{notif.message}</p>

                                                <div className="flex items-center gap-3 mt-1.5">
                                                    {notif.vehicle && (
                                                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[11px]">local_shipping</span>
                                                            {notif.vehicle}
                                                        </span>
                                                    )}
                                                    <span className="text-[10px] text-slate-600">{formatTime(notif.timestamp)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer Stats */}
                <div className="p-4 border-t border-border-subtle bg-white/[0.02]">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                            <div className="text-center">
                                <span className="text-lg font-bold text-white">{notifications.filter(n => n.priority === 'critical').length}</span>
                                <p className="text-[9px] text-red-400 font-bold uppercase tracking-wide">Críticos</p>
                            </div>
                            <div className="h-8 w-px bg-border-subtle" />
                            <div className="text-center">
                                <span className="text-lg font-bold text-white">{notifications.filter(n => n.priority === 'high').length}</span>
                                <p className="text-[9px] text-orange-400 font-bold uppercase tracking-wide">Altos</p>
                            </div>
                            <div className="h-8 w-px bg-border-subtle" />
                            <div className="text-center">
                                <span className="text-lg font-bold text-white">{notifications.length}</span>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Total</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className={`size-2 rounded-full ${criticalCount > 0 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                            <span className="text-[10px] text-slate-500 font-medium">
                                {criticalCount > 0 ? 'Ação necessária' : 'Tudo sob controle'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
