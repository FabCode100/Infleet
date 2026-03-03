export const dashboardData = {
  totalVehicles: 142,
  activeAlerts: 3,
  co2Saved: 12.4,
  vehicles: [
    { id: 'V-402', driver: 'Marcus Thompson', status: 'Excesso de Velocidade', speed: 105, fuel: 65, lastSync: 'Just now', statusColor: 'red' },
    { id: 'V-129', driver: 'Elena Rodriguez', status: 'Em Rota', speed: 72, fuel: 82, lastSync: '3 mins ago', statusColor: 'emerald' },
    { id: 'V-188', driver: 'Jordan Lee', status: 'Combustível Baixo', speed: 45, fuel: 5, lastSync: '1 min ago', statusColor: 'orange' },
    { id: 'V-501', driver: 'Sarah Chen', status: 'Em Rota', speed: 68, fuel: 44, lastSync: '5 mins ago', statusColor: 'emerald' },
  ],
  alerts: [
    { id: 1, vehicle: 'Veículo #402', type: 'Excesso de Velocidade', desc: '105 km/h detected in 80 zone', time: '2 mins ago • I-95 South', icon: 'speed', color: 'red' },
    { id: 2, vehicle: 'Veículo #188', type: 'Combustível Baixo', desc: 'Critical level: 5% remaining', time: '15 mins ago • Queens, NY', icon: 'oil_barrel', color: 'orange' },
    { id: 3, vehicle: 'Veículo #321', type: 'Rota Desviada', desc: 'Unexpected stop detected', time: '45 mins ago • Bronx, NY', icon: 'route', color: 'slate' },
  ]
};

export const alertsData = [
  { id: 1, type: 'Pânico Ativado', title: 'Botão de Pânico Ativado', vehicle: 'ABC-1234', driver: 'Marcos Pereira', time: 'Agora', priority: 'critical', color: 'safety-red' },
  { id: 2, type: 'Telemetria Crítica', title: 'Frenagem Brusca Detectada', vehicle: 'FLT-8890', driver: 'João Silva', time: '12:45', priority: 'high', color: 'orange-500' },
  { id: 3, type: 'Cerca Eletrônica', title: 'Saída de Perímetro Não Autorizada', vehicle: 'GHT-4451', driver: 'Ana Costa', time: '12:40', priority: 'medium', color: 'yellow-500' },
  { id: 4, type: 'Manutenção', title: 'Check Engine Light - Pressão Óleo', vehicle: 'KML-1029', driver: 'Lucas Lima', time: '11:15', priority: 'low', color: 'slate-400' },
];

export const monitoringData = {
  activeFleet: 24,
  vehicles: [
    { id: 'ABC-1234', type: 'Caminhão - Scania R450', status: 'Em Movimento', speed: 82, color: 'green' },
    { id: 'XYZ-9876', type: 'Van - Mercedes Sprinter', status: 'Ocioso', speed: 0, color: 'slate' },
    { id: 'KJH-5521', type: 'Caminhão - Volvo FH', status: 'Em Movimento', speed: 74, color: 'green' },
    { id: 'DEF-4321', type: 'Picape - Toyota Hilux', status: 'Ocioso', speed: 0, color: 'slate' },
  ],
  events: [
    { id: 1, message: 'Caminhão ABC-1234 excedeu o limite de velocidade (82km/h) perto de Highway 101', time: '2 mins ago', type: 'warning', icon: 'warning', color: 'red' },
    { id: 2, message: 'Van XYZ-9876 status alterado para Ocioso em Warehouse 4', time: '12 mins ago', type: 'info', icon: 'info', color: 'slate' },
    { id: 3, message: 'Caminhão KJH-5521 entrou na cerca eletrônica Delivery Zone B', time: '18 mins ago', type: 'success', icon: 'check_circle', color: 'green' },
    { id: 4, message: 'Picape DEF-4321 motor ligado no Central Hub', time: '25 mins ago', type: 'info', icon: 'info', color: 'slate' },
  ]
};

