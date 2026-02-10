import type { IStatusIndicator } from "../interfaces/status-json";

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

export const STATUS_MAPPING: Record<
    IStatusIndicator['indicator'],
    IIndicator
> = {
    none: {
        gravity: 'none',
        summary: 'All Systems Operational'
    },
    minor: {
        gravity: 'minor',
        summary: 'Partial System Outage'
    },
    major: {
        gravity: 'major',
        summary: 'Major Service Outage'
    },
    critical: {
        gravity: 'critical',
        summary: 'Service Unavailable'
    },
    maintenance: {
        gravity: 'maintenance',
        summary: 'Service Under Maintenance'
    },
};

type StatusMapping = typeof STATUS_MAPPING;

export type StatusValue = StatusMapping[keyof StatusMapping];