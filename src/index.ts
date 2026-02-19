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
export type { IApiConfig } from './interfaces/apis-to-monitor';
export type { IIndicator } from './interfaces/status-mapping';
export type { ISchedulerOptions } from './interfaces/scheduler';
export type { IConfigAnswers, IPromptOptions } from './interfaces/prompts';
export type { IHealthcheckResult } from './interfaces/healthcheck';
export type { IHttpErrorStatus } from './interfaces/http-error-status';
export type { IStatusResponse, IStatusPage, IStatusIndicator } from './interfaces/status-json';
export type { IUserConfig } from './interfaces/user-config';
export type { StatusValue } from './data/status-mapping';