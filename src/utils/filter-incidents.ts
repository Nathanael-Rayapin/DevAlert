import { ACTIVE_STATUSES, IIncident, IMPACT_PRIORITY, INCIDENT_STATUS, IncidentFilterType } from "../index";

/**
 * Filters incidents by status
 * 
 * @param incidents - List of incidents
 * @param filterType - Type of filter to apply
 * @returns Filtered incidents
 */
export function filterByStatus(
    incidents: IIncident[],
    filterType: IncidentFilterType
): IIncident[] {
    switch (filterType) {
        case 'all':
            return incidents;

        case 'unresolved':
            return incidents.filter((inc) => ACTIVE_STATUSES.includes(inc.status));

        case 'resolved':
            return incidents.filter((inc) => inc.status === INCIDENT_STATUS.RESOLVED);

        case 'postmortem':
            return incidents.filter((inc) => inc.status === INCIDENT_STATUS.POSTMORTEM);

        default:
            return incidents;
    }
}

/**
 * Filters incidents by number of days
 * 
 * @param incidents - List of incidents
 * @param days - Number of days to go back (0 = all)
 * @returns Filtered incidents
 */
export function filterByDays(incidents: IIncident[], days: number): IIncident[] {
    if (days === 0) {
        return incidents;
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return incidents.filter((inc) => {
        const incidentDate = new Date(inc.created_at);
        return incidentDate >= cutoffDate;
    });
}

/**
 * Filters and sorts incidents
 * 
 * @param incidents - List of incidents
 * @param options - Filtering options
 * @returns Filtered and sorted incidents
 */
export function filterAndSortIncidents(
    incidents: IIncident[],
    options: {
        filterType: IncidentFilterType;
        days: number;
        sortBy?: 'date' | 'impact';
    }
): IIncident[] {
    let filtered = filterByStatus(incidents, options.filterType);
    filtered = filterByDays(filtered, options.days);

    if (options.sortBy === 'date' || !options.sortBy) {
        filtered.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
    }

    if (options.sortBy === 'impact') {
        filtered.sort((a, b) => {
            const priorityDiff = (IMPACT_PRIORITY[b.impact] || 0) - (IMPACT_PRIORITY[a.impact] || 0);
            // If impact is the same, sort by date
            if (priorityDiff === 0) {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
            return priorityDiff;
        });
    }

    return filtered;
}