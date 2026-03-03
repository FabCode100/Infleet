/**
 * Service to interact with the Phoenix backend for AI insights.
 * This ensures the API key remains secure on the server.
 */
export async function generateFleetInsights(telemetryData: any[], alerts: any[]) {
    const DEFAULT_API_URL = 'http://localhost:4000/api';
    const envApiUrl = import.meta.env.VITE_API_URL;

    // Determine the base URL: if VITE_API_URL is provided, use it; otherwise use default.
    // We then ensure we don't double up on '/api' by checking if it's already there.
    let baseUrl = envApiUrl || DEFAULT_API_URL;

    // Ensure we are calling /insights on the correct path
    const targetUrl = baseUrl.endsWith('/api') ? `${baseUrl}/insights` :
        baseUrl.includes('/api/') ? `${baseUrl.split('/api/')[0]}/api/insights` :
            `${baseUrl}/api/insights`;

    try {
        const response = await fetch(targetUrl, {
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
