import { useState, useEffect } from 'react';
import { fleetSocket } from '../services/fleetSocket';
import { dashboardData, monitoringData, alertsData } from '../data/mockData';

export function useFleet() {
    const [data, setData] = useState(dashboardData);
    const [monitoring, setMonitoring] = useState(monitoringData);
    const [alerts, setAlerts] = useState(alertsData);

    useEffect(() => {
        fleetSocket.connect();

        fleetSocket.onTelemetry((telemetry: any) => {
            // Update Dashboard Data
            setData((prev) => {
                const updatedVehicles = prev.vehicles.map((v) => {
                    if (v.id.includes(telemetry.vehicle_id.substring(0, 3))) {
                        return {
                            ...v,
                            speed: Math.round(telemetry.speed),
                            fuel: Math.round(telemetry.fuel_level),
                            lastSync: 'Agora'
                        };
                    }
                    return v;
                });

                return {
                    ...prev,
                    vehicles: updatedVehicles
                };
            });

            // Update Monitoring Data
            setMonitoring((prev) => {
                const updatedMonitorVehicles = prev.vehicles.map((v) => {
                    if (v.id.includes(telemetry.vehicle_id.substring(0, 3))) {
                        return {
                            ...v,
                            speed: Math.round(telemetry.speed),
                            status: telemetry.speed > 0 ? 'Em Movimento' : 'Ocioso',
                            color: telemetry.speed > 0 ? 'green' : 'slate'
                        };
                    }
                    return v;
                });

                const newEvent = {
                    id: Date.now(),
                    message: `Telemetria: ${telemetry.vehicle_id.substring(0, 5)} está a ${Math.round(telemetry.speed)}km/h`,
                    time: 'Agora',
                    type: 'info',
                    icon: 'sensors',
                    color: 'slate'
                };

                return {
                    ...prev,
                    activeFleet: updatedMonitorVehicles.filter(v => v.status === 'Em Movimento').length + 20, // Keep it look busy
                    vehicles: updatedMonitorVehicles,
                    events: [newEvent, ...prev.events].slice(0, 10)
                };
            });
        });

        fleetSocket.onAlert((alert: any) => {
            const alertId = Date.now();

            setData((prev) => {
                const newAlert = {
                    id: alertId,
                    vehicle: `Veículo ${alert.vehicle_id.substring(0, 4)}`,
                    type: 'Excesso de Velocidade',
                    desc: alert.message || `Velocidade: ${alert.speed} km/h`,
                    time: 'Agora',
                    icon: 'speed',
                    color: 'red'
                };

                return {
                    ...prev,
                    activeAlerts: prev.activeAlerts + 1,
                    alerts: [newAlert, ...prev.alerts].slice(0, 5)
                };
            });

            setAlerts((prev) => {
                const newCriticalAlert = {
                    id: alertId,
                    type: 'Excesso de Velocidade',
                    title: `Limite Excedido: ${alert.speed}km/h`,
                    vehicle: alert.vehicle_id.substring(0, 8),
                    driver: 'Motorista Simulado',
                    time: 'Agora',
                    priority: 'high',
                    color: 'red-500'
                };
                return [newCriticalAlert, ...prev].slice(0, 10);
            });

            setMonitoring((prev) => {
                const warningEvent = {
                    id: alertId,
                    message: `ALERTA: ${alert.vehicle_id.substring(0, 5)} excedeu o limite! (${alert.speed}km/h)`,
                    time: 'Agora',
                    type: 'warning',
                    icon: 'warning',
                    color: 'red'
                };

                return {
                    ...prev,
                    events: [warningEvent, ...prev.events].slice(0, 10)
                };
            });
        });

        return () => {
            fleetSocket.disconnect();
        };
    }, []);

    const downloadReport = (type: 'fleet' | 'incidents') => {
        const DEFAULT_API_URL = 'http://localhost:4000/api';
        const envApiUrl = import.meta.env.VITE_API_URL;
        let baseUrl = envApiUrl || DEFAULT_API_URL;

        const targetUrl = baseUrl.endsWith('/api') ? `${baseUrl}/reports/${type}` :
            baseUrl.includes('/api/') ? `${baseUrl.split('/api/')[0]}/api/reports/${type}` :
                `${baseUrl}/api/reports/${type}`;

        window.open(targetUrl, '_blank');
    };

    return { data, monitoring, alerts, downloadReport };
}