export const sustainabilityData = {
  co2Emitted: 12.4,
  fuelSaved: 1840,
  evUsage: 42,
  costSaved: 3120,
  drivers: [
    { rank: 1, name: 'Alex Moreno', vehicle: 'FL-0293', consumption: '18.2 L/100km', score: 98, trend: 'up', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuAvcpBwhqKER2JS6iBHoGI-CHLJpXDtZPMFBHWm56rd2hNCM74NR_StS-TwldqL-GD-EtQgSJbAJJkTnqQ49thvhJD-xf3kEuffHZiuQ3nFiCO8ELHD3O6Br9WhjN8y-35pITiCgBJorRgFtRFtu00i67dmktk-8APXDaGyyuFTPlcUJV8wS9Y09grx0en03qx9ydjShqwXGxu5RnmST_3p7MDArnj9c9-k0KSUv2w85pPaWbin6__XoOAb611a8DYaCJUYr9cSDe' },
    { rank: 2, name: 'Sarah Jenkins', vehicle: 'EV-8472', consumption: '15.5 kWh/100km', score: 94, trend: 'up', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDasfL8BCsFWrFBPzHvLdONXumzz0weI9t2eowiG6TQR9ZqDxvvF-5uFQAnk3LS5hLztLaW-eEyTN4yY-MBX1-Cp43i1cYOUTbRiDJCzWqYo9mJvGP5EeeH_KveaCOrLWoKe4ItNt0MxqzI3dd09fKh196QVAWHf3xLw7Za7Aczc3vlVOKDvp6noV4CofB5p0kFbalnBcbs1BNvp0a2aB96C09poqz1sso3O2P5ZhS_fl1Dt6krpi4Ve7BsJk-A5d544tqgZaHg81Zu' },
    { rank: 3, name: 'Michael Chen', vehicle: 'FL-9912', consumption: '19.8 L/100km', score: 89, trend: 'neutral', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlMHOmiSY3_Re2QTvmosD4FVY8HZ3EzYU6ljBB8sTJVbakNSbl9cVblZe3DBrKvcsfAZ2o-vxE0QUZOTO0xMgsRA2VwxD1RfI7eoOP3E_RL4bPO0Vk_HUL93ho5wEO7ai2JVBvyhkEnhDju64qgHXa03cTAVjPCg6RGSbXHjwInbQENciESLOwD2scoWAgECKJOHpK9JsT6YNAvLMIz4IBG_6sjYTKotfTZwMtUavE1xLuazPZC-KcQWXHGApropKEnTmJj0IbPHHo' },
    { rank: 4, name: 'Elena Rossi', vehicle: 'EV-2210', consumption: '16.8 kWh/100km', score: 85, trend: 'down', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsgbNmEN--mcwkTsVLaAfoObM49mLO-F72_HEWA7NUA4lDbN-9DlZbV9Tc178BGG-5bAMfPUXuoO5j-0sl9UfTUgQG3E5TR_zSNi5EQBc6oNQm_XgJlqb0QkpUHPWCYoLn8BbVFJOFlYub2i6NIiMfyLMRtJLsQlbnGrsxCXuSHUW7xxQruE0QwetTdvjNvedI0ggMJb92k-sBywTublBk976KUAQohH481DJg-6wrzGpt-ih6WS4jpwwnuSQPaPD7D2EWoB2y2haL' },
  ]
};

export const vehicleDetailsData = {
  id: 'VF-902',
  model: 'Heavy-Duty Transport X4',
  odometer: '12,482 km',
  location: 'Route 66 - Outbound',
  driver: 'Marcus Thorne',
  fuelLevel: 72,
  range: '420km',
  speedAvg: 68,
  incidents: {
    harshBraking: 0,
    sharpTurns: 2
  }
};
