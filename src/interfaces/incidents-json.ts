import { IPageInfo } from "./page-info-json";

export interface IIncidentsResponse {
    page: IPageInfo;
    incidents: Incident[];
}

export interface Incident {
    id: string;
    name: string;
    status: 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'postmortem';

    created_at: string;
    updated_at: string;
    monitoring_at: string | null;
    resolved_at: string | null;
    impact: 'none' | 'minor' | 'major' | 'critical';
    shortlink: string;
    started_at: string;
    page_id: string;
    incident_updates: IncidentUpdate[];
}

export interface IncidentUpdate {
    id: string;
    status: 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'postmortem';
    body: string;
    incident: string;
    created_at: string;
    updated_at: string;
    display_at: string;
}