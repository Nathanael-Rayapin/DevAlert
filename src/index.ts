/**
 * API Health Monitor
 * 
 * This package allows you to monitor the health status of multiple APIs
 * using Atlassian's standard Statuspage.io API.
 * 
 * @packageDocumentation
 */

// Exports main functions
export { fetchApiStatus } from './cron/fetch-status';
export { startHealthcheckScheduler, stopHealthcheckScheduler, runImmediateHealthcheck, } from './cron/scheduler';

// Data exports
export { APIS_TO_MONITOR } from './data/apis-to-monitor';
export { getApisByCategory, getApiById, getApisByIds, } from './utils/apis';

export { STATUS_MAPPING } from './data/status-mapping';
export { HTTP_ERROR_MAPPING, DEFAULT_HTTP_ERROR } from './data/http-error-mapping';

// Exports of utilities
export { mapHttpStatus } from './utils/map-http-status';
export { isApiStatus, isHttpError } from './utils/type-guards';
export { getGravityIcon, getHttpErrorIcon } from './utils/icons';

// Config exports
export { loadConfig, saveConfig, deleteConfig, configExists, getConfigPath, } from './config/user-config';

// Type exports
export type { IApiConfig } from './data/apis-to-monitor.interface';
export type { IIndicator } from './data/status-mapping.interface';
export type { ISchedulerOptions } from './cron/scheduler.interface';
export type { IConfigAnswers, IPromptOptions } from './cli/prompts.interface';
export type { IFetchStatusResult } from './cron/fetch-status.interface';
export type { IHttpErrorStatus } from './interfaces/http-error-status';
export type { IStatusResponse, IStatusIndicator } from './interfaces/status-json';
export type { IIncidentsResponse, Incident, IncidentUpdate } from './interfaces/incidents-json';
export type { IPageInfo } from './interfaces/page-info-json';
export type { IUserConfig } from './config/user-config.interface';
export type { StatusValue } from './data/status-mapping';