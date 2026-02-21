import { INCIDENT_IMPACT, INCIDENT_STATUS } from "../index";

export function getIncidentStatusIcon(status: string): string {
    switch (status) {
        case INCIDENT_STATUS.INVESTIGATING:
            return '🔴';
        case INCIDENT_STATUS.IDENTIFIED:
            return '🟠';
        case INCIDENT_STATUS.MONITORING:
            return '🟡';
        case INCIDENT_STATUS.RESOLVED:
            return '🟢';
        case INCIDENT_STATUS.POSTMORTEM:
            return '📝';
        default:
            return '⚪';
    }
}

export function getIncidentImpactIcon(impact: string): string {
    switch (impact) {
        case INCIDENT_IMPACT.CRITICAL:
            return '🔴';
        case INCIDENT_IMPACT.MAJOR:
            return '🟠';
        case INCIDENT_IMPACT.MINOR:
            return '🟡';
        case INCIDENT_IMPACT.NONE:
            return '⚪';
        default:
            return '⚪';
    }
}