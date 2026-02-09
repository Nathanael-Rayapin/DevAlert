import type { IStatusIndicator } from "../interfaces/status-json";

interface IIndicator {
    gravity:
    | 'low'
    | 'medium'
    | 'high'
    | 'critical';
    summary:
    | 'All Systems Operational'
    | 'Partial System Outage'
    | 'Major Service Outage'
    | 'Service Unavailable';
}

export const STATUS_MAPPING: Record<
    IStatusIndicator['indicator'],
    IIndicator
> = {
    none: {
        gravity: 'low',
        summary: 'All Systems Operational'
    },
    minor: {
        gravity: 'medium',
        summary: 'Partial System Outage'
    },
    major: {
        gravity: 'high',
        summary: 'Major Service Outage'
    },
    critical: {
        gravity: 'critical',
        summary: 'Service Unavailable'
    }
};

type StatusMapping = typeof STATUS_MAPPING;

export type StatusValue = StatusMapping[keyof StatusMapping];