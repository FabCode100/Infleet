import React from 'react';

interface NotificationBellProps {
    unreadCount: number;
    criticalCount: number;
    onClick: () => void;
}

export function NotificationBell({ unreadCount, criticalCount, onClick }: NotificationBellProps) {
    return (
        <button
            onClick={onClick}
            className="relative p-2 rounded-xl group transition-all duration-300 hover:bg-white/5"
            id="notification-bell"
            aria-label={`Notificações: ${unreadCount} não lidas`}
        >
            {/* Glow effect for critical */}
            {criticalCount > 0 && (
                <div className="absolute inset-0 rounded-xl bg-red-500/10 animate-pulse pointer-events-none" />
            )}

            {/* Bell Icon */}
            <span className={`material-symbols-outlined text-xl transition-all duration-300 relative z-10 ${criticalCount > 0
                    ? 'text-red-400 notification-shake'
                    : unreadCount > 0
                        ? 'text-primary'
                        : 'text-slate-400 group-hover:text-white'
                }`}>
                {criticalCount > 0 ? 'notifications_active' : 'notifications'}
            </span>

            {/* Badge */}
            {unreadCount > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-background-dark z-20 ${criticalCount > 0
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-primary text-white'
                    }`}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                </span>
            )}
        </button>
    );
}
