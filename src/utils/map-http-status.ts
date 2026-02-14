import { HTTP_ERROR_MAPPING, DEFAULT_HTTP_ERROR } from "../index";
import type { IHttpErrorStatus } from "../index";

/**
 * Determines the appropriate HTTP error status based on the status code.
 * 
 * - 5xx errors indicate a real server problem.
 * - 4xx errors indicate incorrect configuration/permissions.
 * - 429 is special: the service is working but is overloaded.
 * - 3xx are redirects (normally handled by fetch).
 * 
 * @param statusCode - The HTTP code received (e.g., 404, 500)
 * @returns An IHttpErrorStatus object describing the error
 */
export function mapHttpStatus(statusCode: number): IHttpErrorStatus {
    // First, we look for an exact mapping.
    const exactMapping = HTTP_ERROR_MAPPING[statusCode];
    if (exactMapping) {
        return exactMapping;
    }

    // Otherwise, we determine the category with fallback.
    if (statusCode >= 300 && statusCode < 400) {
        return DEFAULT_HTTP_ERROR['3xx'] ?? DEFAULT_HTTP_ERROR['5xx'] ?? createFallback();
    } else if (statusCode >= 400 && statusCode < 500) {
        return DEFAULT_HTTP_ERROR['4xx'] ?? DEFAULT_HTTP_ERROR['5xx'] ?? createFallback();
    } else if (statusCode >= 500 && statusCode < 600) {
        return DEFAULT_HTTP_ERROR['5xx'] ?? createFallback();
    }

    // Unexpected case
    return DEFAULT_HTTP_ERROR['5xx'] ?? createFallback();
}

function createFallback(): IHttpErrorStatus {
    return {
        gravity: 'server_error',
        summary: 'HTTP Error',
        httpCategory: '5xx'
    };
}