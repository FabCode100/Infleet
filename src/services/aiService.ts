/**
 * Service to interact with the Phoenix backend for AI insights.
 * This ensures the API key remains secure on the server.
 */
export async function generateFleetInsights(telemetryData: any[], alerts: any[]) {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
    try {
        const response = await fetch(`${API_URL}/insights`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                telemetry_data: telemetryData.slice(0, 5),
                alerts: alerts.slice(0, 3),
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao chamar o backend');
        }

        const data = await response.json();
        return data.insight || "Sem insights no momento.";
    } catch (error) {
        console.error("Erro ao carregar insights do Copiloto:", error);
        return "Configure a variável de ambiente GEMINI_API_KEY no backend para ativar o Copiloto.";
    }
}
