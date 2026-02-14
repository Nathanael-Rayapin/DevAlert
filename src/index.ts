/**
 * API Health Monitor
 * 
 * Ce package permet de monitorer le statut de santé de multiples APIs
 * en utilisant l'API standard Statuspage.io d'Atlassian.
 * 
 * @packageDocumentation
 */

// Exports des fonctions principales
export { performJsonHealthcheck } from './cron/healthcheck';
export { startHealthcheckScheduler, stopHealthcheckScheduler, runImmediateHealthcheck, } from './cron/scheduler';

// Exports des données
export { APIS_TO_MONITOR } from './data/apis-to-monitor';
export { getApisByCategory, getApiById, getApisByIds, } from './utils/apis';

export { STATUS_MAPPING } from './data/status-mapping';
export { HTTP_ERROR_MAPPING, DEFAULT_HTTP_ERROR } from './data/http-error-mapping';

// Exports des utils
export { mapHttpStatus } from './utils/map-http-status';
export { isApiStatus, isHttpError } from './utils/type-guards';
export { getGravityIcon, getHttpErrorIcon } from './utils/icons';

// Exports de la config
export { loadConfig, saveConfig, deleteConfig, configExists, getConfigPath, } from './config/user-config';

// Exports des types
export type { ApiConfig } from './data/apis-to-monitor';
export type { IIndicator, StatusValue } from './data/status-mapping';
export type { IHealthcheckResult } from './interfaces/healthcheck';
export type { IHttpErrorStatus } from './interfaces/http-error-status';
export type { IStatusResponse, IStatusPage, IStatusIndicator } from './interfaces/status-json';
export type { UserConfig } from './config/user-config';
