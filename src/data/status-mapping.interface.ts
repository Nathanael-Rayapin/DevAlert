export interface IIndicator {
    gravity:
    | 'none'
    | 'minor'
    | 'major'
    | 'critical'
    | 'maintenance'
    summary:
    | 'All Systems Operational'
    | 'Partial System Outage'
    | 'Major Service Outage'
    | 'Service Unavailable'
    | 'Service Under Maintenance'
}