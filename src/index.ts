import { version } from '../package.json';
/**
 * API Health Monitor
 * 
 * This package allows you to monitor the health status of multiple APIs
 * using Atlassian's standard Statuspage.io API.
 * 
 */

export const API_VERSION = version;

// Main functions
export { fetchApiStatus } from './cron/fetch-status';
export { fetchIncidents, fetchAllIncidents, countActiveIncidents, getMostCriticalIncident } from './cron/fetch-incidents';
export { startHealthcheckScheduler, stopHealthcheckScheduler, runImmediateHealthcheck, } from './cron/scheduler';
export { displayIncidents, displayIncidentsForScheduler, displayNoIncidents } from './cli/display-incidents';

// Datas
export { APIS_TO_MONITOR } from './data/apis-to-monitor.constant';
export { STATUS_MAPPING } from './data/status-mapping.constant';
export { INCIDENT_STATUS, INCIDENT_IMPACT, ACTIVE_STATUSES, RESOLVED_STATUSES, IMPACT_PRIORITY } from './data/incident-constants';
export { HTTP_ERROR_MAPPING, DEFAULT_HTTP_ERROR } from './data/http-error-mapping.constant';

// Utilities
export { getApisByCategory, getApiById, getApisByIds, } from './utils/apis-registry';
export { formatRelativeTime } from './utils/date-format';
export { filterAndSortIncidents } from './utils/filter-incidents';
export { getIncidentStatusIcon, getIncidentImpactIcon } from './utils/incidents-icons';
export { mapHttpStatus } from './utils/map-http-status';
export { getStatusGravityIcon, getStatusHttpErrorIcon } from './utils/status-icons';
export { truncate } from './utils/string-format';
export { isApiStatus, isHttpError } from './utils/type-guards';

// Configs
export { loadConfig, saveConfig, deleteConfig, configExists, getConfigPath, } from './config/user-config';

// Prompts
export { promptConfiguration, displayWelcome, displayConfigSummary, promptReconfigure, promptQuickSelection } from './cli/prompts-status';
export { promptSelectApis, promptDaysFilter, promptStatusFilter, promptIncidentsConfiguration, displayIncidentsConfigSummary } from './cli/prompts-incidents';

// Interfaces
export type { IApiConfig } from './data/apis-to-monitor.interface';
export type { IIndicator } from './data/status-mapping.interface';
export type { StatusValue } from './data/status-mapping.constant';
export type { IncidentStatus, IncidentImpact, IncidentFilterType } from './data/incident-constants';
export type { ISchedulerOptions } from './cron/scheduler.interface';
export type { IFetchStatusResult } from './cron/fetch-status.interface';
export type { IConfigAnswers, IPromptOptions } from './cli/prompts-status.interface';
export type { IIncidentsDisplayOptions } from './cli/prompts-incidents.interface';
export type { IHttpErrorStatus } from './interfaces/http-error-status';
export type { IStatusResponse, IStatusIndicator } from './interfaces/status-json';
export type { IIncidentsResponse, IIncident, IIncidentUpdate } from './interfaces/incidents-json';
export type { IPageInfo } from './interfaces/page-info-json';
export type { IUserConfig } from './config/user-config.interface';