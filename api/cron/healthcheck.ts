import { STATUS_MAPPING } from "../data/status-mapping";
import type { IHealthcheckResult } from "../interfaces/healthcheck";
import type { IStatusResponse } from "../interfaces/status-json";
import { mapHttpStatus } from "../utils/map-http-status";


export async function performJsonHealthcheck(
    url: string,
    timeoutMs: number = 5000
): Promise<IHealthcheckResult> {
    const startTime = Date.now();
    const timestamp = new Date();

    try {
        const response = await fetch(url, {
            method: 'GET',
            signal: AbortSignal.timeout(timeoutMs),
            headers: {
                'User-Agent': 'Healthcheck-API/0.1',
                'Accept': 'application/json, text/plain, */*'
            }
        });

        const responseTime = Date.now() - startTime;

        if (response.ok) {
            try {
                const data = await response.json() as IStatusResponse;
                const indicator = data.status.indicator;

                return {
                    url: data.page.url,
                    status: STATUS_MAPPING[indicator],
                    statusCode: response.status,
                    responseTime,
                    timestamp,
                };
            } catch (err) {
                // TODO: L'API utilise un format JSON ?
                console.error('Erreur lors de la récupération du JSON:', err);

                return {
                    url,
                    status: {
                        gravity: 'server_error',
                        summary: 'HTTP Error',
                        httpCategory: '5xx'
                    },
                    statusCode: response.status,
                    responseTime,
                    errorMessage: 'Réponse JSON invalide ou structure incorrecte',
                    timestamp
                };
            }
        } else {
            const httpErrorStatus = mapHttpStatus(response.status);

            return {
                url,
                status: httpErrorStatus,
                statusCode: response.status,
                responseTime,
                errorMessage: `HTTP ${response.status}: ${response.statusText}`,
                timestamp
            };
        }

    } catch (error: any) {
        console.error('Erreur lors de la récupération de la page:', error);
        const responseTime = Date.now() - startTime;

        let errorMessage = 'Unknown error';

        if (error.name === 'TimeoutError') {
            errorMessage = `Timeout après ${timeoutMs}ms`;
        } else {
            errorMessage = error.message || 'Erreur inconnue';
        }

        return {
            url,
            status: {
                gravity: 'server_error',
                summary: 'HTTP Error',
                httpCategory: '5xx'
            },
            responseTime,
            errorMessage,
            timestamp
        };
    }
}