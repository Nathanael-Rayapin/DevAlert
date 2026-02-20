import { IApiConfig, IIncident, API_VERSION, IIncidentsResponse, ACTIVE_STATUSES, IMPACT_PRIORITY } from "../index";

/**
 * Retrieves incidents from an API
 * 
 * @param api - API configuration
 * @param timeoutMs - Timeout in milliseconds
 * @returns List of incidents or null in case of error
 */
export async function fetchIncidents(
    api: IApiConfig,
    timeoutMs: number = 5000
): Promise<IIncident[] | null> {
    try {
        const response = await fetch(api.incidentsUrl, {
            method: 'GET',
            signal: AbortSignal.timeout(timeoutMs),
            headers: {
                'User-Agent': `API-Health-Monitor/${API_VERSION}`,
                'Accept': 'application/json',
            },
        });

        if (response.ok) {
            try {
                const data = await response.json() as IIncidentsResponse;
                return data.incidents;
            } catch (err) {
                console.error('❌ Erreur lors de la récupération du JSON:', err);
                return null;
            }
        } else {
            console.error(`❌ Erreur HTTP ${response.status} pour ${api.name} incidents`);
            return null;
        }

    } catch (error: any) {
        console.error('❌ Erreur lors de la récupération de la page:', error);

        if (error.name === 'TimeoutError') {
            console.error(`Timeout pour ${api.name} incidents (>${timeoutMs}ms)`);
        } else {
            console.error(`Erreur fetch incidents ${api.name}:`, error.message || 'Erreur inconnue');
        }
        return null;
    }
}

/**
 * Retrieves incidents from multiple APIs in parallel
 * 
 * @param apis - List of APIs to query
 * @returns Map with apiId → incidents
 */
export async function fetchAllIncidents(
    apis: IApiConfig[]
): Promise<Map<string, IIncident[]>> {
    const promises = apis.map(async api => {
        const incidents = await fetchIncidents(api);
        return { apiId: api.id, incidents: incidents || [] };
    });

    const results = await Promise.allSettled(promises);
    const incidentsMap = new Map<string, IIncident[]>();

    results.forEach((result, index) => {
        const api = apis[index];
        if (!api) return;

        if (result.status === 'fulfilled') {
            incidentsMap.set(result.value.apiId, result.value.incidents);
        } else {
            incidentsMap.set(api.id, []);
        }
    });

    return incidentsMap;
}

/**
 * Counts active (unresolved) incidents for an API
 * 
 * @param incidents - List of incidents
 * @returns Number of active incidents
 */
export function countActiveIncidents(incidents: IIncident[]): number {
    return incidents.filter((inc) => inc.status !== 'resolved' && inc.status !== 'postmortem').length;
}

/**
 * Find the most critical active incident
 * 
 * @param incidents - List of incidents
 * @returns Most critical incident or null if no incidents are active
 */
export function getMostCriticalIncident(incidents: IIncident[]): IIncident | null {
    const activeIncidents = incidents.filter((inc) => ACTIVE_STATUSES.includes(inc.status));

    if (activeIncidents.length === 0) return null;

    return activeIncidents.reduce((mostCritical, current) => {
        const currentPriority = IMPACT_PRIORITY[current.impact] || 0;
        const mostCriticalPriority = IMPACT_PRIORITY[mostCritical.impact] || 0;
        return currentPriority > mostCriticalPriority ? current : mostCritical;
    });
}