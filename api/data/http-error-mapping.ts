import type { IHttpErrorStatus } from "../interfaces/http-error-status";

export const HTTP_ERROR_MAPPING: Record<number, IHttpErrorStatus> = {
    // Errors 4xx - Client
    400: {
        gravity: 'client_error',
        summary: 'HTTP Error',
        httpCategory: '4xx'
    },
    401: {
        gravity: 'client_error',
        summary: 'Authentication Required',
        httpCategory: '4xx'
    },
    403: {
        gravity: 'client_error',
        summary: 'Access Forbidden',
        httpCategory: '4xx'
    },
    404: {
        gravity: 'client_error',
        summary: 'Resource Not Found',
        httpCategory: '4xx'
    },
    429: {
        gravity: 'rate_limited',
        summary: 'Rate Limit Exceeded',
        httpCategory: '4xx'
    },

    // Errors 5xx - Serveur
    500: {
        gravity: 'server_error',
        summary: 'Internal Server Error',
        httpCategory: '5xx'
    },
    502: {
        gravity: 'server_error',
        summary: 'Gateway Error',
        httpCategory: '5xx'
    },
    503: {
        gravity: 'server_error',
        summary: 'Service Temporarily Unavailable',
        httpCategory: '5xx'
    },
    504: {
        gravity: 'server_error',
        summary: 'Gateway Error',
        httpCategory: '5xx'
    },
};

// Default status for unmapped codes
export const DEFAULT_HTTP_ERROR: Record<string, IHttpErrorStatus> = {
    '3xx': {
        gravity: 'redirect',
        summary: 'Redirection Required',
        httpCategory: '3xx'
    },
    '4xx': {
        gravity: 'client_error',
        summary: 'HTTP Error',
        httpCategory: '4xx'
    },
    '5xx': {
        gravity: 'server_error',
        summary: 'HTTP Error',
        httpCategory: '5xx'
    }
};