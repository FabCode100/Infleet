import { useState, useEffect } from 'react';
import { generateFleetInsights } from '../services/aiService';

export function useCopilot(telemetryData: any[], alerts: any[]) {
    const [insight, setInsight] = useState("Analisando dados da frota...");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Generate insight every time alerts change or periodically
        if (alerts.length > 0) {
            const getInsight = async () => {
                setIsLoading(true);
                const text = await generateFleetInsights(telemetryData, alerts);
                setInsight(text);
                setIsLoading(false);
            };

            // Debounce logic to not call AI too frequently
            const timer = setTimeout(getInsight, 3000);
            return () => clearTimeout(timer);
        }
    }, [alerts.length]); // Re-run when alert count changes

    return { insight, isLoading };
}
