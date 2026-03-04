import { useState, useCallback, useRef, useEffect } from 'react';

export type NotificationPriority = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface PushNotification {
    id: string;
    title: string;
    message: string;
    priority: NotificationPriority;
    icon: string;
    timestamp: Date;
    vehicle?: string;
    driver?: string;
    read: boolean;
    dismissed: boolean;
    category: 'speed' | 'brake' | 'geofence' | 'fuel' | 'maintenance' | 'panic' | 'system';
    actionLabel?: string;
    actionCallback?: () => void;
}

interface NotificationSettings {
    soundEnabled: boolean;
    browserNotificationsEnabled: boolean;
    criticalOnly: boolean;
    autoDismissSeconds: number;
}

const PRIORITY_CONFIG: Record<NotificationPriority, { color: string; gradient: string; sound: number; vibrate: number[] }> = {
    critical: {
        color: '#ef4444',
        gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
        sound: 880,
        vibrate: [200, 100, 200, 100, 200],
    },
    high: {
        color: '#f97316',
        gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
        sound: 660,
        vibrate: [200, 100, 200],
    },
    medium: {
        color: '#eab308',
        gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
        sound: 440,
        vibrate: [200],
    },
    low: {
        color: '#6366f1',
        gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        sound: 330,
        vibrate: [100],
    },
    info: {
        color: '#197fe6',
        gradient: 'linear-gradient(135deg, #197fe6, #1565c0)',
        sound: 220,
        vibrate: [],
    },
};

const CATEGORY_ICONS: Record<PushNotification['category'], string> = {
    speed: 'speed',
    brake: 'warning',
    geofence: 'fence',
    fuel: 'oil_barrel',
    maintenance: 'build',
    panic: 'emergency',
    system: 'info',
};

function playNotificationSound(priority: NotificationPriority) {
    try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const config = PRIORITY_CONFIG[priority];
        const freq = config.sound;

        if (priority === 'critical') {
            // Urgent alarm pattern
            for (let i = 0; i < 3; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'square';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.25);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.25 + 0.2);
                osc.start(ctx.currentTime + i * 0.25);
                osc.stop(ctx.currentTime + i * 0.25 + 0.2);
            }
        } else {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = priority === 'high' ? 'triangle' : 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.3);
        }
    } catch {
        // Audio not available
    }
}

function requestBrowserNotification(notif: PushNotification) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const priorityLabel = notif.priority === 'critical' ? '🚨 CRÍTICO' :
            notif.priority === 'high' ? '⚠️ ALTO' : '🔔';
        new Notification(`${priorityLabel} ${notif.title}`, {
            body: notif.message,
            icon: '/favicon.ico',
            tag: notif.id,
            requireInteraction: notif.priority === 'critical',
        });
    }
}

export function useNotifications() {
    const [notifications, setNotifications] = useState<PushNotification[]>([]);
    const [toasts, setToasts] = useState<PushNotification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState<NotificationSettings>({
        soundEnabled: true,
        browserNotificationsEnabled: false,
        criticalOnly: false,
        autoDismissSeconds: 8,
    });

    const timerRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

    // Request browser notification permission
    const requestPermission = useCallback(async () => {
        if ('Notification' in window && Notification.permission === 'default') {
            const result = await Notification.requestPermission();
            setSettings(prev => ({ ...prev, browserNotificationsEnabled: result === 'granted' }));
        }
    }, []);

    // Push a new notification
    const pushNotification = useCallback((
        partial: Omit<PushNotification, 'id' | 'timestamp' | 'read' | 'dismissed' | 'icon'>
    ) => {
        if (settings.criticalOnly && partial.priority !== 'critical' && partial.priority !== 'high') {
            return;
        }

        const notif: PushNotification = {
            ...partial,
            id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            timestamp: new Date(),
            read: false,
            dismissed: false,
            icon: CATEGORY_ICONS[partial.category] || 'info',
        };

        // Add to persistent list
        setNotifications(prev => [notif, ...prev].slice(0, 50));

        // Show toast
        setToasts(prev => [notif, ...prev].slice(0, 5));

        // Play sound
        if (settings.soundEnabled) {
            playNotificationSound(notif.priority);
        }

        // Browser notification
        if (settings.browserNotificationsEnabled) {
            requestBrowserNotification(notif);
        }

        // Vibration
        if ('vibrate' in navigator) {
            const pattern = PRIORITY_CONFIG[notif.priority].vibrate;
            if (pattern.length > 0) {
                navigator.vibrate(pattern);
            }
        }

        // Auto-dismiss toast
        const dismissTime = notif.priority === 'critical' ? 15000 :
            notif.priority === 'high' ? 10000 : settings.autoDismissSeconds * 1000;

        const timer = setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== notif.id));
            timerRefs.current.delete(notif.id);
        }, dismissTime);

        timerRefs.current.set(notif.id, timer);

        return notif.id;
    }, [settings]);

    const dismissToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
        const timer = timerRefs.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timerRefs.current.delete(id);
        }
    }, []);

    const markAsRead = useCallback((id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }, []);

    const markAllAsRead = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }, []);

    const clearAll = useCallback(() => {
        setNotifications([]);
        setToasts([]);
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;
    const criticalCount = notifications.filter(n => !n.read && (n.priority === 'critical' || n.priority === 'high')).length;

    // Cleanup timers
    useEffect(() => {
        return () => {
            timerRefs.current.forEach(timer => clearTimeout(timer));
        };
    }, []);

    return {
        notifications,
        toasts,
        isOpen,
        setIsOpen,
        settings,
        setSettings,
        pushNotification,
        dismissToast,
        markAsRead,
        markAllAsRead,
        clearAll,
        unreadCount,
        criticalCount,
        requestPermission,
        PRIORITY_CONFIG,
    };
}
