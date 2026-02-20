export const INCIDENT_STATUS = {
    INVESTIGATING: 'investigating',
    IDENTIFIED: 'identified',
    MONITORING: 'monitoring',
    RESOLVED: 'resolved',
    POSTMORTEM: 'postmortem',
};

export type IncidentStatus = typeof INCIDENT_STATUS[keyof typeof INCIDENT_STATUS];

export const INCIDENT_IMPACT = {
    NONE: 'none',
    MINOR: 'minor',
    MAJOR: 'major',
    CRITICAL: 'critical',
};

export type IncidentImpact = typeof INCIDENT_IMPACT[keyof typeof INCIDENT_IMPACT];

export const ACTIVE_STATUSES: IncidentStatus[] = [
    INCIDENT_STATUS.INVESTIGATING,
    INCIDENT_STATUS.IDENTIFIED,
    INCIDENT_STATUS.MONITORING,
];

export const RESOLVED_STATUSES: IncidentStatus[] = [
    INCIDENT_STATUS.RESOLVED,
    INCIDENT_STATUS.POSTMORTEM,
];

export const IMPACT_PRIORITY: Record<IncidentImpact, number> = {
    [INCIDENT_IMPACT.CRITICAL]: 4,
    [INCIDENT_IMPACT.MAJOR]: 3,
    [INCIDENT_IMPACT.MINOR]: 2,
    [INCIDENT_IMPACT.NONE]: 1,
};

export type IncidentFilterType = 'all' | 'unresolved' | 'resolved' | 'postmortem';