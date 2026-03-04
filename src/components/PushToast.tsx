import React, { useState, useEffect } from 'react';
import type { PushNotification } from '../hooks/useNotifications';

interface PushToastProps {
    notifications: PushNotification[];
    onDismiss: (id: string) => void;
    onMarkRead: (id: string) => void;
    onOpenCenter: () => void;
}

const PRIORITY_STYLES: Record<string, { border: string; bg: string; glow: string; icon: string; badge: string; pulse: boolean }> = {
    critical: {
        border: 'border-red-500/60',
        bg: 'bg-red-500/10',
        glow: '0 0 30px rgba(239,68,68,0.3), 0 0 60px rgba(239,68,68,0.1)',
        icon: 'text-red-500',
        badge: 'bg-red-500 text-white',
        pulse: true,
    },
    high: {
        border: 'border-orange-500/50',
        bg: 'bg-orange-500/8',
        glow: '0 0 20px rgba(249,115,22,0.2)',
        icon: 'text-orange-500',
        badge: 'bg-orange-500 text-white',
        pulse: false,
    },
    medium: {
        border: 'border-yellow-500/40',
        bg: 'bg-yellow-500/5',
        glow: '0 0 15px rgba(234,179,8,0.15)',
        icon: 'text-yellow-500',
        badge: 'bg-yellow-500 text-black',
        pulse: false,
    },
    low: {
        border: 'border-indigo-500/30',
        bg: 'bg-indigo-500/5',
        glow: 'none',
        icon: 'text-indigo-400',
        badge: 'bg-indigo-500 text-white',
        pulse: false,
    },
    info: {
        border: 'border-primary/30',
        bg: 'bg-primary/5',
        glow: 'none',
        icon: 'text-primary',
        badge: 'bg-primary text-white',
        pulse: false,
    },
};

const PRIORITY_LABELS: Record<string, string> = {
    critical: 'CRÍTICO',
    high: 'ALTO',
    medium: 'MÉDIO',
    low: 'BAIXO',
    info: 'INFO',
};

function timeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 5) return 'Agora';
    if (seconds < 60) return `Há ${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Há ${minutes}min`;
    const hours = Math.floor(minutes / 60);
    return `Há ${hours}h`;
}

interface SingleToastProps {
    key?: React.Key;
    notification: PushNotification;
    index: number;
    onDismiss: (id: string) => void;
    hideOnMobile?: boolean;
}

function SingleToast({ notification, onDismiss, index, hideOnMobile }: SingleToastProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(100);
    const style = PRIORITY_STYLES[notification.priority] || PRIORITY_STYLES.info;

    useEffect(() => {
        const enterTimer = setTimeout(() => setIsVisible(true), 50 + index * 100);
        return () => clearTimeout(enterTimer);
    }, [index]);

    useEffect(() => {
        const totalMs = notification.priority === 'critical' ? 15000 :
            notification.priority === 'high' ? 10000 : 8000;
        const interval = 50;
        const decrement = (100 / totalMs) * interval;

        const progressTimer = setInterval(() => {
            setProgress(prev => {
                if (prev <= 0) {
                    clearInterval(progressTimer);
                    return 0;
                }
                return prev - decrement;
            });
        }, interval);

        return () => clearInterval(progressTimer);
    }, [notification.priority]);

    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(() => onDismiss(notification.id), 300);
    };

    return (
        <div
            className={`relative overflow-hidden rounded-2xl border ${style.border} ${style.bg} backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${hideOnMobile ? 'hidden md:block' : ''} ${isVisible && !isExiting
                ? 'opacity-100 translate-x-0 scale-100'
                : isExiting
                    ? 'opacity-0 translate-x-[120%] scale-95'
                    : 'opacity-0 translate-x-[80px] scale-95'
                }`}
            style={{
                boxShadow: style.glow + ', 0 25px 50px -12px rgba(0,0,0,0.5)',
                transitionDelay: `${index * 80}ms`,
            }}
        >
            {/* Critical pulse border effect */}
            {style.pulse && (
                <div className="absolute inset-0 rounded-2xl border-2 border-red-500/50 animate-pulse pointer-events-none" />
            )}

            {/* Header */}
            <div className="flex items-start gap-3 p-4 pb-2">
                {/* Priority Icon */}
                <div className={`relative shrink-0 mt-0.5`}>
                    {style.pulse && (
                        <div className="absolute inset-0 rounded-xl bg-red-500/20 animate-ping" />
                    )}
                    <div className={`size-10 rounded-xl ${style.bg} border ${style.border} flex items-center justify-center relative z-10`}>
                        <span className={`material-symbols-outlined ${style.icon} filled text-xl`}>
                            {notification.icon}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-1.5 py-0.5 rounded ${style.badge}`}>
                            {PRIORITY_LABELS[notification.priority]}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">{timeAgo(notification.timestamp)}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white truncate">{notification.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-0.5 line-clamp-2">{notification.message}</p>

                    {/* Vehicle/Driver Tags */}
                    {(notification.vehicle || notification.driver) && (
                        <div className="flex items-center gap-2 mt-2">
                            {notification.vehicle && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">
                                    <span className="material-symbols-outlined text-[11px]">local_shipping</span>
                                    {notification.vehicle}
                                </span>
                            )}
                            {notification.driver && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">
                                    <span className="material-symbols-outlined text-[11px]">person</span>
                                    {notification.driver}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Dismiss button */}
                <button
                    onClick={handleDismiss}
                    className="shrink-0 size-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>
            </div>

            {/* Action Button (for critical) */}
            {notification.priority === 'critical' && notification.actionLabel && (
                <div className="px-4 pb-3 pt-1">
                    <button
                        onClick={() => {
                            notification.actionCallback?.();
                            handleDismiss();
                        }}
                        className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-red-500/20"
                    >
                        <span className="material-symbols-outlined text-sm">call</span>
                        {notification.actionLabel}
                    </button>
                </div>
            )}

            {/* Progress Bar */}
            <div className="h-0.5 bg-white/5">
                <div
                    className={`h-full transition-all duration-100 ease-linear`}
                    style={{
                        width: `${progress}%`,
                        background: PRIORITY_STYLES[notification.priority]?.glow !== 'none'
                            ? `linear-gradient(90deg, ${PRIORITY_STYLES[notification.priority]?.border.includes('red') ? '#ef4444' : PRIORITY_STYLES[notification.priority]?.border.includes('orange') ? '#f97316' : '#197fe6'}, transparent)`
                            : '#197fe6',
                    }}
                />
            </div>
        </div>
    );
}

export function PushToastContainer({ notifications, onDismiss, onMarkRead, onOpenCenter }: PushToastProps) {
    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-[380px] max-w-[calc(100vw-32px)]" id="push-toast-container">
            {notifications.map((notif, index) => (
                <SingleToast
                    key={notif.id}
                    notification={notif}
                    index={index}
                    onDismiss={onDismiss}
                    hideOnMobile={index > 0}
                />
            ))}

            {/* View all link */}
            {notifications.length > 1 && (
                <button
                    onClick={onOpenCenter}
                    className="text-xs text-center text-slate-500 hover:text-primary transition-colors py-1 font-medium"
                >
                    Ver todas as {notifications.length} notificações →
                </button>
            )}
        </div>
    );
}
