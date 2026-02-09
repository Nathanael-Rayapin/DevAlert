import { HTTP_ERROR_MAPPING, DEFAULT_HTTP_ERROR } from "../data/http-error-mapping";
import type { IHttpErrorStatus } from "../interfaces/http-error-status";

/**
 * Détermine le statut d'erreur HTTP approprié en fonction du code de statut
 * 
 * Raisonnement :
 * - Les erreurs 5xx indiquent un vrai problème serveur
 * - Les erreurs 4xx indiquent une mauvaise configuration/permission
 * - Le 429 est spécial : le service fonctionne mais est surchargé
 * - Les 3xx sont des redirections (normalement gérées par fetch)
 * 
 * @param statusCode - Le code HTTP reçu (ex: 404, 500)
 * @returns Un objet IHttpErrorStatus décrivant l'erreur
 */
export function mapHttpStatus(statusCode: number): IHttpErrorStatus {
    // D'abord on cherche un mapping exact
    const exactMapping = HTTP_ERROR_MAPPING[statusCode];
    if (exactMapping) {
        return exactMapping;
    }

    // Sinon on détermine la catégorie avec fallback
    if (statusCode >= 300 && statusCode < 400) {
        return DEFAULT_HTTP_ERROR['3xx'] ?? DEFAULT_HTTP_ERROR['5xx'] ?? createFallback();
    } else if (statusCode >= 400 && statusCode < 500) {
        return DEFAULT_HTTP_ERROR['4xx'] ?? DEFAULT_HTTP_ERROR['5xx'] ?? createFallback();
    } else if (statusCode >= 500 && statusCode < 600) {
        return DEFAULT_HTTP_ERROR['5xx'] ?? createFallback();
    }

    // Cas inattendu
    return DEFAULT_HTTP_ERROR['5xx'] ?? createFallback();
}

// Fonction helper pour créer un fallback hardcodé
function createFallback(): IHttpErrorStatus {
    return {
        gravity: 'server_error',
        summary: 'HTTP Error',
        httpCategory: '5xx'
    };
}