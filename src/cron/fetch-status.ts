import { STATUS_MAPPING, mapHttpStatus } from "../index";
import type { IFetchStatusResult, IStatusResponse } from "../index";

export async function fetchApiStatus(
    url: string,
    timeoutMs: number = 5000
): Promise<IFetchStatusResult> {
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

        /**
         * We attempt to analyze the JSON content to extract
         * the business status exposed by the API.
         */
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

            /**
             * Even if response.ok is true (HTTP 2xx)
             * the body may be invalid
             */
            } catch (err) {
                console.error('❌ Erreur lors de la récupération du JSON:', err);

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
        /**
         * The HTTP request was successful, but the status is not 2xx.
         * The HTTP code is therefore converted into an internal application status.
         */
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

    /**
     * Intercepts technical errors related to the request itself
     */
    } catch (error: any) {
        console.error('❌ Erreur lors de la récupération de la page:', error);
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